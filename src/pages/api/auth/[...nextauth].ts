import NextAuth from 'next-auth';
import { query as q } from "faunadb";


import Providers from 'next-auth/providers';
import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
//   jwt: {
//       signingKey: process.env.SIGNING_KEY,
//   },
  callbacks: {
      async session(session){
       try{
          session.user.email
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index("subscription_by_user_ref"),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index("user_by_email"),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index("subscription_by_status"),
                "active"
              )
              ])
          )
        );
        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
       }
       catch{
         return{
           ...session,
           activeSubscription: null
         }
       }
      },
      async signIn(user, account, profile, ) {
        const email  = user.email;

        try{
            await fauna.query(
              q.If(
                q.Not(
                  q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
                ),
                q.Create(q.Collection('users'), 
                 { data: { email: user.email}}
                ),
                q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
              )
            );
            return true;
        }
        catch{
            return false;
        }
    }
  }
  // database: process.env.DATABASE_URL,
});
