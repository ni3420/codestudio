import { Header } from "@/features/layout/components/header/header";
import { Footer } from "@/features/layout/components/footer/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col w-full overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}