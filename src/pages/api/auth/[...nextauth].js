import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/user";
import connectMongoDB from "../../../utils/database";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {

                const { username, password } = credentials;

                try {

                    await connectMongoDB();
                    const user = await User.findOne({ username, password }).exec();
                    console.log(user ? user : "Not found");

                    if (!user) {
                        return null;
                    }

                    return {
                        name: { username: user.username }
                    };

                } catch (error) {
                    throw new Error();
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);