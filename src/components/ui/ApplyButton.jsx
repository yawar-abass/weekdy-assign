import Link from "next/link";
import React from "react";

const ApplyButton = ({ href }) => {
  return (
    <Link
      href={href ?? "#"}
      target="_blank"
      className="w-full text-center bg-[#55efc4] font-medium rounded-lg my-1 text-black py-2 px-5 hover:bg-gradient-to-r hover:from-[#4bd0ab]hover:to-[#34b28e] hover:ring-1 hover:ring-[#3fb191] transition-all ease-out duration-300"
    >
      ⚡ Easy Apply
    </Link>
  );
};

export default ApplyButton;
