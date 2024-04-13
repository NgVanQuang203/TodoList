import React, { useState } from 'react';
import { IoCheckmarkDoneOutline, IoTrashOutline } from 'react-icons/io5';
import { PiStarThin } from 'react-icons/pi';
import logo from '../assets/logobar.svg';
import { Link } from 'react-router-dom';
const NavBar = () => {
  const [mobile, setMobile] = useState({
    width: 'w-16',
    block: 'hidden',
  });
  const handleClick = () => {
    setMobile((prev) => {
      return {
        ...prev,
        width: prev.width === 'w-16' ? 'w-[200px]' : 'w-16',
        block: prev.block === 'hidden' ? 'block' : 'hidden',
      };
    });
  };

  return (
    <div>
      <nav
        className={`${mobile.width} sm:w-[307px] fixed top-0 left-0 h-screen bg-[#DBEADD] shadow-2xl z-50 duration-200 transition-all`}
      >
        <div className="">
          {window.innerWidth > 640 ? (
            <img src={logo} alt="" />
          ) : (
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="angle-double-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className={` h-16  ${mobile.width === 'w-16' ? '' : '-scale-x-100'} `}
              onClick={handleClick}
            >
              <g>
                <path
                  fill="currentColor"
                  d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                  className="text-[#a29f9f]"
                ></path>
                <path
                  fill="currentColor"
                  d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                  className="text-[#5B5B5B]"
                ></path>
              </g>
            </svg>
          )}
        </div>
        {/* Menu */}
        <div className=" ">
          <div
            className="my-2 bg-[#C4DCD3] text-[#5B5B5B] m-1 
          rounded-md p-2 text-xl font-semibold flex flex-col
          hover:-translate-y-1 hover:shadow-xl cursor-pointer
          active:shadow-sm duration-300 transition-all active:translate-y-1 
          "
          >
            <Link to="/home" className="flex sm:justify-start justify-center items-center ">
              <IoCheckmarkDoneOutline className="sm:ml-4 " />
              <p className={`${mobile.block} mx-4 sm:block right-0`}>Tasks</p>
            </Link>
          </div>
          <div
            className="my-3 bg-[#C4DCD3] text-[#5B5B5B] m-1 
          rounded-md p-2 text-xl font-semibold hover:-translate-y-1 hover:shadow-xl cursor-pointer
          active:shadow-sm duration-500 transition-all active:translate-y-1"
          >
            <Link to="/important" className="flex sm:justify-start justify-center items-center">
              <PiStarThin className="sm:ml-4" />
              <p className={`${mobile.block} mx-4 sm:block`}>Importants</p>
            </Link>
          </div>
          
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
