'use client';
import { cn } from '@/shared/lib/utils';
import React from 'react';

import { CartItemProps } from './cart-item-details.types';
import { CountButton } from '../count-button';
import { Trash2Icon } from 'lucide-react';
import { CartItemDetailsImage, CartItemDetailsPrice, CartItemInfo } from './index';
import { useMediaQuery } from '@/shared/hooks';

interface Props extends CartItemProps {
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickRemove?: () => void;
	className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
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
	const isMedia1024 = useMediaQuery(1024)
	return (
		<>
			{
				isMedia1024 ?
					<div
						className={cn(
							'flex bg-white p-3 gap-6 max-md:w-5/6 flex-col',
							{
								'opacity-50 pointer-events-none': disabled,
							},
							className,
						)}>
						<div className="flex flex-row">
							<CartItemDetailsImage src={imageUrl} className="mr-3" />
							<CartItemInfo name={name} details={details} />
						</div>
						<div className="flex items-center justify-between">
							<CountButton onClick={onClickCountButton} value={quantity} />
							<div className="flex items-center gap-3">
								<CartItemDetailsPrice value={price} />
								<Trash2Icon
									onClick={onClickRemove}
									className="text-gray-400 cursor-pointer hover:text-gray-600"
									size={16}
								/>
							</div>
						</div>

					</div>
					:
					<div
						className={cn(
							'flex bg-white p-5 gap-6',
							{
								'opacity-50 pointer-events-none': disabled,
							},
							className,
						)}>
						<CartItemDetailsImage src={imageUrl} />

						<div className="flex-1">
							<CartItemInfo name={name} details={details} />

							<hr className="my-3" />

							<div className="flex items-center justify-between">
								<CountButton onClick={onClickCountButton} value={quantity} />

								<div className="flex items-center gap-3">
									<CartItemDetailsPrice value={price} />
									<Trash2Icon
										onClick={onClickRemove}
										className="text-gray-400 cursor-pointer hover:text-gray-600"
										size={16}
									/>
								</div>
							</div>
						</div>
					</div>
			}
		</>
	);
};
