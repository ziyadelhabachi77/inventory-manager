import { Package2 } from "lucide-react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

function Sidebar({ sidebarOpen,handleCloseSidebar }) {
  return (
    <aside
      className={`w-55 sticky h-screen xl:w-60 left-0 max-sm:fixed z-100 top-0 ${sidebarOpen ? "sm:translate-x-0 " : "max-sm:-translate-x-full"} duration-200 transition-transform bottom-0 px-3 pt-4 border-r border-(--border-color)`}
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      {/* logo name */}
      <div className="mb-15">
        <Link
          to={"/"}
          className="flex gap-2 items-center hover:-translate-y-0.5 hover:underline transition text-black font-semibold text-2xl dark:text-white"
        >
          <span
            className="p-2  rounded-md"
            style={{ backgroundColor: "var(--color-bg-link-active)" }}
          >
            <Package2
              size={20}
              style={{ color: "var(--color-text-active)" }}
              strokeWidth={4}
            />
          </span>{" "}
          InventorySys
        </Link>
      </div>

      {/* nav links */}
      <NavLinks handleCloseSidebar={handleCloseSidebar}/>
    </aside>
  );
}

export default Sidebar;
