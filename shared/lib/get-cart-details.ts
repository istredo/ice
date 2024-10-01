import { CartDTO, CartItemDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";


export type CartStateItem = {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	disabled?: boolean;
	iceSize?: number | null;
	sugar?: number | null;
	ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
	items: CartStateItem[];
	totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
	const items = data.userCart.items.map((item: CartItemDTO) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.product.name,
		imageUrl: item.productItem.product.imageUrl,
		price: calcCartItemTotalPrice(item),
		iceSize: item.productItem.size,
		sugar: item.productItem.sugar,
		disabled: false,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	})) as CartStateItem[];

	return {
		items,
		totalAmount: data.totalAmount,
	};
};
