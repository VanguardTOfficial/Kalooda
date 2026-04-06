import type { AuthError } from "@supabase/supabase-js";

/** Returned from customer `signIn` when email/password auth fails (excluding admin portal). */
export type CustomerSignInAuthError = "credentials" | "network";

/** Returned from customer `signUp` when sign-up fails (excluding admin portal). */
export type CustomerSignUpAuthError =
  | "emailInUse"
  | "validation"
  | "network"
  | "generic";

const NETWORK_ERROR_CODES = new Set<string>([
  "unexpected_failure",
  "request_timeout",
  "hook_timeout",
  "hook_timeout_after_retry",
  "over_request_rate_limit",
  "over_email_send_rate_limit",
  "over_sms_send_rate_limit",
]);

const EMAIL_IN_USE_CODES = new Set<string>([
  "email_exists",
  "user_already_exists",
  "identity_already_exists",
]);

const SIGN_UP_VALIDATION_CODES = new Set<string>([
  "weak_password",
  "validation_failed",
  "email_address_invalid",
  "captcha_failed",
]);

function isAuthNetworkError(error: AuthError): boolean {
  if (error.name === "AuthRetryableFetchError") return true;
  const status = error.status;
  if (typeof status === "number" && status >= 500) return true;
  const code = error.code;
  if (typeof code === "string" && NETWORK_ERROR_CODES.has(code)) return true;
  return false;
}

/**
 * Classify Supabase `signInWithPassword` error for customer UI (generic credentials vs network).
 */
export function classifySignInError(error: AuthError): CustomerSignInAuthError {
  if (isAuthNetworkError(error)) return "network";
  return "credentials";
}

/**
 * Classify Supabase `signUp` error for customer UI.
 */
export function classifySignUpError(error: AuthError): CustomerSignUpAuthError {
  if (isAuthNetworkError(error)) return "network";
  const code = error.code;
  if (typeof code === "string") {
    if (EMAIL_IN_USE_CODES.has(code)) return "emailInUse";
    if (SIGN_UP_VALIDATION_CODES.has(code)) return "validation";
  }
  return "generic";
}
