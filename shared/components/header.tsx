'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { SearchInput, CartButton, ProfileButton, Container, AuthModal } from '@/shared/components';


interface Props {
	className?: string;
	hasSearch?: boolean;
	hasCart?: boolean;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
	const [openAuthModal, setOpenAuthModal] = React.useState(false);
	const searchParams = useSearchParams();
	const router = useRouter();
	React.useEffect(() => {
		let toastMessage = ''
		if (searchParams.has('paid')) {
			toastMessage = 'Заказ оплачён! Вся информация отправлена на почту.'
		}
		if (searchParams.has('verified')) {
			toastMessage = 'Почта подтверждена!'
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/')
				toast.success(toastMessage, {
					duration: 3000
				})
			}, 500)
		}


	}, []);
	return (
		<header className={cn(' border-b', className)}>
			<Container className="flex items-center justify-between py-8 max-md:flex-wrap">

				<div className="flex items-center gap-4">
					<Image src='/pizza.ico' alt='Logo' width={35} height={35} className="max-md:hidden" />
					<Link href='/'>
						<h1 className="text-2xl uppercase font-black max-md:text-xl">Морозко</h1>
						<p className="text-sm text-gray-400 leading-3 max-md:xs">Невероятно вкусно!</p>
					</Link>
				</div>

				<div className="mx-10 flex-1 max-md:mx-2">
					{
						hasSearch &&
						<div className="mx-10 flex-1 max-md:mx-2">
							<SearchInput />
						</div>
					}
				</div>

				<div className="flex gap-4 max-md:mt-2 max-md:justify-around max-md:w-full">

					<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
					{
						hasCart &&
						<CartButton />
					}
				</div>
			</Container>
		</header>
	);
};