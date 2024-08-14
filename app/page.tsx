import { Container, Filters, ProductsList, Title, TopBar } from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";

import Image from "next/image";

export default function Home() {
	return (
		<>
			<Container className="mt-10">

				<Title text="Ассортимент" size='lg' className="font-extrabold" />

			</Container>
			<TopBar />
			<Container className="mt-10 pb-14">
				<div className="flex gap-[60px]">
					{/* Настройки */}
					<div className="w-[250px]">
						<Filters />
					</div>
					{/* Товары */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							Список товаров
							<ProductsList title={"Мороженое"} items={[
								{
									id: 1,
									name: "Фисташка",
									imageUrl: 'https://br-delivery.ru/upload/iblock/1e8/b2gw05otqw3ghfw5u53kyqvfsej0v0xn.jpg',
									price: 1549,
									items: [{ price: 1549 }]
								},
								{
									id: 2,
									name: "Шоколадное",
									imageUrl: 'https://br-delivery.ru/upload/iblock/ebc/nbqa7p66rv1j6674blwx31hkhsek60yr.jpg',
									price: 1549,
									items: [{ price: 1049 }]
								},
								{
									id: 3,
									name: "Бабл гам",
									imageUrl: 'https://br-delivery.ru/upload/iblock/a41/ajs9niofoav2q4ijm2qar2jnrp0342mt.jpg',
									price: 1549,
									items: [{ price: 3549 }]
								},
								{
									id: 4,
									name: "Вишня",
									imageUrl: 'https://br-delivery.ru/upload/iblock/1c7/3y1kvrdm1y4oxtwotl8cxvnvgh82q206.jpg',
									price: 1549,
									items: [{ price: 2549 }]
								},
								{
									id: 5,
									name: "Ванильное",
									imageUrl: 'https://br-delivery.ru/upload/iblock/e0d/cfk5kutjupdl6of20ncksgbsk3ztt3sr.jpg',
									price: 1549,
									items: [{ price: 1549 }]
								},
							]} categoryId={0} />
							<ProductsList title={"Торт-мороженое"} items={[
								{
									id: 1,
									name: "Торт-мороженое",
									imageUrl: 'https://brand-ice.ru/upload/iblock/fc8/fc884aa5791f4410ad7f1b52963b3bf4.jpg',
									price: 1549,
									items: [{ price: 1549 }]
								},
								{
									id: 2,
									name: "Торт-мороженка",
									imageUrl: 'https://brand-ice.ru/upload/iblock/fc8/fc884aa5791f4410ad7f1b52963b3bf4.jpg',
									price: 1549,
									items: [{ price: 1049 }]
								},
								{
									id: 3,
									name: "Торт",
									imageUrl: 'https://brand-ice.ru/upload/iblock/fc8/fc884aa5791f4410ad7f1b52963b3bf4.jpg',
									price: 1549,
									items: [{ price: 3549 }]
								},
								{
									id: 4,
									name: "Тортик",
									imageUrl: 'https://brand-ice.ru/upload/iblock/fc8/fc884aa5791f4410ad7f1b52963b3bf4.jpg',
									price: 1549,
									items: [{ price: 2549 }]
								},
								{
									id: 5,
									name: "Торт-мороженое",
									imageUrl: 'https://brand-ice.ru/upload/iblock/fc8/fc884aa5791f4410ad7f1b52963b3bf4.jpg',
									price: 1549,
									items: [{ price: 1549 }]
								},
							]} categoryId={1} />
						</div>
					</div>
				</div>
			</Container>
			<div style={{ height: '1000px' }}></div>

		</>
	);
}

