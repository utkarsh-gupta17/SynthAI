import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimit } from "@/lib/api-limit";

const DashboardLayout = async({children}:{children: React.ReactNode;}) => {

  const apiLimit = await getApiLimit();

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-[#111827]">
        <div>
          <Sidebar apiLimitCount={apiLimit}/>
        </div>
      </div>
      <main className="md:pl-72">
        <Navbar/>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout