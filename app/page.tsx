import { Container, Title, TopBar } from "@/components/shared";

import Image from "next/image";

export default function Home() {
	return (
		<>
			<Container className="mt-10">

				<Title text="Ассортимент" size='lg' className="font-extrabold" />

			</Container>
			<TopBar />
			<div style={{ height: '1000px' }}></div>

		</>
	);
}

