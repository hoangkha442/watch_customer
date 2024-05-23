import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { MdExpandMore } from 'react-icons/md';

const Dropdown = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center  justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {label}{selectedOption}
          <span className={`inline-block ml-2 text-xl transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                            <MdExpandMore />
        </span>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                tabIndex="-1"
                id={`menu-item-${index}`}
                key={index}
                onClick={() => selectOption(option)}
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
