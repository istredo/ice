import { ProductItem } from "@prisma/client"
import { iceSizes, Sugar } from "../const/ice"
import { Variant } from "../components/variants"

export const getAvailableSizes = (items: ProductItem[], sugar: Sugar): Variant[] => {
	const availableTypes = items.filter((item) => item.sugar == !!sugar)

	return iceSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !availableTypes.some((ice) => Number(ice.size) === Number(item.value))
	}))
}