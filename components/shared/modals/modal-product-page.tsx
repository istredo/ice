import React from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { Title } from '../title';
import { Product } from '@prisma/client';


interface Props {
	className?: string;
	product: Product
}

export const ModalProductPage: React.FC<Props> = ({ product, className }) => {
	return (
		<Dialog>
			<DialogContent
				className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className,
				)}>
				<Title text='asd' > {product.name}</Title>
			</DialogContent>
		</Dialog>
	);
};