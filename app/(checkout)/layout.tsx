import { Container, Header } from '@/shared/components';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'IceShop | Корзина',
	description: 'Your ice cream shop',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="min-h-screen bg-[#eef4f0]">
			<Container>
				<Suspense>
					<Header hasSearch={false} hasCart={false} className="border-b-gray-200" />
				</Suspense>
				{children}
			</Container>
		</main>
	);
}
