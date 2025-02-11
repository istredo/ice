'use server';
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate, VerificationUserTemplate } from "@/shared/components";
import { CheckoutFormValues } from "@/shared/const/checkout-form-schema";
import { createPayment, sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { sendMail } from "@/shared/lib/mailService";
import { hashSync } from "bcrypt";

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get('cartToken')?.value;
		if (!token) {
			throw new Error('Cart token not found');
		}
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: token,
			},
		});
		if (!userCart) {
			throw new Error('Cart not found');
		}
		if (userCart?.totalAmount === 0) {
			throw new Error('Cart is empty');
		}

		const order = await prisma.order.create({
			data: {
				token: token,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				discount: Math.floor(userCart.totalAmount * 0.1),
				finalPrice: (userCart.totalAmount / 100 * 90) + 500,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		});

		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});
		console.log(order.totalAmount)
		const paymentData = await createPayment({
			amount: order.finalPrice,
			orderId: order.id,
			description: 'Оплата заказа #' + order.id,
		});

		if (!paymentData) {
			throw new Error('Payment data not found');
		}

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		});
		const paymentUrl = paymentData.confirmation.confirmation_url;

		await sendMail(data.email, `Заказ No ${order.id} ожидает оплаты `,
			PayOrderTemplate({
				orderId: order.id,
				price: order.finalPrice,
				paymentUrl,
			})
			,);
		return paymentUrl;


	} catch (error) {

	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser) {
			throw new Error('Пользователь не найден');
		}

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		});

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
			},
		});
	} catch (err) {
		console.log('Error [UPDATE_USER]', err);
		throw err;
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error('Почта не подтверждена');
			}

			throw new Error('Пользователь уже существует');
		}

		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
			},
		});

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		});

		await sendEmail(
			createdUser.email,
			'IceCream Shop / 📝 Подтверждение регистрации',
			VerificationUserTemplate({
				code,
			}),
		);
	} catch (err) {
		console.log('Error [CREATE_USER]', err);
		throw err;
	}
}
