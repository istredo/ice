import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface Props {
	orderId: number;
	items: CartItemDTO[];
}

export const OrderCanceledTemplate: React.FC<Props> = ({ orderId, items }) => (
	<div>
		<h1>Проблема с оплатой заказа</h1>

		<p>Ваш заказ #{orderId} не был оплачен. Список товаров:</p>

		<hr />

		<ul>
			{items.map((item) => (
				<li key={item.id}>
					{item.productItem.product.name} | {item.productItem.price} ₽ x {item.quantity} шт. ={' '}
					{item.productItem.price * item.quantity} ₽
				</li>
			))}
		</ul>
	</div>
);
