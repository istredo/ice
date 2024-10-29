import React from 'react';

interface Props {
	orderId: number;
	price: number;
	paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, price, paymentUrl }) => (
	`<div>
			<h1>Заказ №${orderId}</h1>
			<p>
				Оплатите заказ на сумму <b>${price} ₽</b>. Перейдите
				<a href=${paymentUrl}>по этой ссылке</a> для оплаты заказа.
			</p>
		</div>`
)

