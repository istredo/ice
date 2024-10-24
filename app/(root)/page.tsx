import { Suspense } from "react";
import { Container, Filters, ProductsList, Title, TopBar, Stories } from "@/shared/components";
import { findIces, GetSearchParams } from "@/shared/lib/find-ices";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
	const categories = await findIces(searchParams);

	return (
		<>
			<Container className="mt-10">

				<Title text="Ассортимент" size='lg' className="font-extrabold" />

			</Container>
			<TopBar categories={categories.filter((category) => category.products.length > 0)} />

			<Stories />
			<Container className="mt-10 pb-14">
				<div className="flex gap-[60px]">
					{/* Настройки */}
					<div className="w-[250px]">
						<Suspense><Filters /></Suspense>
					</div>
					{/* Товары */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
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
		</>
	);
}

