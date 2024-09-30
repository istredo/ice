import React from "react"
import qs from "qs"
import { useRouter } from "next/navigation"
import { Filters } from "./use-filters"



export const useQuery = (filters: Filters) => {
	const router = useRouter()
	React.useEffect(() => {
		const query = qs.stringify({
			...filters.prices,
			ingredients: Array.from(filters.selectIngredients),
			size: Array.from(filters.selectSize),
			sugar: Array.from(filters.selectSugar),
		}, {
			arrayFormat: 'comma'
		})

		router.push(`?${query}`, { scroll: false })
	}, [filters, router])

}