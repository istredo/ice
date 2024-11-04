import { cn } from '@/shared/lib/utils';
import React from 'react';


interface Props {
	className?: string;
	imageUrl: string;
	size: 250 | 500 | 1000;
	isMedia?: boolean;
}

export const ProductImage: React.FC<Props> = ({ className, imageUrl, size, isMedia }) => {
	return (
		<>
			<div className={cn('flex items-center justify-center flex-1 relative', className)}>

				{
					isMedia ?
						<img
							src={imageUrl}
							alt="Logo"
							className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
								'w-[100px] h-[100px]': size === 250,
								'w-[120px] h-[120px]': size === 500,
								'w-[150px] h-[150px]': size === 1000,
							})}
						/>
						:
						<img
							src={imageUrl}
							alt="Logo"
							className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
								'w-[300px] h-[300px] ': size === 250,
								'w-[400px] h-[400px] ': size === 500,
								'w-[490px] h-[490px] ': size === 1000,
							})}
						/>
				}

			</div>
		</>
	);
}; 