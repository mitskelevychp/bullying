import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, phone, message, recaptchaToken } = await request.json();

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Ім’я та номер телефону є обов’язковими" },
        { status: 400 }
      );
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Відсутній reCAPTCHA токен" },
        { status: 400 }
      );
    }

    const body = {
      event: {
        token: recaptchaToken,
        expectedAction: "LOGIN",
        // TODO:
        siteKey: "6LdtgmkrAAAAAF90jlSOUcng0eJMtTMcfTjE257B",
      },
    };
    const verificationRes = await fetch(
      // TODO:
      `https://recaptchaenterprise.googleapis.com/v1/projects/forbiz-ua/assessments?key=${process.env.RECAPTCHA_ENTERPRISE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const verificationData = await verificationRes.json();

    if (
      !verificationData.riskAnalysis ||
      verificationData.riskAnalysis.score < 0.5
    ) {
      return NextResponse.json(
        { error: "reCAPTCHA перевірка не пройдена" },
        { status: 403 }
      );
    }

    // Send email
    // TODO:
    await resend.emails.send({
      from: "FOP For Biz <onboarding@forbiz.website>",
      to: "forbizua.first@gmail.com",
      subject: "ForBiz UA: Нове звернення",
      html: `
        <h2>Нове звернення</h2>
        <p><strong>Ім'я:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        ${message ? `<p><strong>Коментар:</strong> ${message}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Помилка при відправці повідомлення" },
      { status: 500 }
    );
  }
}
