"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";
import { menuItems } from "@/data/menuItems";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Header: React.FC = () => {
  // 메뉴 상태 관리
  const router = useRouter();

  // 모바일 메뉴의 열림/닫힘 상태를 관리하는 useState 훅
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [active, setActive] = useState(0);

  // 메뉴 아이템 클릭 핸들러
  const handleClickChangeMenu = (url: string, index: number) => {
    setActive(index);
    router.push(url);
  };

  return (
    <header className="w-full max-w-[1280px] md:pb-[50px] m-auto fixed md:static top-0 left-0 z-50 bg-white p-4">
      <div className="w-full flex justify-between flex-row md:flex md:flex-col items-center">
        <Link
          href="/"
          onClick={() => handleClickChangeMenu("/", 0)}
          className="flex items-center justify-center "
        >
          <Image
            src="/images/moss_is_logo.png"
            width={128}
            height={128}
            alt="로고"
            className="text-foreground min-w-fit w-10 h-10 md:w-32 md:h-32 "
          />
        </Link>
        <nav className="md:p-0 md:w-[70%] bg-white md:bg-transparent   items-center">
          {/* Logo */}

          {/* Desktop Menu */}
          <ul className="w-full hidden md:flex border-black border-b-2">
            {menuItems.map((item, index) => (
              <li
                key={item.text}
                className={`w-[20%] cursor-pointer transition-colors ${
                  active === index
                    ? "border-b-2 border-black font-semibold"
                    : ""
                }`}
              >
                <Link
                  href={item.url}
                  onClick={() => handleClickChangeMenu(item.url, index)}
                  aria-current={active === index ? "page" : undefined}
                  className="block w-full h-full text-center py-1"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-primary text-black focus:outline-none rounded-full flex items-center justify-center"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiBars3 className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu with Transition */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col ">
            {menuItems.map((item) => (
              <li key={item.text} className="items-center hover:bg-green-100">
                <Link
                  href={item.url}
                  className="py-2 text-center text-foreground hover:text-primary block w-full"
                  onClick={toggleMenu}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
