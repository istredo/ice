'use client';


import { zodResolver } from '@hookform/resolvers/zod';
import { useCart, useMediaQuery } from '@/shared/hooks';
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
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Api } from '@/shared/services/api-client';


export default function CheckoutPage() {
	const [submitting, setSubmitting] = React.useState(false);
	const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
	const { data: session } = useSession()

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

	React.useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe();
			const [firstName, lastName] = data.fullName.split(' ');

			form.setValue('firstName', firstName);
			form.setValue('lastName', lastName);
			form.setValue('email', data.email);
		}

		if (session) {
			fetchUserInfo();
		}
	}, [session]);
	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true);

			const url = await createOrder(data);

			toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
				icon: '✅',
			});

			if (url) {
				location.href = url;
			}
		} catch (err) {
			console.log(err);
			setSubmitting(false);
			toast.error('Не удалось создать заказ', {
				icon: '❌',
			});
		}
	};

	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
		const updateQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, updateQuantity)
	}
	const isMedia1024 = useMediaQuery(1024)
	return (
		<>
			{
				isMedia1024 ?
					<Container className="mt-2 pr-10">
						<Title text="Оформление заказа" className="font-extrabold mb-2 text-[36px]" />
						<FormProvider {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className="flex flex-col gap-5  flex-1 mb-20">
									<CheckoutCartForm
										onClickCountButton={onClickCountButton}
										removeCartItem={removeCartItem}
										items={items}
										loading={loading}
										isMedia={isMedia1024}
									/>
									<CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ''} isMedia={isMedia1024} />
									<CheckoutAddressForm className={loading ? "opacity-40 pointer-events-none" : ''} />
								</div>
								<CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
							</form>
						</FormProvider>
					</Container >
					:
					<Container className="mt-10">
						<Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
						<FormProvider {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className="flex gap-10">
									{/* Левая часть */}
									<div className="flex flex-col gap-10  flex-1 mb-20">
										<CheckoutCartForm
											onClickCountButton={onClickCountButton}
											removeCartItem={removeCartItem}
											items={items}
											loading={loading}
										/>

										<CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ''} />

										<CheckoutAddressForm className={loading ? "opacity-40 pointer-events-none" : ''} />
									</div>

									{/* Правая часть */}
									<div className="w-[450px]">
										<CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
									</div >
								</div>
							</form>
						</FormProvider>
					</Container >
			}
		</>
	);
}

