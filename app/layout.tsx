import "./globals.css";
import "@uploadthing/react/styles.css";

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import { ToastProvider } from "@/components/providers/toaster-provider";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/components/providers/theme-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NSIC-LMS",
  description: "A learning management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
        >
          <ThemeContextProvider>
            <ConfettiProvider />
            <ToastProvider>
              {children}
              <ThemeSwitch />
            </ToastProvider>
          </ThemeContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
