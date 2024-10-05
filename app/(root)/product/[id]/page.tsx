import { ChooseProduct, Container } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) }, include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							items: true
						}
					}
				}
			},
			items: true,
		}
	})


	if (!product) return notFound();

	return <Container className="flex my-10 justify-center ">
		<ChooseProduct product={product} />
	</Container>
}