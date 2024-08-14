import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';


interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
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
						max={2000}
						defaultValue={0}
					/>
					<Input
						type="number"
						min={100}
						max={2000}
						placeholder="2000"
					/>
				</div>

				<RangeSlider
					min={0}
					max={2000}
					step={10}
					value={[0, 2000]}
				/>
			</div>

			<CheckboxFiltersGroup
				title='Наполнители'
				className='mt-5'
				limit={4}
				defaultItems={[
					{
						text: 'Вишня',
						value: '6',
					},
					{
						text: 'Смородина',
						value: '7',
					},
					{
						text: 'Апельсин',
						value: '3',
					},
					{
						text: 'Клубника',
						value: '4',
					},
					{
						text: 'Манго',
						value: '5',
					}
				]}
				items={[
					{
						text: 'Вишня',
						value: '6',
					},
					{
						text: 'Смородина',
						value: '7',
					},
					{
						text: 'Апельсин',
						value: '3',
					},
					{
						text: 'Клубника',
						value: '4',
					},
					{
						text: 'Манго',
						value: '5',
					},
					{
						text: 'Персик',
						value: '8',
					},
					{
						text: 'Киви',
						value: '9',
					},
					{
						text: 'Шоколад',
						value: '10',
					},
					{
						text: 'Фисташка',
						value: '11',
					},
					{
						text: 'Бабл гам',
						value: '12',
					}
				]}
			/>
		</div>
	);
};