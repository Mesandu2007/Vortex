import Navbar  from "@/app/components/Navbar";



export default function AdminLayout({children}){

    return(
        <div className="min-h-screen flex flex-col bg-gray-50">

            <Navbar/>
            <main className="flex-1">
                {children}


            </main>

            


        </div>



    );






}