import { Suspense } from "react";
import { Container, Filters, ProductsList, Title, TopBar, Stories } from "@/shared/components";
import { findIces, GetSearchParams } from "@/shared/lib/find-ices";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
	const categories = await findIces(searchParams);

	return (
		<>
			<Container className="mt-10 max-md:hidden">

				<Title text="Ассортимент" className="font-extrabold text-4xl max-md:text-xl" />

			</Container>
			<TopBar categories={categories.filter((category) => category.products.length > 0)} />

			<Stories />
			<Container className="mt-10 pb-14 max-md:mt-4">
				<div className="flex gap-[60px]">
					{/* Настройки */}
					<div className="w-[250px] max-lg:hidden">
						<Suspense><Filters /></Suspense>
					</div>
					{/* Товары */}
					<div className="flex-1">
						<div className="flex flex-col gap-16 max-md:gap-4">
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

