import type { Metadata } from "next";
import { Header } from "@/shared/components";


export const metadata: Metadata = {
	title: "Your IceCream Shop",
	// description: "Generated by create next app",
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen">

			<Header />
			{modal}
			{children}
		</main>


	);
}
