import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';


interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	className?: string;
}

export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	imageUrl,
	className,
}) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`}>
				<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
					<img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
				</div>

				<Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

				<p className="text-sm text-gray-400">
					Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Однажды ее семь до обеспечивает на берегу великий не которой переулка жизни что грамматики послушавшись заманивший пояс жаренные, ему заголовок сих.
				</p>

				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						от <b>{price} ₽</b>
					</span>

					<Button variant="secondary" className="text-base font-bold">
						<Plus size={20} className="mr-1" />
						Добавить
					</Button>

				</div>
			</Link>
		</div>
	);
};