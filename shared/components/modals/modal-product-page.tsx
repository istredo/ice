'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { ProductForm } from '../product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { IceForm } from '../ice-form';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

1
interface Props {
	className?: string;
	product: ProductWithRelations
}


export const ModalProductPage: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const firstItem = product.items[0]
	const isIce = Boolean(firstItem.sugar)
	const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading])
	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id
			await addCartItem({
				productItemId: itemId,
				ingredients,
			})

			toast.success('Добавлено в корзину')
			router.back()
		} catch (error) {
			toast.error('Не удалось добавить в корзину');
			console.error(error)
		}
	}
	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className,
				)}>
				{
					isIce ? <IceForm onSubmit={onSubmit} imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} loading={loading} />
						: <ProductForm onSubmit={onSubmit} imageUrl={product.imageUrl} name={product.name} price={firstItem.price} loading={loading} />
				}
			</DialogContent>
		</Dialog>
	);
};