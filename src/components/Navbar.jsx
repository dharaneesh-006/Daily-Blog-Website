import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const baseStyle =
    'flex items-center justify-between p-5 rounded-4xl ml-10 mr-10 mt-5 sticky top-3 transition-all duration-700 ease-in-out';
  const style1 = `${baseStyle} bg-amber-300`;
  const style2 = `${baseStyle} bg-black text-white`;

  const nav1 = 'hover:text-black transition-colors duration-700 ease-in-out';
  const nav2 = 'hover:text-yellow-300 transition-colors duration-700 ease-in-out';

  const [style, setStyle] = useState(style1);
  const [nav, setNav] = useState(nav1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStyle((prev) => (prev === style1 ? style2 : style1));
      setNav((prev) => (prev === nav1 ? nav2 : nav1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dropdownBg = style.includes('bg-black') ? 'bg-black text-white' : 'bg-amber-300 text-black';

  return (
    <div className={style}>
      <div>
        <b className={`sm:text-[20px] md:text-2xl lg:text-2xl border-2 p-1 ${nav}`}>DAILY BLOG</b>
      </div>

      {windowWidth < 680 ? (
        <>
          <p className={`text-lg mt-2 font-bold ${nav}`}>Hi.. Dharaneesh</p>
          <FontAwesomeIcon
            icon={faBars}
            className="text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div
              className={`absolute top-[77px] left-0 ml-0 p-4 rounded-xl shadow-lg z-50
                          transition-all duration-700 ease-in-out transform animate-slideDown ${dropdownBg}`}
              style={{ width: `${windowWidth - 100}px` }}
            >
              <center>
                <ul className="font-bold text-[18px]">
                  <li className="mb-2 hover:text-orange-500 transition-colors duration-300">Home</li>
                  <li className="mb-2 hover:text-orange-500 transition-colors duration-300">About</li>
                </ul>
              </center>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center">
          <ul className="flex mr-2 font-bold text-[20px]">
            <li className="mr-4 hover:text-orange-500 transition-colors duration-700 ease-in-out">Home</li>
            <li className="mr-4 hover:text-orange-500 transition-colors duration-700 ease-in-out">About</li>
          </ul>
          <p className={`mr-4 text-3xl ${nav}`}>Hi.. Dharaneesh</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
