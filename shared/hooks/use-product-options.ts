import React, { useEffect } from "react";
import { useSet } from "react-use";
import { ProductItem } from "@prisma/client";
import { IceSize, Sugar } from "../const/ice"
import { Variant } from "../components/variants"
import { getAvailableSizes } from "../lib";

interface ReturnProps {
	size: IceSize;
	sugar: Sugar;
	selectedIngredients: Set<number>;
	availableSizes: Variant[];
	setSize: (value: IceSize) => void;
	setSugar: (value: Sugar) => void;
	addIngredient: (value: number) => void;
}
export const useProductOptions = (items: ProductItem[]): ReturnProps => {
	const [size, setSize] = React.useState<IceSize>(500)
	const [sugar, setSugar] = React.useState<Sugar>(1)
	const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))
	const availableSizes = getAvailableSizes(items, sugar)


	useEffect(() => {
		const currentSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled)
		const availableSize = availableSizes?.find((item) => !item.disabled)
		if (!currentSize && availableSize) {
			setSize(Number(availableSize.value) as IceSize)
		}
	}, [sugar])
	return {
		size,
		sugar,
		selectedIngredients,
		availableSizes,
		setSize,
		setSugar,
		addIngredient,
	}
}