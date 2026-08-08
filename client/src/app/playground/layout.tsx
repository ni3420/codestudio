import { Header } from "@/features/layout/components/header/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <>
        <Header />
        <div className="flex-1 flex flex-col w-full overflow-hidden">
          {children}
          </div>
        </>
  );
}