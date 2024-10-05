import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
	query?: string;
	sortBy?: string;
	size?: string;
	sugar?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 4000;

export const findIces = async (
	params: GetSearchParams
) => {
	const size = params.size?.split(',').map(Number);
	const sugarType = params.sugar?.split(',').map(Number);
	const ingredientsIdArr = params.ingredients?.split(',').map(Number);
	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;
	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: 'desc',
				},
				where: {
					ingredients: ingredientsIdArr
						? {
							some: {
								id: {
									in: ingredientsIdArr,
								},
							},
						}
						: undefined,
					items: {
						some: {
							size: {
								in: size,
							},
							sugar: {
								in: sugarType,
							},
							price: {
								gte: minPrice, // >=
								lte: maxPrice, // <=
							},
						},
					},
				},
				include: {
					ingredients: true,
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: 'asc',
						},
					},
				},
			},
		},
	});

	return categories;
};