
import "./globals.css";
import Footer from "@/app/components/Footer";


export default function RootLayout({ children }) {

    return (

        <html lang="en">

            <body className="min-h-screen flex flex-col">

                <main className="flex-1">
                    {children}
                </main>

                <Footer/>

            </body>

        </html>

    );

}

