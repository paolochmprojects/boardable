import { Provider, Role } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';


declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified?: boolean;
      role: Role[];
      provider: Provider[];
      image?: string;
    } & DefaultSession['user'];
  }
}