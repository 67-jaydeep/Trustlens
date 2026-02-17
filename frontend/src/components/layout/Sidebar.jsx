import { NavLink } from "react-router-dom";
import { navigationItems } from "../../config/navigation";

function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 p-6">
      <h1 className="text-xl font-bold mb-8">TrustLens</h1>

      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} className="mr-3" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
