import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "../components";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleClose = () => {
    setSidebarOpen(false);
  };
  const handleOpen = () => {
    setSidebarOpen(true);
  };

  return (
    <div className="min-h-screen relative flex">
      {/* sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} handleCloseSidebar={handleClose}/>
      {/* main content */}
      <div className={`flex-1 min-w-0 relative overflow-hidden`}>
        <div className={`absolute ${sidebarOpen ? "max-sm:block" : "hidden"} backdrop-blur-md bg-gray-300/5 z-40 inset-0`}></div>
        {/* header */}
        <Header />
        <main className={`py-8 ${sidebarOpen ? "max-sm:bg-black/5" : ''} relative mt-12 min-h-[calc(100%-48px)] px-6 bg-(--color-bg-main)`}>
          <Outlet />
        </main>
      </div>
      {sidebarOpen ? (
        <X
          onClick={handleClose}
          className="cursor-pointer fixed top-14  right-2 sm:hidden z-50 text-gray-700 dark:text-white hover:drop-shadow hover:drop-shadow-gray-400"
        />
      ) : (
        <Menu
          onClick={handleOpen}
          className="cursor-pointer fixed top-14 right-2 sm:hidden z-50 text-gray-700 dark:text-white hover:drop-shadow hover:drop-shadow-gray-400"
        />
      )}
    </div>
  );
}

export default Layout;
