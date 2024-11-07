'use client';
import React from 'react';
import { Ingredient, ProductItem } from '@prisma/client';
import { Title } from '../../title';
import { Button } from '../../../ui/button';
import { cn } from '@/shared/lib/utils';
import { ProductImage } from '../../product-image';
import { Variants } from '../../variants';
import { IceSize, mapIceSizes, mapSugar, Sugar, sugarTypes } from '../../../const/ice';
import { IngridientItem } from '../../ingridient-item';
import { calcTotalPrice } from '../../../lib';
import { getWindowWidth, useMediaQuery, useProductOptions } from '../../../hooks';



interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	loading?: boolean;
	onSubmit: (itemId: number, ingredients: number[]) => void;
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

	const { size,
		sugar,
		selectedIngredients,
		availableSizes,
		currentItemId,
		setSize,
		setSugar,
		addIngredient } = useProductOptions(items)

	const textDetaills = `${mapIceSizes[size]}, ${selectedIngredients.size ? `${mapSugar[sugar].toLowerCase()}, с дополнительными игредиетами` : `${mapSugar[sugar].toLowerCase()}`}`

	const totalPrice = calcTotalPrice(
		items, ingredients, size, sugar, selectedIngredients
	)

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients))
		}
	}
	const isMedia1024 = useMediaQuery(1024)
	const { windowWidth } = getWindowWidth()
	let mobileWidth = windowWidth - 40

	return (

		<>
			{
				isMedia1024 ?
					<div className={cn(className, `flex  flex-col w-[${mobileWidth}px] h-[550px] mr-6`)}>

						<Title text={name} size="xs" className="font-extrabold mb-1 text-center" />

						<ProductImage imageUrl={imageUrl} size={size} isMedia={isMedia1024} />
						<div className=" bg-[#f7f6f5] p-1 h-[450px] flex flex-col">
							<div className="flex flex-col gap-4 mt-5">
								<Variants items={availableSizes} value={String(size)} onClick={value => setSize(Number(value) as IceSize)} isMedia={isMedia1024} />
								<Variants items={sugarTypes} value={String(sugar)} onClick={value => setSugar(Number(value) as Sugar)} isMedia={isMedia1024} />
							</div>
							<Button
								loading={loading}
								onClick={handleClickAdd}
								className="h-[55px] px-10 text-base rounded-[18px]  mt-5">
								Добавить в корзину за {totalPrice} ₽
							</Button>
							<div className="bg-gray-50 p-5 rounded-md h-[250px] overflow-auto scrollbar mt-2 w-[350px]">
								<div className="grid grid-cols-2 gap-3">
									{
										ingredients.map((ingredient) => (
											<IngridientItem
												key={ingredient.id}
												name={ingredient.name}
												price={ingredient.price}
												imageUrl={ingredient.imageUrl}
												onClick={() => addIngredient(ingredient.id)}
												active={selectedIngredients.has(ingredient.id)}
												isMedia={isMedia1024}
											/>
										))
									}
								</div>
							</div>


						</div>
					</div>
					:
					<div className={cn(className, 'flex')}>
						<ProductImage imageUrl={imageUrl} size={size} />
						<div className="w-[490px] bg-[#f7f6f5] p-7">
							<Title text={name} size="md" className="font-extrabold mb-1" />
							<p className="text-gray-400">{textDetaills}</p>
							<div className="flex flex-col gap-4 mt-7">
								<Variants items={availableSizes} value={String(size)} onClick={value => setSize(Number(value) as IceSize)} />
								<Variants items={sugarTypes} value={String(sugar)} onClick={value => setSugar(Number(value) as Sugar)} />
							</div>
							<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
								<div className="grid grid-cols-3 gap-3">
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
								loading={loading}
								onClick={handleClickAdd}
								className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
								Добавить в корзину за {totalPrice} ₽
							</Button>
						</div>
					</div>
			}
		</>
	);
};