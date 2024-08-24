'use client'
import React from 'react';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';


type Item = FilterCheckboxProps;
interface Props {
	title: string;
	items: Item[];
	defaultItems: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	defaultValue?: string;
	onChange?: (values: string[]) => void;
	className?: string;
	loading?: boolean;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 3,
	searchInputPlaceholder = 'Поиск...',
	onChange,
	defaultValue,
	className,
	loading

}) => {
	const [showAll, setShowAll] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState('')
	const list = showAll ? items.filter((item) => item.text.toLocaleLowerCase().includes(searchValue.toLowerCase())) : defaultItems?.slice(0, limit)

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	if (loading) {
		return (
			<div className={className}>
				<p className="font-bold mb-3">{title}</p>
				{
					...Array(limit).fill(0).map((_, index) => <Skeleton className='h-6 mb-4 rounded-[8px]' key={index} />)
				}
				<Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
			</div>
		)
	}
	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>
			{showAll && (
				<div className="mb-5">
					<Input
						onChange={onChangeSearch}
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
					/>
				</div>
			)

			}
			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{list.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={false}
						onCheckedChange={(ids) => console.log(ids)}
					/>
				))}
			</div>
			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)

			}
		</div>
	);
};