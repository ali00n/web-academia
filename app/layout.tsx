import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const poppins = Poppins({
    weight: ["400", "600", "700", "800"],
    subsets: ["latin"],
    variable: "--font-poppins",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Academia Black Fitness - Transforme Seu Corpo",
    description: "Alcance seus objetivos com equipamentos de última geração, treinadores especializados e uma comunidade motivada.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
            <body className="font-body">
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <WhatsAppButton />
            </body>
        </html>
    );
}
