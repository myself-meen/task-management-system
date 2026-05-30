import React from 'react';
import { IoIosSearch } from "react-icons/io";

function Search({ children, value, onChange }) {
  return (
    <div className="relative md:w-1/2">

      <IoIosSearch
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-gray-500
          text-xl
        "
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={children}
        className="
          w-full
          pl-10
          pr-4
          py-3
          bg-white
          rounded-xl
          outline-none
          shadow-md
        "
      />

    </div>
  );
}

export default Search;