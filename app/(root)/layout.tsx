import Sidebar from "@/components/SideBar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background"> 
      <aside className="flex-none hidden md:block ">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-y-auto overflow-x-hidden ">
        <div className="h-full w-full">
          {children}
        </div>
      </main>
    </div>
  );
}