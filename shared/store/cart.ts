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
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.updateItemQuantity(id, quantity);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},

	addCartItem: async (values: any) => {

	},

	removeCartItem: async (id: number) => {
		try {
			set((state) => ({
				loading: true,
				error: false,
				items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
			}));
			const data = await Api.cart.removeCartItem(id);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set((state) => ({
				loading: false,
				items: state.items.map((item) => ({ ...item, disabled: false })),
			}));
		}
	},

}));