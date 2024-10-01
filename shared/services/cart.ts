import { axiosInstance } from "./instance";
import { CartDTO } from "./dto/cart.dto";

export const fetchCart = async (): Promise<CartDTO> => {
	const { data } = await axiosInstance.get<CartDTO>('/cart')
	return data
};

export function updateItemQuantity(id: number, quantity: number) {
	throw new Error("Function not implemented.");
}
