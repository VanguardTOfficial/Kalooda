-- Optional one-off (Frankfurt SQL Editor) if sign-in fails with "Email not confirmed"
-- after migration. Prefer real confirmations via email when SMTP is configured.

update auth.users
set email_confirmed_at = coalesce(email_confirmed_at, now())
where email_confirmed_at is null;
