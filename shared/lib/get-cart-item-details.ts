import { Ingredient } from '@prisma/client';
import { IceSize, mapSugar, Sugar } from '../const/ice';


export const getCartItemDetails = (
	ingredients: Ingredient[],
	sugar?: Sugar,
	iceSizes?: IceSize,
): string => {
	const details = [];

	if (iceSizes && sugar) {
		const typeName = mapSugar[sugar];
		details.push(`${typeName} ${iceSizes} мл.`);
	}

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	return details.join(', ');
};
