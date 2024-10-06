'use client';

import {
	CheckoutItem,
	CheckoutSidebar,
	Container,
	Title,
	WhiteBlock,
} from '@/shared/components';
import { IceSize, Sugar } from '@/shared/const/ice';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';
import { Textarea } from '@/shared/ui';
import React from 'react';



export default function CheckoutPage() {
	const [submitting, setSubmitting] = React.useState(false);
	const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
		const updateQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, updateQuantity)
	}

	return (
		<Container className="mt-10">
			<Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

			<div className='flex gap-10'>
				{/* Левая часть */}
				<div className='flex flex-col gap-10  flex-1 mb-20'>
					<WhiteBlock title='1. Корзина'>
						<div className='flex flex-col gap-5'>
							{items.map((item) => (
								<CheckoutItem
									id={item.id}
									key={item.id}
									imageUrl={item.imageUrl}
									details={getCartItemDetails(
										item.ingredients,
										item.sugar as Sugar,
										item.iceSize as IceSize,
									)}
									name={item.name}
									price={item.price}
									quantity={item.quantity}
									disabled={item.disabled}
									onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
									onClickRemove={() => removeCartItem(item.id)} />
							))}
						</div>
					</WhiteBlock>
					<WhiteBlock title='2. Ваши данные'>
						<div className='grid grid-cols-2 gap-5'>
							<input type="text" name='firstName' className='text-base' placeholder='Имя' />
							<input type="text" name='lastName' className='text-base' placeholder='Фамилия' />
							<input type="text" name='email' className='text-base' placeholder='e-mail' />
							<input type="text" name='phone' className='text-base' placeholder='Телефон' />
						</div>
					</WhiteBlock>
					<WhiteBlock title='3. Адрес доставки'>
						<div className='flex flex-col pag-5'>
							<input type="text" name='firstName' className='text-base' placeholder='Имя' />
							<Textarea rows={5} className='text-base' placeholder='Комментарий к заказу...' />
						</div>
					</WhiteBlock>
				</div>

				{/* Правая часть */}
				<div className="w-[450px]">
					<CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
				</div >
			</div>
		</Container >
	);
}
