import { NavLink } from "react-router-dom";
import { navigationItems } from "../../config/navigation";

function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm">
      <div className="flex justify-around py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500"
                }`
              }
            >
              <Icon size={20} />
              <span className="mt-1">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
