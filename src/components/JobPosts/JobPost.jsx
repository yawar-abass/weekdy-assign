import Image from "next/image";
import React from "react";
import ApplyButton from "../ui/ApplyButton";
import ReferralButton from "../ui/ReferralButton";

const JobPost = () => {
  return (
    <div className="min-h-4 flex flex-col w-full space-y-3 p-5 border-2 shadow-md rounded-xl ">
      <div className="shadow-sm border-2 rounded-full w-fit px-[6px] py-1">
        <p className="text-[9px] ">⏳ Posted a day ago</p>
      </div>
      <div className="flex gap-2">
        <Image
          src="https://logo.clearbit.com/dropbox.com"
          alt="logo"
          width={50}
          height={50}
        />
        <div>
          <h3 className="text-sm font-bold  text-[#8b8b8b] tracking-wider">
            Company Name
          </h3>
          <h2 className="  leading-6 opacity-85">Role</h2>
          <h4 className="text-[11px] font-medium  opacity-90">Locatioin</h4>
        </div>
      </div>
      <div className="h-72 overflow-hidden mask-gradient">
        <p className="my-2  tracking-wide text-[#4d596a]">
          Estimated Salary: ₹18 - 22 LPA
        </p>
        <div>
          <h6 className="font-medium  text-black">About Company:</h6>
          <p className="text-sm opacity-90 leading-5">
            FalconX provides comprehensive access to the deepest digital asset
            liquidity across the globe. Through our prime brokerage platform,
            FalconX 360, investors unlock and scale returns faster and more
            efficiently than any other platform. Our 24/7, dedicated team
            enables investors to navigate dynamic markets around the clock by
            providing support for all account, operational and trading needs.
          </p>
        </div>
      </div>
      <p className="text-center text-blue-600 cursor-pointer">View Job</p>
      <div className="my-5">
        <h5 className="font-bold opacity-90 text-sm text-[#8b8b8b] tracking-widest">
          Minimum Experience
        </h5>
        <p className="text-sm opacity-90 ">5 years</p>
      </div>
      <ApplyButton />
      <ReferralButton />
    </div>
  );
};

export default JobPost;
