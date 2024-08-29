import { Container, Filters, ProductsList, Title, TopBar } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					ingredients: true,
					items: true
				}
			}
		}
	})

	return (
		<>
			<Container className="mt-10">

				<Title text="Ассортимент" size='lg' className="font-extrabold" />

			</Container>
			<TopBar categories={categories.filter((category) => category.products.length > 0)} />
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
							{
								categories.map((category) => (
									category.products.length > 0 && <ProductsList
										key={category.id}
										title={category.name}
										items={category.products}
										categoryId={category.id} />
								))
							}
						</div>
					</div>
				</div>
			</Container>
			<div style={{ height: '1000px' }}></div>

		</>
	);
}

