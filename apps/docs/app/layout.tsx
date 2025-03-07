import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "../src/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className} bg-[#09090B] `}>
          <ThemeProvider>
            {/* navbar */}
            <Header/>
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made By Abhishek Bisht</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github text-xl"></i>
                  </a>
                  <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter text-xl"></i>
                  </a>
                  <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin text-xl"></i>
                  </a>
                  <a href="https://instagram.com/your-instagram" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                </div>
              </div>
            </footer>

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}