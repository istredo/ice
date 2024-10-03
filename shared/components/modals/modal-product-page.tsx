'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { ProductForm } from '../product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { IceForm } from '../ice-form';
import { useCartStore } from '@/shared/store';


interface Props {
	className?: string;
	product: ProductWithRelations
}


export const ModalProductPage: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const firstItem = product.items[0]
	const isIce = Boolean(firstItem.sugar)
	const addCartItem = useCartStore(state => state.addCartItem)
	const onAddProduct = () => {
		addCartItem({
			productItemId: firstItem.id,
		})
	}
	const onAddIce = (productItemId: number, ingredients: number[]) => {
		addCartItem({
			productItemId: firstItem.id,
			ingredients,
		})
	}
	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className,
				)}>
				{
					isIce ? <IceForm onSubmit={onAddIce} imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} />
						: <ProductForm onSubmit={onAddProduct} imageUrl={product.imageUrl} name={product.name} price={firstItem.price} />
				}
			</DialogContent>
		</Dialog>
	);
};