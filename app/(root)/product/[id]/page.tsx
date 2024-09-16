import { Container, Title, Variants } from "@/components/shared";
import { ProductImage } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
	const product = await prisma.product.findFirst({ where: { id: Number(id) } })


	if (!product) return notFound();

	return <Container className="flex my-10 justify-center ">
		<ProductImage imageUrl={product.imageUrl} size={40} className='' />
		<div className='w-[490px] bg-[#FFCFCFC] p-7'>
			<Title text={product.name} size="md" className="mb-1 font-extrabold" />
			<p className="text-gray-400">Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.</p>
			<Variants items={[
				{
					name: 'Маленький',
					value: '1',
				},
				{
					name: 'Средний',
					value: '2',
				},
				{
					name: 'Большой',
					value: '3',
				},
			]
			} />
		</div>
	</Container>
}