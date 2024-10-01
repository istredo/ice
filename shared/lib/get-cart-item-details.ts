import { IceSize, mapSugar, Sugar } from '../const/ice';
import { CartStateItem } from './get-cart-details';


export const getCartItemDetails = (
	ingredients: CartStateItem['ingredients'],
	sugar?: Sugar,
	iceSizes?: IceSize,
): string => {
	const details = [];

	if (iceSizes && sugar) {
		const typeName = Number(sugar);
		details.push(`${mapSugar[typeName]} ${iceSizes} мл.`);
	}

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	return details.join(', ');
};
