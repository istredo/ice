import { cn } from '@/shared/lib/utils';
import React from 'react';


import { CartItemProps } from '../cart/cart-item-details.types';
import { X } from 'lucide-react';
import { CartItemDetailsCountButton, CartItemDetailsImage, CartItemDetailsPrice, CartItemInfo } from '../cart/index';

interface Props extends CartItemProps {
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickRemove?: () => void;
	className?: string;
	isMedia?: boolean;
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
	isMedia,
}) => {
	return (
		<>
			{
				isMedia ?
					<div
						className={cn(
							'flex items-center justify-between  ',
							{
								'opacity-50 pointer-events-none': disabled,
							},
							className,
						)}>
						<div className="flex items-center gap-2 flex-1">
							<CartItemDetailsImage src={imageUrl} />
							<CartItemInfo name={name} details={details} />
						</div>

						<div className="flex flex-col items-center gap-1 ml-14">
							<CartItemDetailsPrice value={price} />
							<div className='flex items-center'>
								<CartItemDetailsCountButton onClick={onClickCountButton} value={quantity} />
								<button onClick={onClickRemove}>
									<X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
								</button>
							</div>
						</div>
					</div >
					:
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
			}		</>
	);
};
