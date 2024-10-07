import React from 'react';

import { CheckoutItem, WhiteBlock, CheckoutItemSkeleton } from '@/shared/components';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { getCartItemDetails } from '@/shared/lib';
import { IceSize, Sugar } from '@/shared/const/ice';

interface Props {
	items: CartStateItem[];
	onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
	removeCartItem: (id: number) => void;
	loading?: boolean;
	className?: string;
}

export const CheckoutCartForm: React.FC<Props> = ({
	items,
	onClickCountButton,
	removeCartItem,
	loading,
	className,
}) => {
	return (
		<WhiteBlock title="1. Корзина" className={className}>
			<div className="flex flex-col gap-5">
				{loading
					? [...Array(3)].map((_, index) => <CheckoutItemSkeleton key={index} />)
					: items.map((item) => (
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
	);
};