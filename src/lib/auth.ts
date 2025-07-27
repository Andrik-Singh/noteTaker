import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sendEmail } from "@/lib/email";
import { schema } from "@/db/schema";
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema:schema
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        },
        // sendVerificationEmail: async ({ user, url, token }, request) => {
        //     console.log("working")
        //     await sendEmail({
        //         to: user.email,
        //         subject: "Verify your email address",
        //         text: `Click the link to verify your email: ${url}`,
        //     });
        // },
        // requireEmailVerification:true,
        resetPasswordTokenExpiresIn: 3600, // 1 hour
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }
    }
})