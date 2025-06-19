"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";
import Container from "./Container";
import { menuItems } from "@/data/menuItems";
import { useRouter } from "next/navigation";

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
    <header className="bg-transparent w-full">
      <Container className="w-full block md:flex items-center !px-0">
        <nav className="w-full px-5 md:px-0 md:w-[70%] text-center flex md:block shadow-md md:shadow-none bg-white md:bg-transparent mx-auto justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-2">
            <img
              src="/images/mossis_logo.png"
              alt="로고"
              className="text-foreground min-w-fit w-10 h-10 md:w-32 md:h-32 "
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="w-full hidden md:flex  border-black border-b-2 ">
            {menuItems.map((item, index) => (
              <li
                className={`w-[20%] cursor-pointer transition-colors ${
                  active === index
                    ? "border-b-2 border-black font-semibold"
                    : ""
                }`}
                key={item.text}
                onClick={() => handleClickChangeMenu(item.url, index)}
              >
                <Link
                  href={item.url}
                  onClick={() => setActive(index)}
                  aria-current={active === index ? "page" : undefined}
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
              className="bg-primary text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
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
      </Container>

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
          <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-primary block"
                  onClick={toggleMenu}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#cta"
                className="text-black bg-primary hover:bg-primary-accent px-5 py-2 rounded-full block w-fit"
                onClick={toggleMenu}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
