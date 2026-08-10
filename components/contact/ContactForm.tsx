"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, projectTypeOptions, type ContactFormValues } from "@/lib/contact-schema";
import { buildQuoteWhatsAppLink, site } from "@/lib/site-config";

const inputClass =
  "border border-border-soft px-[14px] py-3 text-sm transition-colors duration-200 focus:border-blue focus:outline-none";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      projectType: projectTypeOptions[0],
      message: "Hi, I'd like to enquire about flagpoles for my project.",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please check your connection and try again.");
    }
  }

  if (submitted) {
    return (
      <div className="border border-border-soft bg-white p-10">
        <div className="mb-2.5 text-xl font-bold text-ink">Thank you. Your request has been received.</div>
        <div className="text-sm leading-relaxed text-ink/70">
          A member of our team will contact you shortly. For urgent enquiries, call{" "}
          <a href={site.phone.mobileHref} className="font-medium text-blue">
            {site.phone.mobile}
          </a>
          .
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[18px] border border-border-soft bg-white p-9" noValidate>
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-ink-soft">
          Name
          <input {...register("name")} className={inputClass} />
          {errors.name && <span className="text-xs font-normal text-red">{errors.name.message}</span>}
        </label>
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-ink-soft">
          Company
          <input {...register("company")} className={inputClass} />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-ink-soft">
          Email
          <input type="email" {...register("email")} className={inputClass} />
          {errors.email && <span className="text-xs font-normal text-red">{errors.email.message}</span>}
        </label>
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-ink-soft">
          Phone
          <input type="tel" {...register("phone")} className={inputClass} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-ink-soft">
        Project Type
        <select {...register("projectType")} className={`${inputClass} bg-white`}>
          {projectTypeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-ink-soft">
        Project Details
        <textarea rows={5} {...register("message")} className={`${inputClass} resize-y`} />
        {errors.message && <span className="text-xs font-normal text-red">{errors.message.message}</span>}
      </label>

      {serverError && (
        <div className="border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">{serverError}</div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-fit bg-ink px-7 py-[15px] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Submit Request"}
        </button>
        <button
          type="button"
          onClick={() => {
            // Read current field values at click time — react-hook-form is
            // uncontrolled, so a value bound at render time would go stale
            // as the visitor types.
            window.open(buildQuoteWhatsAppLink(getValues()), "_blank", "noopener,noreferrer");
          }}
          className="text-sm font-semibold text-whatsapp hover:underline"
        >
          Or send via WhatsApp instead →
        </button>
      </div>
      <p className="text-xs text-ink/50">
        WhatsApp opens with these details pre-filled — you still tap send yourself.
      </p>
    </form>
  );
}
