import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <section className="card w-full max-w-lg" role="alert" aria-live="assertive">
        <div className="card-body">
          <h1 className="text-xl font-semibold text-gray-900">404 – Page Not Found</h1>
          <p className="mt-1 text-sm text-gray-600">
            The page you’re looking for doesn’t exist.
          </p>
          <div className="mt-4">
            <Link
              href="/app/dashboard"
              className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
