import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineSwipe } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMessage } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

const Nav = () => {
  return (
    <div>
      <div>PBJ</div>
      <div>
        <IoNotificationsOutline />
      </div>
      <div>
        <GiHamburgerMenu />
        <div>
          <div>
            <MdOutlineSwipe />
          </div>
          <div>
            <AiOutlineMessage />
          </div>
          <div>
            <FiLogOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
