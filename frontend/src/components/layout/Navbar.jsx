import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { menuItems } from "./menuData";

export default function Navbar() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimerRef = useRef(null);

  const handleOpenDropdown = (label) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleCloseDropdownWithDelay = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
      closeTimerRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      {/* Top bar */}
      <div className="hidden md:block bg-slate-900 text-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center gap-5">
            <span>support@rosysoft.vn</span>
            <span>0908 743 879</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="hover:text-yellow-300">VI</button>
            <span>/</span>
            <button className="hover:text-yellow-300">EN</button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-extrabold text-blue-700">
          ROSY
        </Link>

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center gap-6">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => handleOpenDropdown(item.label)}
              onMouseLeave={handleCloseDropdownWithDelay}
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `text-sm font-semibold hover:text-blue-700 ${isActive ? "text-blue-700" : "text-slate-700"}`
                }
              >
                <span className="inline-flex items-center gap-1">
                  {item.label}
                  {item.children && (
                    <span
                      className={`text-[10px] transition-transform ${
                        openDropdown === item.label ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      ▼
                    </span>
                  )}
                </span>
              </NavLink>

              {item.children && openDropdown === item.label && (
                <div
                  className="absolute left-0 top-full mt-3 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
                  onMouseEnter={() => handleOpenDropdown(item.label)}
                  onMouseLeave={handleCloseDropdownWithDelay}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="rounded-lg border px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Tìm kiếm
          </button>
          <Link
            to="/lien-he"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
          >
            Đăng ký demo
          </Link>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpenMobile(!openMobile)}
          className="lg:hidden rounded-md border px-3 py-2 text-sm"
        >
          Menu
        </button>
      </nav>

      {/* Mobile panel */}
      {openMobile && (
        <div className="lg:hidden border-t bg-white px-4 py-3">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={() => setOpenMobile(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 font-medium hover:bg-slate-100 ${isActive ? "text-blue-700" : "text-slate-700"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/lien-he"
              onClick={() => setOpenMobile(false)}
              className="mt-2 block rounded-lg bg-blue-600 px-3 py-2 text-center font-semibold text-white"
            >
              Đăng ký demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}