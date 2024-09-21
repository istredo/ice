const mapIceSizes = {
	250: 'Малый',
	500: 'Средний',
	1000: 'Большой',
}
const mapSugar = {
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