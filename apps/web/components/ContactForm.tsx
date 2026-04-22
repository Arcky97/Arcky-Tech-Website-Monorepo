"use client"
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error ("Failed");

      setStatus("success");
      //e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col pag-4 text-left max-w-xl mx-auto mb-4"
    >
      {/* Honeypot field */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <div className="mb-2">
        <label className="block text-md font-bold text-gray-300 mb-1">Name:</label>
        <input
          type="text"
          name="name"
          required
          className="w-full rounded-md bg-gray-800 border border-gray-600 px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:shadow-blue-500"
        />
      </div>

      <div className="mb-2">
        <label className="block text-md font-bold text-gray-300 mb-1">Email:</label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-md bg-gray-800 border border-gray-600 px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:shadow-blue-500"
        />
      </div>

      <div className="mb-2">
        <label className="block text-md font-bold text-gray-300 mb-1">Message:</label>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full rounded-md bg-gray-800 border border-gray-600 px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:shadow-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="border select-none hover:bg-transparent text-sm md:text-base text-white px-2 py-1 md:px-3 md:py-2 rounded-lg transition-all duration-300 ease-in-out disabled:cursor-default cursor-pointer text-shadow-xl bg-blue-600 border-blue-600 disabled:bg-gray-500 disabled:border-gray-500"
      >
        {status === "sending" ? "Sending..." : "Send Message" }
      </button>

      {status === "success" && (
        <p className="text-sm text-green-400 mt-2">
          Your message has been sent successfully.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-400 mt-2">
          Something went wrong. Please try again later.
        </p>
      )}
    </form>
  );
}