import { Resend } from "resend";
import { getContactSchema } from "@/lib/contact-schema";
import { site } from "@/lib/site-config";

// Server-side validation only checks success/failure and reads parsed
// field values -- the per-field message text (English here) never
// reaches the client; the client shows its own fixed messages below,
// not parsed.error details, so which language this schema instance
// uses doesn't matter for behavior.
const contactSchema = getContactSchema(false);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — see .env.local.example. Fail loudly in server
    // logs but keep the client message calm, and point them at WhatsApp/
    // phone, which always work with zero setup.
    console.error(
      "[contact] RESEND_API_KEY is not set — quote request email was not sent."
    );
    return Response.json(
      {
        error:
          "Online submission isn't connected yet. Please call or WhatsApp us directly and we'll respond right away.",
      },
      { status: 503 }
    );
  }

  const { name, company, email, phone, projectType, message } = parsed.data;
  const resend = new Resend(apiKey);

  // Destination is env-configurable rather than hardcoded — set
  // CONTACT_FORM_TO_EMAIL to route requests wherever makes sense right now
  // (e.g. your own inbox while testing, or the client's once they're
  // ready to receive live enquiries directly). Falls back to the site's
  // published contact address if unset.
  const toEmail = process.env.CONTACT_FORM_TO_EMAIL || site.email;

  try {
    const { error } = await resend.emails.send({
      // TODO(Faris): swap for a verified sending domain (e.g.
      // quotes@dubaisign.ae) once dubaisign.ae is added and verified in
      // the Resend dashboard — resend.dev only delivers to the Resend
      // account owner's own address until then. See .env.local.example.
      from: "Dubai Sign Website <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `New quote request from ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Company: ${company || "-"}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        `Project type: ${projectType}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend returned an error:", error);
      return Response.json(
        { error: "Could not send your request. Please call or WhatsApp us directly." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Failed to send quote request email:", err);
    return Response.json(
      { error: "Could not send your request. Please call or WhatsApp us directly." },
      { status: 502 }
    );
  }
}
