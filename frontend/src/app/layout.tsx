import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { Toaster } from "react-hot-toast";
import "./styles/global.css";

export const metadata: Metadata = {
  title: "My Next App",
  description: "CRUD powered by Next.js and Laravel  ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
