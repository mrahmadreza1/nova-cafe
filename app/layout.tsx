import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import { Toast } from "@/components/shared/Toast";
import "@/styles/globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "کافه نُوا",
  description: "سفارش با نُوا، دستیار هوشمند کافه",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="bg-surface-2 text-ink">
        <div className="mx-auto flex min-h-dvh w-full max-w-[520px] flex-col bg-surface shadow-float">
          {children}
        </div>
        <Toast />
      </body>
    </html>
  );
}
