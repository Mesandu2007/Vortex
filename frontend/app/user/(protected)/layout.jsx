
import UserNavbar from "@/app/components/UserNavbar";



export default function UserProtectedLayout({ children }) {

    return (

        <div className="min-h-screen flex flex-col bg-gray-50">

            <UserNavbar />

            <main className="flex-1">
                {children}
            </main>

            

        </div>

    );

}

