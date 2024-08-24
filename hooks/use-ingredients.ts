import { Api } from "@/services/api-client"
import { Ingredient } from "@prisma/client"
import React, { useState } from "react"

export const useIngredients = () => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);


	React.useEffect(() => {
		async function fetchIngredients() {
			try {
				const ingredients = await Api.ingredients.getAll();
				console.log(ingredients)
				setIngredients(ingredients);
			} catch (error) {
				console.log(error);
			}
		}

		fetchIngredients();
	}, []);

	return {
		ingredients
	};
};
