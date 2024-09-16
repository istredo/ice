import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface Price {
	priceFrom?: number;
	priceTo?: number;
}
export interface QueryFilters {
	ingredients: string;
	size: string;
	sugar: string;
	priceFrom: number;
	priceTo: number;
}

export interface Filters {
	selectSize: Set<string>
	selectIngredients: Set<string>
	selectSugar: Set<string>
	prices: Price
}
interface ReturnProps extends Filters {
	setPrices: (name: keyof Price, value: number) => void;
	toggleIngredients: (id: string) => void;
	toggleSize: (id: string) => void;
	toggleSugar: (id: string) => void;

}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams()
	const [selectIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')))
	const [selectSize, { toggle: toggleSize }] = useSet(new Set<string>(searchParams.get('size')?.split(',') || []))
	const [selectSugar, { toggle: toggleSugar }] = useSet(new Set<string>(searchParams.get('sugar')?.split(',') || []))
	const [prices, setPrices] = React.useState<Price>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined
	});
	const updatePrice = (name: keyof Price, value: number) => {
		setPrices((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	return React.useMemo(
		() => ({
			selectSize,
			selectSugar,
			prices,
			selectIngredients,
			toggleIngredients,
			toggleSize,
			toggleSugar,
			setPrices: updatePrice,
		}),
		[selectSize, selectSugar, selectIngredients, prices],
	);
};