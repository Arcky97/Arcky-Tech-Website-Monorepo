"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const REDIRECT_DELAY_SECONDS = 10;

export default function AccessDenied() {
  const router = useRouter();
  const [redirect, setRedirect] = useState("/");
  const [secondsRemaining, setSecondsRemaining] = useState(REDIRECT_DELAY_SECONDS);

  useEffect(() => {
    const requestedRedirect = new URLSearchParams(window.location.search).get("redirect");

    if (requestedRedirect?.startsWith("/") && !requestedRedirect.startsWith("//")) {
      setRedirect(requestedRedirect);
    }
  }, []);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      router.replace(redirect);
      return;
    }

    const timer = window.setTimeout(() => {
      setSecondsRemaining((seconds) => seconds - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [redirect, router, secondsRemaining]);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-3xl flex-col items-center justify-center px-5 py-16 text-center text-white sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-300">Access restricted</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">You don&apos;t have access to this page</h1>
      <p className="mt-6 text-lg text-slate-300">Returning you to your YouTube dashboard in {secondsRemaining} seconds.</p>
    </section>
  );
}