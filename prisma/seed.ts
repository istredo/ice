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
	sugar?: boolean;
	size?: 250 | 500 | 1000 | 2500;
}) => {
	return {
		productId,
		price: randomDecimalNumber(190, 600),
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
			imageUrl: 'https://br-delivery.ru/upload/iblock/f6b/8wtppspnf102ko6i2aqqxt2j6wpn71j2.jpg',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 4),
			},
		},
	});
	const ice2 = await prisma.product.create({
		data: {
			name: 'Черничное удовольствие',
			imageUrl: 'https://br-delivery.ru/upload/iblock/efd/tqjdmlpghgim59qytclbbbif80m6pb37.jpg',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(3, 10),
			},
		},
	});
	const ice3 = await prisma.product.create({
		data: {
			name: 'Шоколадное наслаждение',
			imageUrl: 'https://br-delivery.ru/upload/iblock/ebc/nbqa7p66rv1j6674blwx31hkhsek60yr.jpg',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(4, 6),
			},
		},
	});
	const cake1 = await prisma.product.create({
		data: {
			name: 'Love',
			imageUrl: 'https://brand-ice.ru/upload/iblock/fc8/fc884aa5791f4410ad7f1b52963b3bf4.jpg',
			categoryId: 2,
			ingredients: {
				connect: _ingredients.slice(2, 5),
			},
		},
	});
	const cake2 = await prisma.product.create({
		data: {
			name: 'Мишка',
			imageUrl: 'https://br-delivery.ru/upload/iblock/cb5/rd3a0dvhumuzczak7ghp23c35n03w91s.jpg',
			categoryId: 2,
			ingredients: {
				connect: _ingredients.slice(3, 8),
			},
		},
	});
	const cake3 = await prisma.product.create({
		data: {
			name: 'Сыр',
			imageUrl: 'https://br-delivery.ru/upload/iblock/e64/g7esk7890dhcje51buvqqs4zfz7ccfdk.jpg',
			categoryId: 2,
			ingredients: {
				connect: _ingredients.slice(1, 4),
			},
		},
	});
	const cake4 = await prisma.product.create({
		data: {
			name: 'Праздничный',
			imageUrl: 'https://brand-ice.ru/upload/iblock/033/033aa0e34406fd66ef226845ac5be693.jpg',
			categoryId: 2,
			ingredients: {
				connect: _ingredients.slice(5, 10),
			},
		},
	});

	await prisma.productItem.createMany({
		data: [
			// Мороженка "Сливочный пломбир"
			generateProductItem({ productId: ice1.id, sugar: true, size: 250 }),
			generateProductItem({ productId: ice1.id, sugar: false, size: 500 }),
			generateProductItem({ productId: ice1.id, sugar: false, size: 1000 }),

			// Мороженка "Вишневое удовольствие"
			generateProductItem({ productId: ice2.id, sugar: true, size: 250 }),
			generateProductItem({ productId: ice2.id, sugar: true, size: 500 }),
			generateProductItem({ productId: ice2.id, sugar: true, size: 1000 }),
			generateProductItem({ productId: ice2.id, sugar: false, size: 250 }),
			generateProductItem({ productId: ice2.id, sugar: false, size: 500 }),
			generateProductItem({ productId: ice2.id, sugar: false, size: 1000 }),

			// Мороженка "Шоколадное наслаждение"
			generateProductItem({ productId: ice3.id, sugar: true, size: 250 }),
			generateProductItem({ productId: ice3.id, sugar: false, size: 500 }),
			generateProductItem({ productId: ice3.id, sugar: false, size: 1000 }),


			// Торт "Love"
			generateProductItem({ productId: cake1.id, sugar: true, size: 2500 }),
			generateProductItem({ productId: cake1.id, sugar: false, size: 2500 }),
			generateProductItem({ productId: cake1.id, sugar: false, size: 2500 }),

			// Торт "Мишка"
			generateProductItem({ productId: cake2.id, sugar: true, size: 2500 }),
			generateProductItem({ productId: cake2.id, sugar: true, size: 2500 }),
			generateProductItem({ productId: cake2.id, sugar: true, size: 2500 }),
			generateProductItem({ productId: cake2.id, sugar: false, size: 2500 }),
			generateProductItem({ productId: cake2.id, sugar: false, size: 2500 }),
			generateProductItem({ productId: cake2.id, sugar: false, size: 2500 }),

			// Торт "Сыр"
			generateProductItem({ productId: cake3.id, sugar: true, size: 2500 }),
			generateProductItem({ productId: cake3.id, sugar: false, size: 2500 }),
			generateProductItem({ productId: cake3.id, sugar: false, size: 2500 }),

			// Торт "Праздничный"
			generateProductItem({ productId: cake4.id, sugar: true, size: 2500 }),
			generateProductItem({ productId: cake4.id, sugar: false, size: 2500 }),
			generateProductItem({ productId: cake4.id, sugar: false, size: 2500 }),

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

}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
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
