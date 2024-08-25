'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilters } from '@/hooks/use-filters';
import { useIngredients } from '@/hooks/use-ingredients';
import { useQuery } from '@/hooks/use-query';
interface Props {
	className?: string;
}
export const Filters: React.FC<Props> = ({ className }) => {

	const { ingredients, loading } = useIngredients();
	const filters = useFilters();
	const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));
	useQuery(filters)
	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0]);
		filters.setPrices('priceTo', prices[1]);
	};
	return (
		<div className={cn(className)}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />
			{/* Чекбоксы */}
			<CheckboxFiltersGroup
				title='Начинка'
				className='mt-5'
				limit={3}
				defaultItems={items.slice(0, 3)}
				items={items}
				loading={loading}
				onChange={filters.toggleIngredients}
				selected={filters.selectIngredients}
				name='ingredients'
			/>
			<CheckboxFiltersGroup
				title='Объем'
				className='mt-5'
				limit={4}
				items={[
					{ text: 'Малый', value: '250' },
					{ text: 'Средний', value: '500' },
					{ text: 'Большой', value: '1000' },
				]}
				loading={loading}
				onChange={filters.toggleSize}
				selected={filters.selectSize}
				name='sizes'
			/>
			<CheckboxFiltersGroup
				title='Сахар'
				className='mt-5'
				limit={2}
				items={[
					{ text: 'Без сахара', value: '0' },
				]}
				loading={loading}
				onChange={filters.toggleSugar}
				selected={filters.selectSugar}
				name='sizes'
			/>
			{/* Ценовой слайдер */}
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={4000}
						value={String(filters.prices.priceFrom)}
						onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
					/>
					<Input
						type="number"
						min={100}
						max={4000}
						placeholder="4000"
						value={String(filters.prices.priceTo)}
						onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>

				<RangeSlider
					min={0}
					max={4000}
					step={100}
					value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 4000]}
					onValueChange={updatePrices}
				/>
			</div>


		</div>
	);
};