import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            scope: 'read:user',
        }),
    //     Providers.Google({
    //         clientId: process.env.GOOGLE_ID,
    //         clientSecret: process.env.GOOGLE_SECRET,
    //     }),
    // ],
    // secret: process.env.SECRET,
    // session: {
    //     jwt: true,
    // },
    ],
    // database: process.env.DATABASE_URL,
});
