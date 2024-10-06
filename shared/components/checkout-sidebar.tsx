import React from 'react';
import { cn } from '@/shared/lib/utils';
import { WhiteBlock } from './white-block';
import { CheckoutDetails } from './checkout-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '../ui';
const DISCOUNT = 10
const DELIVERY_PRICE = 500
interface Props {
	totalAmount: number;
	loading?: boolean;
	className?: string;
}
export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
	const discountPrice = Math.floor(totalAmount * (DISCOUNT * 0.01))

	return (
		<WhiteBlock className={cn('p-6 sticky top-4', className)}>
			<div className="flex flex-col gap-1">
				<span className="text-xl">Итого:</span>
				<span className="h-11 text-[34px] font-extrabold">{totalAmount} ₽</span>
			</div>
			<CheckoutDetails title={
				<div className="flex items-center">
					<Package size={18} className="mr-2 text-gray-400" />
					Стоимость товаров:
				</div>
			} value={`${totalAmount - discountPrice}₽`} />
			<CheckoutDetails
				title={
					<div className="flex items-center">
						<Truck size={18} className="mr-2 text-gray-400" />
						Доставка:
					</div>
				}
				value={`${DELIVERY_PRICE} ₽`}
			/>
			<CheckoutDetails
				title={
					<div className="flex items-center">
						<Percent size={18} className="mr-2 text-gray-400" />
						Скидка:
					</div>
				}
				value={`${discountPrice} ₽`}
			/>
			<Button
				loading={loading}
				type="submit"
				className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
				Перейти к оплате
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	);
};