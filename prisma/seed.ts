import { Prisma } from '@prisma/client';
import { categories, _ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

const randomDecimalNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
	productId,
	sugar,
	size,
}: {
	productId: number;
	sugar?: number;
	size?: 250 | 500 | 1000 | 1000;
}) => {
	return {
		productId,
		price: size ? randomDecimalNumber(690, 1300) : randomDecimalNumber(190, 380),
		sugar,
		size,
	} as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'User Test',
				email: 'user@test.ru',
				password: hashSync('111111', 10),
				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Admin Admin',
				email: 'admin@test.ru',
				password: hashSync('111111', 10),
				verified: new Date(),
				role: 'ADMIN',
			},
		],
	});

	await prisma.category.createMany({
		data: categories,
	});

	await prisma.ingredient.createMany({
		data: _ingredients,
	});

	await prisma.product.createMany({
		data: products,
	});

	const ice1 = await prisma.product.create({
		data: {
			name: 'Сливочный пломбир',
			imageUrl: '/assets/ice_vanila.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 4),
			},
		},
	});
	const ice2 = await prisma.product.create({
		data: {
			name: 'Черничное удовольствие',
			imageUrl: '/assets/ice_black.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(3, 10),
			},
		},
	});
	const ice3 = await prisma.product.create({
		data: {
			name: 'Шоколадное наслаждение',
			imageUrl: '/assets/ice_choco.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(4, 6),
			},
		},
	});
	const ice4 = await prisma.product.create({
		data: {
			name: 'Клубничное настроение',
			imageUrl: '/assets/ice_strawberry.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 8),
			},
		},
	});
	const ice5 = await prisma.product.create({
		data: {
			name: 'Морозная свежесть',
			imageUrl: '/assets/ice_mint.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(3, 8),
			},
		},
	});
	const ice6 = await prisma.product.create({
		data: {
			name: 'Тропический бриз',
			imageUrl: '/assets/ice_orange.webp',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 6),
			},
		},
	});
	const cake1 = await prisma.product.create({
		data: {
			name: 'Love',
			imageUrl: '/assets/cake_strawberry.webp',
			categoryId: 2,
			ingredients: {
				connect: _ingredients.slice(2, 5),
			},
		},
	});
	const cake2 = await prisma.product.create({
		data: {
			name: 'Шоколадный торт',
			imageUrl: '/assets/cake_choco.webp',
			categoryId: 2,
			ingredients: {
				connect: _ingredients.slice(3, 8),
			},
		},
	});
	const cake3 = await prisma.product.create({
		data: {
			name: 'Классика',
			imageUrl: '/assets/cake.webp',
			categoryId: 2,
			ingredients: {
				connect: _ingredients.slice(1, 4),
			},
		},
	});

	await prisma.productItem.createMany({
		data: [
			// Мороженка "Сливочный пломбир"
			generateProductItem({ productId: ice1.id, sugar: 1, size: 250 }),
			generateProductItem({ productId: ice1.id, sugar: 0, size: 500 }),
			generateProductItem({ productId: ice1.id, sugar: 0, size: 1000 }),

			// Мороженка "Вишневое удовольствие"
			generateProductItem({ productId: ice2.id, sugar: 1, size: 250 }),
			generateProductItem({ productId: ice2.id, sugar: 1, size: 500 }),
			generateProductItem({ productId: ice2.id, sugar: 1, size: 1000 }),
			generateProductItem({ productId: ice2.id, sugar: 0, size: 250 }),
			generateProductItem({ productId: ice2.id, sugar: 0, size: 500 }),
			generateProductItem({ productId: ice2.id, sugar: 0, size: 1000 }),

			// Мороженка "Шоколадное наслаждение"
			generateProductItem({ productId: ice3.id, sugar: 1, size: 250 }),
			generateProductItem({ productId: ice3.id, sugar: 0, size: 500 }),
			generateProductItem({ productId: ice3.id, sugar: 0, size: 1000 }),

			// Мороженка "Клубничное настроение"
			generateProductItem({ productId: ice4.id, sugar: 1, size: 250 }),
			generateProductItem({ productId: ice4.id, sugar: 1, size: 500 }),
			generateProductItem({ productId: ice4.id, sugar: 1, size: 1000 }),
			generateProductItem({ productId: ice4.id, sugar: 0, size: 250 }),
			generateProductItem({ productId: ice4.id, sugar: 0, size: 500 }),
			generateProductItem({ productId: ice4.id, sugar: 0, size: 1000 }),

			// Мороженка "Морозная свежесть"
			generateProductItem({ productId: ice5.id, sugar: 1, size: 250 }),
			generateProductItem({ productId: ice5.id, sugar: 1, size: 500 }),
			generateProductItem({ productId: ice5.id, sugar: 1, size: 1000 }),
			generateProductItem({ productId: ice5.id, sugar: 0, size: 250 }),
			generateProductItem({ productId: ice5.id, sugar: 0, size: 500 }),
			generateProductItem({ productId: ice5.id, sugar: 0, size: 1000 }),

			// Мороженка "Тропический бриз"
			generateProductItem({ productId: ice6.id, sugar: 1, size: 250 }),
			generateProductItem({ productId: ice6.id, sugar: 1, size: 500 }),
			generateProductItem({ productId: ice6.id, sugar: 1, size: 1000 }),
			generateProductItem({ productId: ice6.id, sugar: 0, size: 250 }),
			generateProductItem({ productId: ice6.id, sugar: 0, size: 500 }),
			generateProductItem({ productId: ice6.id, sugar: 0, size: 1000 }),


			// Торт "Love"
			generateProductItem({ productId: cake1.id, sugar: 1, size: 1000 }),
			generateProductItem({ productId: cake1.id, sugar: 0, size: 1000 }),
			generateProductItem({ productId: cake1.id, sugar: 0, size: 1000 }),

			// Торт "Мишка"
			generateProductItem({ productId: cake2.id, sugar: 1, size: 1000 }),
			generateProductItem({ productId: cake2.id, sugar: 1, size: 1000 }),
			generateProductItem({ productId: cake2.id, sugar: 1, size: 1000 }),
			generateProductItem({ productId: cake2.id, sugar: 0, size: 1000 }),
			generateProductItem({ productId: cake2.id, sugar: 0, size: 1000 }),
			generateProductItem({ productId: cake2.id, sugar: 0, size: 1000 }),

			// Торт "Сыр"
			generateProductItem({ productId: cake3.id, sugar: 1, size: 1000 }),
			generateProductItem({ productId: cake3.id, sugar: 0, size: 1000 }),
			generateProductItem({ productId: cake3.id, sugar: 0, size: 1000 }),


			// Остальные продукты
			generateProductItem({ productId: 1 }),
			generateProductItem({ productId: 2 }),
			generateProductItem({ productId: 3 }),
			generateProductItem({ productId: 4 }),
			generateProductItem({ productId: 5 }),
			generateProductItem({ productId: 6 }),
			generateProductItem({ productId: 7 }),
			generateProductItem({ productId: 8 }),
			generateProductItem({ productId: 9 }),
			generateProductItem({ productId: 10 }),
		],
	});
	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: '1234',
			},
			{
				userId: 2,
				totalAmount: 0,
				token: '1111',
			},
		],
	});

	await prisma.cartItem.create({
		data: {
			productItemId: 1,
			cartId: 1,
			quantity: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			},
		},
	});
	await prisma.story.createMany({
		data: [
			{
				previewImageUrl:
					'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
			},
			{
				previewImageUrl:
					'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
			},

		],
	});

	await prisma.storyItem.createMany({
		data: [
			{
				storyId: 1,
				sourceUrl:
					'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
			},
			{
				storyId: 1,
				sourceUrl:
					'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
			},
			{
				storyId: 1,
				sourceUrl:
					'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
			},
		],
	});
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (e) {
		console.error(e);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
