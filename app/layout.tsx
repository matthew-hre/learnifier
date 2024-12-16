import "./globals.css";
import { Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { TopicsProvider } from "./contexts/TopicsContext";

const geistMono = Geist_Mono({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Learnifier",
  description: "Study smarter for your finals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      suppressContentEditableWarning
      suppressHydrationWarning
    >
      <body
        className={`${geistMono.className} bg-background text-gray-100 font-mono min-h-screen`}
      >
        <TopicsProvider>
          <Sidebar />
          <div className="ml-64">{children}</div>
        </TopicsProvider>
      </body>
    </html>
  );
}
