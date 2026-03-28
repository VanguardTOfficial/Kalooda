/**
 * When NEXT_PUBLIC_SUPABASE_URL is the placeholder value, the app
 * falls back to local mock data so the UI works without a live DB.
 */
export function useMockData(): boolean {
  return (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url"
  );
}
