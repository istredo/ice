import { Container, Filters, Title, TopBar } from "@/components/shared";

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
						</div>
					</div>
				</div>
			</Container>
			<div style={{ height: '1000px' }}></div>

		</>
	);
}

