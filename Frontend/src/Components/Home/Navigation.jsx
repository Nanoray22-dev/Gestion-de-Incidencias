import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { TiHomeOutline } from "react-icons/ti";
import { TbReportSearch, TbSettingsPlus } from "react-icons/tb";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { CgDarkMode } from "react-icons/cg";
import { MdOutlineContactSupport } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineContactMail } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";
import { TreeNode } from "./TreeNode";

const Navigation = () => {
  const history = useNavigate();
  const { setId, setUsername, role } = useContext(UserContext);
  const [, setWs] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest(".settings-menu")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpen]);

  function logout() {
    axios.post("https://backoasis-production.up.railway.app/logout").then(() => {
      setWs(null);
      setId(null);
      setUsername(null);
      history("/");
    });
  }

  return (
    <>
      <nav className="bg-white w-full p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-gray-500">
            Fix<span className="text-orange-400">Oasis</span>
          </div>
          <button className="text-black md:hidden" onClick={toggleMobileMenu}>
            <RiMenu3Line className="text-2xl"/>
          </button>
          <ul className="hidden md:flex space-x-4 text-black">
            {role === "admin" ? (
              <>
                <li className="flex gap-1 text-black">
                  <TiHomeOutline className="mt-1" />
                  <Link className="hover:text-black" to="/dashboard">
                    Home
                  </Link>
                </li>
                <li className="flex gap-1">
                  <AiOutlineUsergroupAdd className="mt-1" />
                  <Link className="hover:text-black" to="/residente">
                    Residents
                  </Link>
                </li>
                <li className="flex gap-1">
                  <TbReportSearch className="mt-1" />
                  <Link className="hover:text-black" to="/reporte">
                    Reports
                  </Link>
                </li>
                <li className="flex gap-1">
                  <MdOutlineContactSupport className="mt-1" />
                  <Link className="hover:text-black" to="/comment">
                    SocialReport
                  </Link>
                </li>
                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="flex items-center gap-1 text-black px-2 rounded-xl hover:bg-primary-900/50 transition-colors"
                  >
                    <TbSettingsPlus /> Settings
                  </button>
                  {isOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 settings-menu"
                      style={{ zIndex: 50 }}
                      onMouseLeave={() => setIsOpen(false)}
                    >
                      <TreeNode
                        className="hover:text-black no-underline"
                        icon={<MdOutlineContactMail />}
                        label="My Profile"
                        to="/profile"
                      />
                      <TreeNode
                        className="hover:text-black"
                        icon={<CgDarkMode />}
                        label="Dark/Light"
                        to="#"
                      />
                      <button
                        onClick={() => logout()}
                        className="w-48 hover:text-red-500 text-red-500"
                      >
                        <TreeNode icon={<RiLogoutBoxRLine />} label="Logout" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <li className="flex gap-1">
                  <TbReportSearch className="mt-1" />
                  <Link className="hover:text-black" to="/reporte">
                    Reports
                  </Link>
                </li>
                <li className="flex gap-1">
                  <MdOutlineContactSupport className="mt-1" />
                  <Link className="hover:text-black" to="/comment">
                    SocialReport
                  </Link>
                </li>
                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="flex items-center gap-1 text-black px-2 rounded-xl hover:bg-primary-900/50 transition-colors"
                  >
                    <TbSettingsPlus /> Settings
                  </button>
                  {isOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 settings-menu"
                      style={{ zIndex: 50 }}
                      onMouseLeave={() => setIsOpen(false)}
                    >
                      <TreeNode
                        className="hover:text-black no-underline"
                        icon={<MdOutlineContactMail />}
                        label="My Profile"
                        to="/profile"
                      />
                      <TreeNode
                        className="hover:text-black"
                        icon={<CgDarkMode />}
                        label="Dark/Light"
                        to="#"
                      />
                      <button
                        onClick={() => logout()}
                        className="w-48 hover:text-red-500 text-red-500"
                      >
                        <TreeNode icon={<RiLogoutBoxRLine />} label="Logout" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </ul>
          {menuOpen && (
            <div className="absolute top-16 right-0 w-full bg-white rounded-md shadow-lg md:hidden z-50">
              <ul className="flex flex-col text-black p-4 space-y-2">
                {role === "admin" ? (
                  <>
                    <li className="flex gap-1 text-black">
                      <TiHomeOutline className="mt-1" />
                      <Link className="hover:text-black" to="/dashboard">
                        Home
                      </Link>
                    </li>
                    <li className="flex gap-1">
                      <AiOutlineUsergroupAdd className="mt-1" />
                      <Link className="hover:text-black" to="/residente">
                        Residents
                      </Link>
                    </li>
                    <li className="flex gap-1">
                      <TbReportSearch className="mt-1" />
                      <Link className="hover:text-black" to="/reporte">
                        Reports
                      </Link>
                    </li>
                    <li className="flex gap-1">
                      <MdOutlineContactSupport className="mt-1" />
                      <Link className="hover:text-black" to="/comment">
                        SocialReport
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex gap-1">
                      <TbReportSearch className="mt-1" />
                      <Link className="hover:text-black" to="/reporte">
                        Reports
                      </Link>
                    </li>
                    <li className="flex gap-1">
                      <MdOutlineContactSupport className="mt-1" />
                      <Link className="hover:text-black" to="/comment">
                        SocialReport
                      </Link>
                    </li>
                  </>
                )}
                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="flex items-center gap-1 text-black px-2 rounded-xl hover:bg-primary-900/50 transition-colors"
                  >
                    <TbSettingsPlus /> Settings
                  </button>
                  {isOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 settings-menu"
                      style={{ zIndex: 50 }}
                      onMouseLeave={() => setIsOpen(false)}
                    >
                      <TreeNode
                        className="hover:text-black no-underline"
                        icon={<MdOutlineContactMail />}
                        label="My Profile"
                        to="/profile"
                      />
                      <TreeNode
                        className="hover:text-black"
                        icon={<CgDarkMode />}
                        label="Dark/Light"
                        to="#"
                      />
                      <button
                        onClick={() => logout()}
                        className="w-48 hover:text-red-500 text-red-500"
                      >
                        <TreeNode icon={<RiLogoutBoxRLine />} label="Logout" />
                      </button>
                    </div>
                  )}
                </div>
              </ul>
            </div>
          )}
        </div>
        <Outlet />
      </nav>
    </>
  );
};

export default Navigation;
