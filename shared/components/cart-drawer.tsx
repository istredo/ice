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
interface Props {
	className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-[#eef4f0]">
				<SheetHeader>
					<SheetTitle>
						В корзине <span className="font-bold">3 товара</span>
					</SheetTitle>
				</SheetHeader>


				<div className="-mx-6 mt-5 overflow-auto flex-1">
					<div className="mb-2">
						<CartDrawerItem id={0} imageUrl={'https://br-delivery.ru/upload/iblock/f6b/8wtppspnf102ko6i2aqqxt2j6wpn71j2.jpg'}
							details={getCartItemDetails([{ name: 'Сливочное масло' }, { name: 'Сливочное масло' }], 1, 250)}
							name={'Мороженка'} price={200} quantity={1} />

					</div>
				</div>
				<SheetFooter className="-mx-6 bg-white p-8">
					<div className="w-full">
						<div className="flex mb-4">
							<span className="flex flex-1 text-lg text-neutral-500">
								Итого
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
							</span>

							<span className="font-bold text-lg">300 ₽</span>
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