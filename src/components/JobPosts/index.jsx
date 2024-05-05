"use client";
import React from "react";
import JobPost from "./JobPost";
import { CircularProgress } from "@mui/material";

const JobPosts = ({ jobPostsData, loading }) => {
  console.log(jobPostsData, "jobPostsData");
  const uniqueJobPostsData = [
    ...new Set(jobPostsData?.map(JSON.stringify)),
  ].map(JSON.parse);

  return (
    <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-2 md:p-6 justify-center">
      {uniqueJobPostsData.map((jobPost, index) => (
        <JobPost key={jobPost?.jdUid} jobPostData={jobPost} />
      ))}
      {jobPostsData.length === 0 && !loading && (
        <div className=" text-center py-5 mx-auto w-full">
          {" "}
          <h2 className="font-medium text-center">
            No Jobs available for this category at the moment!
          </h2>{" "}
        </div>
      )}
      {loading && <CircularProgress style={{ textAlign: "center" }} />}
    </div>
  );
};

export default JobPosts;
