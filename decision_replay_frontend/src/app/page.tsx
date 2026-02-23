import { redirect } from "next/navigation";

/**
 * Home simply redirects. This keeps the root clean for static export while still
 * providing a sensible entrypoint.
 */
export default function Home() {
  // For now, default to dashboard; AuthGate will still protect app routes.
  redirect("/app/dashboard");
}
