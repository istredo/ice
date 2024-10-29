import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { OrderCanceledTemplate, OrderSuccessTemplate } from "@/shared/components";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { sendMail } from "@/shared/lib/mailService";


export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as PaymentCallbackData;

		const order = await prisma.order.findFirst({
			where: {
				id: Number(body.object.metadata.order_id),
			},
		});

		if (!order) {
			return NextResponse.json({ error: 'Order not found' });
		}

		const isSucceeded = body.object.status === 'succeeded';

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
			},
		});

		const items = JSON.parse(order?.items as string) as CartItemDTO[];

		if (isSucceeded) {
			await sendMail(
				order.email,
				'Ice Shop / Ваш заказ успешно оформлен 🎉',
				OrderSuccessTemplate({ orderId: order.id, price: order.finalPrice, discount: order.discount, items }),
			);
			return NextResponse.json({ message: "Payment succeeded" });
		} else {
			await sendMail(
				order.email,
				'Ice Shop / Проблема с оплатой заказа',
				OrderCanceledTemplate({ orderId: order.id, price: order.finalPrice, discount: order.discount, items }),
			);
			return NextResponse.json({ message: 'Payment failed' });
		}
	} catch (error) {
		console.log('[Checkout Callback] Error:', error);
		return NextResponse.json({ error: 'Server error' });
	}
}



