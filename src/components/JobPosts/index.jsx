"use client";
import React from "react";
import JobPost from "./JobPost";
import { CircularProgress } from "@mui/material";

const JobPosts = ({ jobPostsData, loading }) => {
  return (
    <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-2 md:p-6 justify-center">
      {jobPostsData.map((jobPost, index) => (
        <JobPost key={jobPost?.jdUid} jobPostData={jobPost} />
      ))}
      {loading && <CircularProgress style={{ textAlign: "center" }} />}
    </div>
  );
};

export default JobPosts;
