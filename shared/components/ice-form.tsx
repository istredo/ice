import React from 'react';

import { Title } from './title';
import { Button } from '../ui/button';
import { cn } from '@/shared/lib/utils';
import { ProductImage } from './product-image';

interface Props {
	imageUrl: string;
	name: string;
	ingredients: any[];
	items?: any[];
	loading?: boolean;
	onSubmit?: (itemId: number, ingredients: number[]) => void;
	className?: string;
}

export const IceForm: React.FC<Props> = ({
	name,
	items,
	imageUrl,
	ingredients,
	loading,
	onSubmit,
	className,
}) => {
	const textDetaills = 'loremipsum'
	const totalPrice = 322
	const size = 250
	return (
		<div className={cn(className, 'flex flex-1')}>
			<ProductImage imageUrl={imageUrl} size={size} />
			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />
				<p className="text-gray-400">{textDetaills}</p>
				<Button
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};