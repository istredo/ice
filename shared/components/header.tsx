import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui/button';
import { User } from 'lucide-react';
import { SearchInput } from './search-input';
import Link from 'next/link';
import { CartButton } from './cart-button';


interface Props {
	className?: string;
	hasSearch?: boolean;
	hasCart?: boolean;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
	return (
		<header className={cn(' border-b', className)}>
			<Container className='flex items-center justify-between py-8'>

				<div className='flex items-center gap-4'>
					<Image src='/pizza.ico' alt='Logo' width={35} height={35} />
					<Link href='/'>
						<h1 className='text-2xl uppercase font-black'>Морозко</h1>
						<p className='text-sm text-gray-400 leading-3'>Невероятно вкусно!</p>
					</Link>
				</div>

				<div className="mx-10 flex-1">
					{
						hasSearch &&
						<div className='mx-10 flex-1'>
							<SearchInput />
						</div>
					}
				</div>

				<div className='flex gap-4'>
					<Button variant='outline' className='flex items-center gap-1 '>
						<User size={16} />
						Войти
					</Button>
					{
						hasCart &&
						<CartButton />
					}
				</div>
			</Container>
		</header>
	);
};