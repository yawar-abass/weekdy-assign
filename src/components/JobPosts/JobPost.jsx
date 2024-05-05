import Image from "next/image";
import React from "react";
import ApplyButton from "../ui/ApplyButton";
import ReferralButton from "../ui/ReferralButton";
import Model from "../ui/Model";

const JobPost = ({ jobPostData }) => {
  const {
    jdLink,
    jobDetailsFromCompany,
    maxJdSalary,
    minJdSalary,
    salaryCurrencyCode,
    location,
    minExp,
    maxExp,
    jobRole,
    companyName,
    logoUrl,
  } = jobPostData;

  const limitContent = jobDetailsFromCompany?.split(" ").slice(0, 90).join(" ");
  return (
    <div className="min-h-4 flex flex-col  space-y-3 p-5 border-2 shadow-md rounded-2xl ">
      <div className="shadow-sm border-2 rounded-full w-fit px-[6px] py-1">
        <p className="text-[9px] ">⏳ Posted a day ago</p>
      </div>
      <div className="flex gap-2">
        <Image
          src={logoUrl}
          alt="logo"
          width={50}
          height={50}
          className="w-auto h-auto"
        />
        <div>
          <h3 className="text-sm font-bold  text-[#8b8b8b] tracking-wider">
            {companyName}
          </h3>
          <h2 className="  leading-6 opacity-85 capitalize">{jobRole}</h2>
          <h4 className="text-[11px] font-medium  opacity-90 capitalize">
            {location}
          </h4>
        </div>
      </div>
      <div className="h-72 overflow-hidden mask-gradient">
        <p className="my-2  tracking-wide text-[#4d596a]">
          Estimated Salary:{" "}
          {minJdSalary !== null || maxJdSalary !== null ? (
            <>
              <span className="text-sm"> {salaryCurrencyCode} </span>
              {minJdSalary ?? ""}-{maxJdSalary ?? ""} LPA ✅
            </>
          ) : (
            "Not specified ⚠️"
          )}
        </p>
        <div>
          <h6 className="font-medium  text-black">About Company:</h6>
          <p className="text-sm opacity-90 leading-5">{limitContent}...</p>
        </div>
      </div>

      <Model content={jobDetailsFromCompany} />
      <div className="my-5">
        <h5 className="font-bold opacity-90 text-sm text-[#8b8b8b] tracking-widest">
          Experience Required:
        </h5>
        <p className="text-sm opacity-90 ">{minExp ?? "0 ⚠️"} Years</p>
      </div>
      <ApplyButton href={jdLink} />
      <ReferralButton />
    </div>
  );
};

export default JobPost;
