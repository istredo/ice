import { cn } from '@/shared/lib/utils';
import React from 'react';


import { CartItemProps } from '../cart/cart-item-details.types';
import { X } from 'lucide-react';
import { CartItemDetailsCountButton, CartItemDetailsImage, CartItemDetailsPrice, CartItemInfo } from '../cart/index';

interface Props extends CartItemProps {
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickRemove?: () => void;
	className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
	imageUrl,
	name,
	price,
	quantity,
	details,
	disabled,
	onClickCountButton,
	onClickRemove,
	className,
}) => {
	return (
		<div
			className={cn(
				'flex items-center justify-between',
				{
					'opacity-50 pointer-events-none': disabled,
				},
				className,
			)}>
			<div className="flex items-center gap-5 flex-1">
				<CartItemDetailsImage src={imageUrl} />
				<CartItemInfo name={name} details={details} />
			</div>
			<CartItemDetailsPrice value={price} />
			<div className="flex items-center gap-5 ml-20">
				<CartItemDetailsCountButton onClick={onClickCountButton} value={quantity} />
				<button onClick={onClickRemove}>
					<X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
				</button>
			</div>
		</div >
	);
};
