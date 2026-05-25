import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "LUXED <onboarding@resend.dev>", // ← your client's verified domain
    to: ["chukwukaenudeme@gmail.com"], // ← your client's inbox
    replyTo: email, // ← so replying goes back to the user
    subject: `New enquiry from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 520px;">
        <h2 style="color: #1E90FF;">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background:#f4f4f4; padding:12px; border-radius:8px;">${message}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
