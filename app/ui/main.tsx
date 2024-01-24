export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">{children}</div>
    </main>
  );
}