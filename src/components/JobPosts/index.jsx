import React from "react";
import JobPost from "./JobPost";

const JobPosts = () => {
  return (
    <div className="flex gap-5 p-6 justify-center">
      <JobPost />
      <JobPost />
      <JobPost />
    </div>
  );
};

export default JobPosts;
