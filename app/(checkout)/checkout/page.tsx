'use client';


import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/shared/hooks';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/const/checkout-form-schema';
import {
	CheckoutSidebar,
	Container,
	Title,
	CheckoutCartForm,
	CheckoutPersonalForm,
	CheckoutAddressForm,
} from '@/shared/components';


export default function CheckoutPage() {
	const [submitting, setSubmitting] = React.useState(false);
	const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
		const updateQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, updateQuantity)
	}
	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});
	const onSubmit = async (data: CheckoutFormValues) => {
		console.log(data)
	};
	return (
		<Container className="mt-10">
			<Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						{/* Левая часть */}
						<div className='flex flex-col gap-10  flex-1 mb-20'>
							<CheckoutCartForm
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								items={items}
								loading={loading}
							/>

							<CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

							<CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
						</div>

						{/* Правая часть */}
						<div className="w-[450px]">
							<CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
						</div >
					</div>
				</form>
			</FormProvider>
		</Container >
	);
}
