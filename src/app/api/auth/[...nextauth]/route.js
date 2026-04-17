import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-client-secret',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Full Name', type: 'text', placeholder: 'Jane Doe' },
        email: { label: 'Email', type: 'email', placeholder: 'jane@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        const { db } = await connectToDatabase();
        const user = await db.collection('users').findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error('Invalid Email or Password');
        }

        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordMatch) {
          throw new Error('Invalid Email or Password');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || 'user',
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      
      // If it's a Google/Social login, we might need to fetch the role from DB if not provided
      if (account && !user?.role) {
         const { db } = await connectToDatabase();
         const dbUser = await db.collection('users').findOne({ email: token.email });
         if (dbUser) {
           token.role = dbUser.role || 'user';
         } else {
           // Create user record if doesn't exist (first time social login)
           await db.collection('users').insertOne({
             name: token.name,
             email: token.email,
             role: 'user',
             createdAt: new Date(),
           });
           token.role = 'user';
         }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };