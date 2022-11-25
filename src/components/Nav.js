import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineSwipe } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

const Nav = () => {
  return (
    <div>
      <div className="flex flex-row justify-center absolute w-full top-0 bg-gray-300 h-12 items-center">
        <span className="text-xl">PBJ</span>
      </div>
      <div className="flex flex-row absolute bottom-0 h-16 w-full justify-between px-4 bg-gray-300 items-center">
        <span>
          <MdOutlineSwipe size={"2rem"} />
        </span>
        <span>
          <AiOutlineMessage size={"2rem"} />
        </span>
        <span>
          <FiUsers size={"2rem"} />
        </span>
        <span>
          <IoNotificationsOutline size={"2rem"} />
        </span>
        <span>
          <FiLogOut size={"2rem"} />
        </span>
      </div>
    </div>
  );
};

export default Nav;
