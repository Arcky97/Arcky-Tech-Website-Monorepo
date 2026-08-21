"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ErrorMain from "ui/src/components/errors/ErrorMain";

const REDIRECT_DELAY_SECONDS = 5;

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
    <ErrorMain
      sub="Access restricted"
      title="You don&apos;t have access to this page"
      description={`Returning you to your YouTube dashboard in ${secondsRemaining} seconds.`}
    />
  );
}