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
	size?: 250 | 500 | 1000;
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
			imageUrl: 'https://br-delivery.ru/upload/iblock/e0d/cfk5kutjupdl6of250ncksgbsk3ztt3sr.jpg',
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 3),
			},
		},
	});
	const ice2 = await prisma.product.create({
		data: {
			name: 'Вишневое удовольствие',
			imageUrl: 'https://br-delivery.ru/upload/iblock/1c7/3y1kvrdm1y4oxtwotl8cxvnvgh82q2506.jpg',
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
				connect: _ingredients.slice(10, 33),
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
				token: 'авбгд',
			},
			{
				userId: 2,
				totalAmount: 0,
				token: 'ежзиклмн',
			},
		],
	});

	await prisma.cartItem.create({
		data: {
			productItemId: 1,
			cartId: 1,
			quantity: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3  }],
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
