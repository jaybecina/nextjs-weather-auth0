import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { FaCloud } from "react-icons/fa";
import NavItem from "./NavItem";

const menuList = [
  { text: "Home", href: "/" },
  { text: "About Us", href: "/about" },
  { text: "Contact", href: "/contact" },
];
const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  const { user, isLoading, error } = useUser();

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
          <h1 className="logo">
            <FaCloud className="nav__icon" />
          </h1>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {user ? (
            <Link href="/api/auth/logout" className={`nav__link`}>
              Logout
            </Link>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
