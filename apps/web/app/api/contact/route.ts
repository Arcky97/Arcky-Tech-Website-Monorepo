import { NextResponse } from "next/server";
import { Resend } from "resend";
import { env } from "@/config/env";

export async function POST(req: Request) {

  if (!env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const resend = new Resend(env.RESEND_API_KEY);

  try {
    const formData = await req.formData();

    // Honeypot check (spam bots)
    const company = formData.get("company");
    if (company) {
      return NextResponse.json({ success: true });
    }

    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const message = formData.get("message")?.toString();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: `Website Contact <${env.CONTACT_FROM_EMAIL}>`,
      to: env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `New contact message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}

        Message:
        ${message}
        `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}