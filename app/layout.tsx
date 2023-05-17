"use client"

import "./globals.css";
import { Chakra } from "./chakra";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Chakra>{children}</Chakra>
      </body>
    </html>
  );
}