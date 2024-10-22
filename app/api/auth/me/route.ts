import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/shared/const/auth-options';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: any, res: any) {
	try {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
		}

		const data = await prisma.user.findUnique({
			where: {
				id: Number(session.user.id),
			},
			select: {
				fullName: true,
				email: true,
				password: false,
			},
		});

		return NextResponse.json(data);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
	}
}