import NextAuth from 'next-auth';
import { authOptions } from '@/shared/const/auth-options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

