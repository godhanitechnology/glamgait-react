import { NavLink } from "react-router-dom";
import {
  ClipboardList,
  Users,
  Mail,
  X,
  Star,
  Box,
  LayoutDashboard,
  Grid,
  Palette,
  Instagram,
  SlidersHorizontal,
  Grid2X2,
  MegaphoneIcon,
} from "lucide-react";

const Sidebar = ({ onClose }) => {
  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    { name: "Announcements", path: "/admin/announcements", icon: MegaphoneIcon },
    { name: "Categories", path: "/admin/categories", icon: Grid2X2 },
    { name: "Subcategory", path: "/admin/subcategories", icon: Grid },
    { name: "Attributes", path: "/admin/product-attributes", icon: Palette },
    { name: "Colors", path: "/admin/colors", icon: Palette },
    { name: "Sizes", path: "/admin/sizes", icon: Palette },
    { name: "Products", path: "/admin/product", icon: Box },
    { name: "Orders", path: "/admin/orders", icon: ClipboardList },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Instagram", path: "/admin/instagram", icon: Instagram },
    { name: "Sliders", path: "/admin/sliders", icon: SlidersHorizontal },
    { name: "Reviews", path: "/admin/reviews", icon: Star },
    { name: "Contact", path: "/admin/contact", icon: Mail },
  ];

  const handleNavClick = () => {
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white shadow-lg lg:shadow-none border-r border-gray-100">
      <div className="flex items-center px-6 py-4"></div>

      {/* Mobile close button */}
      <div className="lg:hidden flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <div className="text-lg font-semibold text-gray-900">Admin Panel</div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gray-200 text-black"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    isActive
                      ? "text-black"
                      : "text-gray-400 group-hover:text-gray-600"
                  } transition-colors duration-200`}
                />
                <span className="truncate">{item.name}</span>
                {isActive && (
                  <span className="absolute left-0 w-1 h-8 bg-black rounded-r" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
