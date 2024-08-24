'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useIngredients } from '@/hooks/use-ingredients';


interface Props {
	className?: string;
}


export const Filters: React.FC<Props> = ({ className }) => {

	const { ingredients, loading } = useIngredients();
	const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));
	return (
		<div className={cn(className)}>
			<Title text='Настройки' size='sm' className='mb-5 font-bold' />
			{/* Чекбоксы */}
			<div className='flex flex-col gap-4'>
				<FilterCheckbox text='Новинки' value='1' />
				<FilterCheckbox text='Хиты продаж' value='2' />
			</div>
			{/* Ценовой слайдер */}
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={4000}
						defaultValue={0}
					/>
					<Input
						type="number"
						min={100}
						max={4000}
						placeholder="4000"
					/>
				</div>

				<RangeSlider
					min={0}
					max={4000}
					step={10}
					value={[0, 4000]}
				/>
			</div>

			<CheckboxFiltersGroup
				title='Наполнители'
				className='mt-5'
				limit={3}
				defaultItems={items.slice(0, 3)}
				items={items}
				loading={loading}
			/>
		</div>
	);
};