import React from "react";
function Button({ children, paddingx, paddingy }) {
  return (
    <button
      className={`
        ${paddingx}
        ${paddingy}
        bg-[#4271D0]
        text-white
        rounded-xl
        transition-all
        duration-150
        ease-in-out
        active:scale-95
      `}
    >
      {children}
    </button>
  );
}


export default Button;