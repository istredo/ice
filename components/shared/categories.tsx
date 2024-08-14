'use client'
import React from 'react';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '../store/category';

interface Props {
	className?: string;
}

const cats = [
	{ id: 0, name: "Мороженое" },
	{ id: 1, name: "Торт-мороженое" },
	{ id: 2, name: "Мягкое" },
	{ id: 3, name: "Фруктовый лёд" }
]

export const Categories: React.FC<Props> = ({ className }) => {
	const activeCategoryId = useCategoryStore((state) => state.activeId)
	return (
		<div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
			{cats.map(({ name, id }, index) => (
				<a key={index} href={`/#${name}`} className={cn('flex items-center font-bold h-11 rounded-2xl px-5 text-nowrap', activeCategoryId === id && 'bg-white shadow-md shadow-gray-200 text-primary')}>
					<button>{name}</button>
				</a>
			))}
		</div>
	);
};