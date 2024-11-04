import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Ingredient } from '@prisma/client';


interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	className?: string;
	ingredients?: Ingredient[]
}

export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	imageUrl,
	className,
	ingredients
}) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`} className="flex flex-col h-full  justify-between">
				<div className="flex flex-col">
					<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px] max-md:h-[170px]  ">
						<img className="w-[215px] h-[215px] max-md:w-[150px] max-md:h-[150px]" src={imageUrl} alt={name} />
					</div>

					<Title text={name} size="sm" className="mb-1 mt-3 font-bold max-md:text-[18px]" />

					<p className="text-sm text-gray-400">
						{
							ingredients?.map((ingredient) => ingredient.name).join(', ')
						}				</p>
				</div>

				<div className="flex justify-between items-center mt-4 flex-grow-0 flex-shrink-0 auto">
					<span className="text-[20px] max-md:text-[16px]">
						от <b>{price} ₽</b>
					</span>

					<Button variant="secondary" className="text-base font-bold max-md:px-2 max-md:text-[14px]">
						<Plus size={20} className="mr-1" />
						Добавить
					</Button>

				</div>
			</Link>
		</div>
	);
};
