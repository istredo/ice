import { Ingredient, ProductItem } from "@prisma/client"
import { IceSize, Sugar } from "../const/ice"

export const calcTotalPrice = (items: ProductItem[], ingredients: Ingredient[], size: IceSize, sugar: Sugar, selectedIngredients: Set<number>) => {
	const icePrice = items?.find((items) => items.size == size && items.sugar == !!sugar)?.price || 0
	const ingredientsPrices = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0)
	return icePrice + ingredientsPrices
};