'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { ProductForm } from '../product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { IceForm } from '../ice-form';


interface Props {
	className?: string;
	product: ProductWithRelations
}

export const ModalProductPage: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const isIce = Boolean(product.items[0].sugar)
	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className,
				)}>
				{
					isIce ? <IceForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} />
						: <ProductForm imageUrl={product.imageUrl} name={product.name} />
				}
			</DialogContent>
		</Dialog>
	);
};