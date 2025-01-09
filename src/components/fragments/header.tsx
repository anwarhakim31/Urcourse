"use client";
import React, { Fragment } from "react";
import LogoComponent from "../ui/logo-component";

import Burger from "../ui/burger";
import Navbar from "./navbar";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  const handleToggle = () => {
    if (pending) return;

    setPending(true);
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }

    setTimeout(() => {
      setPending(false);
    }, 500);
  };

  return (
    <Fragment>
      <div className="fixed top-0 left-0 w-full z-50  border-b bg-white">
        <header className="container h-14 flex items-center justify-between  gap-4">
          <LogoComponent />
          <nav className="hidden md:block">
            <Navbar onClose={handleToggle} />
          </nav>

          <button onClick={handleToggle} className="block md:hidden">
            <Burger open={open} />
          </button>
        </header>
      </div>
      {open && (
        <div className="fixed top-0 left-0 w-full z-50 flex-center md:hidden mt-14 h-[calc(100vh-3.5rem)]  bg-white">
          <Navbar onClose={handleToggle} />
        </div>
      )}
    </Fragment>
  );
};

export default Header;
