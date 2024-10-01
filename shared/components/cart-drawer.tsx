'use client';
import React from 'react';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet"
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '../lib';
import { useCartStore } from '../store';
import { IceSize, Sugar } from '../const/ice';
import { useCart } from '../hooks';
interface Props {
	className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
	const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
		const updateQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, updateQuantity)
	}
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-[#eef4f0]">
				<SheetHeader>
					<SheetTitle>
						В корзине <span className="font-bold">{items.length} товара</span>
					</SheetTitle>
				</SheetHeader>


				<div className="-mx-6 mt-5 overflow-auto flex-1">
					{items.map((item) => (
						<div key={item.id} className="mb-2">
							<CartDrawerItem
								id={item.id}
								imageUrl={item.imageUrl}
								details={getCartItemDetails(
									item.ingredients,
									item.sugar as Sugar,
									item.iceSize as IceSize,
								)}
								disabled={item.disabled}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
								onClickRemove={() => removeCartItem(item.id)}
							/>
						</div>
					))}
				</div>
				<SheetFooter className="-mx-6 bg-white p-8">
					<div className="w-full">
						<div className="flex mb-4">
							<span className="flex flex-1 text-lg text-neutral-500">
								Итого
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
							</span>

							<span className="font-bold text-lg">{totalAmount} ₽</span>
						</div>
						<Link href="/checkout">
							<Button
								type="submit"
								className="w-full h-12 text-base">
								Оформить заказ
								<ArrowRight className="w-5 ml-2" />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};