import type { Metadata } from "next";
import Script from "next/script"
import "./globals.css";

export const metadata: Metadata = {
  title: "RightTailed",
  description: "Become an outlier in the form of a topper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased">
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function () {
              try {
                const theme = localStorage.getItem("theme");
                if (
                  theme === "dark" ||
                  (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
                ) {
                  document.documentElement.classList.add("dark");
                }
              } catch (_) {}
            })();
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
