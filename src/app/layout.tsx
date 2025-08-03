import type { Metadata } from "next";
import "../app/globals.css"; 

export const metadata: Metadata = {
  title: "Twradial - Tailwind Radial Gradient Generator",
  description: "Create your radial background easier with twradial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body
        className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 min-h-screen font-sans`}
      >
        {children}
      </body>
    </html>
  );
}