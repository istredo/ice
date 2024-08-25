export const categories = [
	{
		name: 'Мороженое',
	},
	{
		name: 'Торт-мороженое',
	},
	{
		name: 'Коктейли',
	},
	{
		name: 'Напитки',
	},
];

export const _ingredients = [
	{
		name: 'Пралине',
		price: 179,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
	},
	{
		name: 'Фисташка',
		price: 79,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
	},
	{
		name: 'Банан',
		price: 79,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
	},
	{
		name: 'Киви',
		price: 59,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
	},
	{
		name: 'Красный виноград',
		price: 59,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
	},
	{
		name: 'Сочные ананасы',
		price: 59,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
	},
	{
		name: 'Мята',
		price: 39,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
	},
	{
		name: 'Шоколад',
		price: 59,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
	},
	{
		name: 'Манго',
		price: 79,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
	},
	{
		name: 'Яблоко',
		price: 79,
		imageUrl:
			'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
	},
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
	{
		name: 'Кофе Латте',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
		categoryId: 4,
	},
	{
		name: 'Банановый молочный коктейль',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp',
		categoryId: 3,
	},
	{
		name: 'Карамельное яблоко молочный коктейль',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp',
		categoryId: 3,
	},
	{
		name: 'Молочный коктейль с печеньем Орео',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
		categoryId: 3,
	},
	{
		name: 'Классический молочный коктейль 👶',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp',
		categoryId: 3,
	},
	{
		name: 'Ирландский Капучино',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp',
		categoryId: 4,
	},
	{
		name: 'Кофе Карамельный капучино',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
		categoryId: 4,
	},
	{
		name: 'Кофе Кокосовый латте',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp',
		categoryId: 4,
	},
	{
		name: 'Кофе Американо',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp',
		categoryId: 4,
	},
	{
		name: 'Кофе Латте',
		imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
		categoryId: 4,
	},
];
