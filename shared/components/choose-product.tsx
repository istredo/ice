'use client'
import React from 'react';

import toast from 'react-hot-toast';
import router from 'next/router';
import { useCartStore } from '../store';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm, IceForm } from "@/shared/components";

interface Props {
	product: ProductWithRelations;
	onSubmit?: VoidFunction;
}

export const ChooseProduct: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {

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

			_onSubmit?.();
		} catch (error) {
			toast.error('Не удалось добавить в корзину');
			console.error(error)
		}
	}
	if (isIce) {
		return (
			<IceForm
				onSubmit={onSubmit}
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.items}
				loading={loading} />

		)
	} else {
		return (
			<ProductForm
				onSubmit={onSubmit}
				imageUrl={product.imageUrl}
				name={product.name}
				price={firstItem.price}
				loading={loading} />

		)
	}
};