import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface Props {
	orderId: number;
	price: number;
	discount: number;
	items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, price, discount, items }) => {
	let itemsHtml = '';
	items.forEach((item) => {
		const name = item.productItem.product.name;
		const price = item.productItem.price;
		const quantity = item.quantity;
		const total = price * quantity;
		itemsHtml += `<li>${name} | ${price} ₽ x ${quantity} шт. = ${total} ₽</li>`;
	});
	return (
		`<div>
		 <h1>Спасибо за покупку! 🎉</h1>
	
		 <p>Ваш заказ №${orderId} оплачен. Список товаров:</p>
	
		 <hr />
	
		 <ul>
					 ${itemsHtml}
		 </ul>
		 <p>Размер Вашей скидки составил: ${discount} ₽</p>
		 	<p>Итого: ${price} ₽</p>
	  </div>`
	);
}
