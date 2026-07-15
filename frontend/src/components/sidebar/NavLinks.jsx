import { NAV_LINKS } from "../../../config/appConfig";
import { NavLink } from "react-router-dom";
function NavLinks({handleCloseSidebar}) {
  return (
    <nav>
      <ul className="space-y-2">
        {NAV_LINKS.map((link) => (
          <li key={link.path}>
            <NavLink
             onClick={handleCloseSidebar}
              to={link.path}
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? "var(--color-bg-link-active)"
                  : "",
                color: isActive
                  ? "var(--color-text-active)"
                  : "var(--color-text)",
              })}
              className={({isActive}) =>
                `flex gap-1 transition items-center focus:outline-none border-none p-2 rounded-md ${!isActive ? 'hover:bg-gray-300/10' : 'group'}`
              }
            >
              <link.icon className="w-5  h-5" />
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavLinks;
