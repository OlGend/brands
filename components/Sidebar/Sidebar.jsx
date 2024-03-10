"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useMemo } from "react";
import useFetchUrl from "@/components/getUrl";
import {
  CaretLeft,
  Table,
  SignOut,
  ChatTeardropText,
  Question,
  Bank,
  Flag,
  GameController,
} from "phosphor-react";
const menuItems = [
  { id: 1, label: "Dashboard", icon: Table, link: "/" },
  { id: 2, label: "Brands", icon: Table, link: "/brands" },
  { id: 3, label: "Messages", icon: ChatTeardropText, link: "/messages" },
  { id: 4, label: "Withdrawal", icon: Bank, link: "/withdrawal" },
  { id: 5, label: "FAQ", icon: Question, link: "/faq" },
];

const Sidebar = () => {
  useFetchUrl();
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = usePathname();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router),
    [router]
  );



  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col sidebar",
    {
      ["w-80"]: !toggleCollapse,
      ["w-25"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu && activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            {/* <LogoIcon /> */}
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              Logo
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              {/* <CollapsIcon /> */}
              <CaretLeft color="#fff" size={20} />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-10 relative">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
     
           
            return (
              <div key={menu.label} className={`${classes} transition`}>
                <Link className="w-full" href={menu.link}>
                  <div className="flex items-center w-full h-full item-menu mb-2">
                    <div className="p-3 icon">
                      <Icon  size={24} />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light p-3 w-full ml-1"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})} item-menu relative`}>
        <div className="p-3">
          <SignOut size={24} />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-text-light p-3 w-full")}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
