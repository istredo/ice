export const mapIceSizes = {
	250: 'Малое',
	500: 'Среднее',
	1000: 'Большое',
}
export const mapSugar = {
	0: 'Без сахара',
	1: 'Классическое'
}
export const iceSizes = Object.entries(mapIceSizes).map(([value, name]) => ({
	name,
	value
}))
export const sugarTypes = Object.entries(mapSugar).map(([value, name]) => ({
	name,
	value
}))
export type IceSize = keyof typeof mapIceSizes
export type Sugar = keyof typeof mapSugar