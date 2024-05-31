import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export const SlideTabsExample = () => {
  return (
    <div className="">
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const activeLink = "text-blue-300 !bg-red-800 p-5";
  const inactiveLink = "text-black p-5";
  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full  p-1"
    >
      <NavLink to="/">
        <Tab setPosition={setPosition}>Home</Tab>{" "}
      </NavLink>
      <NavLink to="/form">
        <Tab setPosition={setPosition}>Form</Tab>
      </NavLink>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      transition={{ duration: 0.5, ease: "circInOut" }}
      className="absolute z-0 h-7 rounded-[10rem] bg-white md:h-12"
    />
  );
};

const Header = () => {
  return (
    <div className="h-16 w-ful bg-blue-300 flex flex-row justify-between items-center px-10">
      <div>
        <h1 className="select-none">
          <NavLink to="/" className="text-gray-700 font-bold">
            BIA ASSIGNMENT
          </NavLink>
        </h1>
      </div>
      <div>
        <SlideTabsExample />
      </div>
    </div>
  );
};

export default Header;
