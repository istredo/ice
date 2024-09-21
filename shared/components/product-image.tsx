import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
	className?: string;
	imageUrl: string;
	size: 250 | 500 | 1000;
}

export const ProductImage: React.FC<Props> = ({ className, imageUrl, size }) => {
	return (
		<>
			<div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>

				<img
					src={imageUrl}
					alt="Logo"
					className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
						'w-[300px] h-[300px]': size === 250,
						'w-[400px] h-[400px]': size === 500,
						'w-[490px] h-[490px]': size === 1000,
					})}
				/>

			</div>
		</>
	);
}; 