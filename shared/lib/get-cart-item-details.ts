import { Ingredient } from '@prisma/client';
import { IceSize, mapSugar, Sugar } from '../const/ice';
import { CartStateItem } from './get-cart-details';


export const getCartItemDetails = (
	ingredients: CartStateItem['ingredients'],
	sugar?: Sugar,
	iceSizes?: IceSize,
): string => {
	const details = [];

	if (iceSizes && sugar) {
		const typeName = sugar ? mapSugar[1] : mapSugar[0];
		details.push(`${typeName} ${iceSizes} мл.`);
	}

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	return details.join(', ');
};
