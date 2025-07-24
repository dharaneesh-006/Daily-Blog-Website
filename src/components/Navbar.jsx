import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const baseStyle =
    'flex items-center justify-between px-4 sm:px-8 py-5 rounded-3xl mx-2 sm:mx-10 mt-4 sticky top-3 z-50 transition-all duration-700 ease-in-out shadow-md';
  const style1 = `${baseStyle} bg-amber-300`;
  const style2 = `${baseStyle} bg-black text-white`;

  const nav1 = 'hover:text-black transition-colors duration-500';
  const nav2 = 'hover:text-yellow-300 transition-colors duration-500';

  const [style, setStyle] = useState(style1);
  const [nav, setNav] = useState(nav1);
  const [menuOpen, setMenuOpen] = useState(false);

  // Change theme every 1.5 seconds (demo)
  useEffect(() => {
    const interval = setInterval(() => {
      setStyle((prev) => (prev === style1 ? style2 : style1));
      setNav((prev) => (prev === nav1 ? nav2 : nav1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={style}>
      {/* Left Logo / Title */}
      <div>
        <b className={`text-lg sm:text-xl md:text-2xl border-2 px-2 py-1 rounded-md ${nav}`}>
          DAILY BLOG
        </b>
      </div>

      {/* Responsive Layout */}
      <div className="sm:hidden flex items-center gap-3">
        <p className={`text-[16px] font-semibold ${nav}`}>Hi.. Dharaneesh</p>
        <FontAwesomeIcon
          icon={menuOpen ? faXmark : faBars}
          className="text-2xl cursor-pointer hover:scale-110 transition-transform"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Mobile Menu Slide Down */}
      {menuOpen && (
        <div
          className="absolute top-[70px] left-0 w-full px-4 py-6 bg-orange-500 text-white rounded-b-2xl shadow-lg z-40 transition-all duration-700 ease-in-out animate-slideDown"
        >
          <ul className="flex flex-col items-center font-bold text-[18px] gap-3">
            <li className="hover:text-black transition">Home</li>
            <li className="hover:text-black transition">About</li>
          </ul>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-6">
        <ul className="flex font-bold text-[18px] gap-6">
          <li className="hover:text-orange-500 transition-colors duration-300">Home</li>
          <li className="hover:text-orange-500 transition-colors duration-300">About</li>
        </ul>
        <p className={`text-xl ${nav}`}>Hi.. Dharaneesh</p>
      </div>
    </div>
  );
};

export default Navbar;
