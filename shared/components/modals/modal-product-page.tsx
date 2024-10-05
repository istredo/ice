'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { ProductWithRelations } from '@/@types/prisma';
import { ChooseProduct } from '../choose-product';

1
interface Props {
	className?: string;
	product: ProductWithRelations
}


export const ModalProductPage: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className,
				)}>
				<ChooseProduct product={product} onSubmit={() => router.back()} />
			</DialogContent>
		</Dialog>
	);
};