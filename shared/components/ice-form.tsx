import React from 'react';
import { useSet } from 'react-use';
import { Ingredient, ProductItem } from '@prisma/client';
import { Title } from './title';
import { Button } from '../ui/button';
import { cn } from '@/shared/lib/utils';
import { ProductImage } from './product-image';
import { Variants } from './variants';
import { IceSize, iceSizes, Sugar, sugarTypes } from '../const/ice';
import { IngridientItem } from './ingridient-item';


interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items?: ProductItem[];
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
	const [size, setSize] = React.useState<IceSize>(500)
	const [sugar, setSugar] = React.useState<Sugar>(1)
	const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))
	return (

		<div className={cn(className, 'flex flex-1 justify-between')}>
			<ProductImage imageUrl={imageUrl} size={size} />
			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />
				<p className="text-gray-400">{textDetaills}</p>
				<div className='flex flex-col gap-4 mt-7'>
					<Variants items={iceSizes} value={String(size)} onClick={value => setSize(Number(value) as IceSize)} />
					<Variants items={sugarTypes} value={String(sugar)} onClick={value => setSugar(Number(value) as Sugar)} />
				</div>
				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
					<div className='grid grid-cols-3 gap-3'>
						{
							ingredients.map((ingredient) => (
								<IngridientItem
									key={ingredient.id}
									name={ingredient.name}
									price={ingredient.price}
									imageUrl={ingredient.imageUrl}
									onClick={() => addIngredient(ingredient.id)}
									active={selectedIngredients.has(ingredient.id)}
								/>
							))
						}
					</div>
				</div>
				<Button
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};