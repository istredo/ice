import { create } from "zustand";
import { CartStateItem, getCartDetails } from "../lib/get-cart-details";
import { Api } from "../services/api-client";

export interface CartState {
	loading: boolean;
	error: boolean;
	totalAmount: number;
	items: CartStateItem[];

	/* Получение товаров из корзины */
	fetchCartItems: () => Promise<void>;
	/* Обновление товаров */
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;
	/* Добавление товаров */
	addCartItem: (values: any) => Promise<void>;
	/* Удаление */
	removeCartItem: (id: number) => Promise<void>;
}
export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.fetchCart();
			console.log(data)
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {

	},

	removeCartItem: async (id: number) => {
	},

	addCartItem: async (values: any) => {

	},
}));