'use server';

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/const/checkout-form-schema";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

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





	} catch (error) {

	}
}