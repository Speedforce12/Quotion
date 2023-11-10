import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toase-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quotion",
  description:
    "Quotion - The ultimate note-taking website for creating, sharing, and collaborating on notes. Effortless productivity with top-notch security. Start Taking Notes Today!",

  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.png",
        href: "/logo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-light.png",
        href: "/logo-light.png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange>
            <EdgeStoreProvider>
              <ModalProvider />
              <ToastProvider />
              {children}
            </EdgeStoreProvider>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
