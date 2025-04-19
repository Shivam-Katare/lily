import type { Metadata } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import { dark } from "@clerk/themes";
import { SoundToggle } from "@/components/sound-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lily - Calm Typing Playground",
  description: "A peaceful typing experience for relaxation and mindfulness",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      touchSession={false}
      appearance={{
        elements: {
          card: "bg-background border border-border shadow-sm",
          formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
          formFieldInput: "bg-muted border-input",
          footerActionLink: "text-primary hover:text-primary/90",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
        },
        layout: {
          socialButtonsVariant: "iconButton",
          socialButtonsPlacement: "bottom",
        },
      }}
      
    >
      <html lang="en" suppressHydrationWarning className={`${garamond.variable} ${manrope.variable} font-sans antialiased`}>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
             <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <SoundToggle />
          <ThemeToggle />
        </div>  
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
