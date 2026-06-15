"use client";

import { useMutation } from "@tanstack/react-query";

type SubmitEarlyAccessInput = {
  email: string;
  source?: string;
  message?: string;
  website?: string;
  formStarted?: number;
  metadata?: Record<string, unknown>;
};

type SubmitEarlyAccessResponse = {
  ok: boolean;
  message?: string;
  error?: string;
};

async function submitEarlyAccess(input: SubmitEarlyAccessInput) {
  const response = await fetch("/api/early-access", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const payload = (await response
    .json()
    .catch(() => ({}))) as SubmitEarlyAccessResponse;

  if (!response.ok) {
    throw new Error(payload.error ?? "Unable to send your message.");
  }

  return payload;
}

export function useSubmitEarlyAccess() {
  return useMutation({
    mutationFn: submitEarlyAccess,
  });
}
