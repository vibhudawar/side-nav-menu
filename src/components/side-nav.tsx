'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@iconify/react';

import { drawerContent } from '../constants';

type NavItem = {
  id: string;
  title: string;
  url: string;
  type: string;
  items: NavItem[];
};

const DrawerNav = () => {
  return (
    <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex p-2">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex flex-row space-x-3 items-center justify-center h-5 w-full"></div>

        <div className="flex flex-col space-y-2">
          {drawerContent.menu.items.map((item, idx) => {
            return <MenuItemDrawer key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

const MenuItemDrawer = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.items.length > 0 ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.url) ? 'bg-zinc-100' : ''
            }`}
          >
            <span className="font-semibold text-base flex">{item.title}</span>

            {subMenuOpen ? (
              <Icon icon="lucide:minus" width="18" height="18" />
            ) : (
              <Icon icon="lucide:plus" width="18" height="18" />
            )}
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.items?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.url}
                    className={`${subItem.url === pathname ? 'font-bold' : ''}`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.url}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.url === pathname ? 'bg-zinc-100' : ''
          }`}
        >
          <span className="font-semibold text-base flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
export default DrawerNav;
