export default function ProductPage({ params: { id } }: { params: { id: string } }) {
	console.log(id)
	return < p > Product{id}</ p>
}