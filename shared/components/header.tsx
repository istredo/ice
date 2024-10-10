'use client';
import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { cn } from '@/shared/lib/utils';
import { Button } from '../ui';
import { SearchInput, CartButton, ProfileButton, Container } from '@/shared/components';


interface Props {
	className?: string;
	hasSearch?: boolean;
	hasCart?: boolean;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
	const searchParams = useSearchParams();
	const { data: session } = useSession()
	console.log(session)
	React.useEffect(() => {

		if (searchParams.has('paid')) {
			setTimeout(() => {
				toast.success('Заказ оплачён! Вся информация отправлена на почту.')
			}, 500)
		}


	}, []);
	return (
		<header className={cn(' border-b', className)}>
			<Container className="flex items-center justify-between py-8">

				<div className="flex items-center gap-4">
					<Image src='/pizza.ico' alt='Logo' width={35} height={35} />
					<Link href='/'>
						<h1 className="text-2xl uppercase font-black">Морозко</h1>
						<p className="text-sm text-gray-400 leading-3">Невероятно вкусно!</p>
					</Link>
				</div>

				<div className="mx-10 flex-1">
					{
						hasSearch &&
						<div className="mx-10 flex-1">
							<SearchInput />
						</div>
					}
				</div>

				<div className="flex gap-4">
					<ProfileButton />
					{
						hasCart &&
						<CartButton />
					}
				</div>
			</Container>
		</header>
	);
};