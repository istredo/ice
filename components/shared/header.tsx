import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui/button';
import { User } from 'lucide-react';


interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn('border border-b', className)}>
			<Container className='flex items-center justify-between py-8'>

				<div className='flex items-center gap-4'>
					<Image src='/pizza.ico' alt='Logo' width={35} height={35} />
					<div>
						<h1 className='text-2xl uppercase font-black'>Морозко</h1>
						<p className='text-sm text-gray-400 leading-3'>Невероятно вкусно!</p>
					</div>
				</div>

				<div>
					<Button variant='outline' className='flex items-center gap-1 '>
						<User size={16} />
						Войти
					</Button>
				</div>
			</Container>
		</header>
	);
};