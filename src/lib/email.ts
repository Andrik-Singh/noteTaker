import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendEmail({to,subject,text}) {
    await resend.emails.send({
        from:process.env.RESEND_FROM_EMAIL as string,
        to,
        subject,
        text,
        html:"<p>Reset your password</p>"
    })
}