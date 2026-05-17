import type { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "./ApolloWrapper";

export const metadata: Metadata = {
  title: "search-pokemon-fm-tech",
  description: "Search pokemon using graphq",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans bg-canvas text-hazard-white">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
