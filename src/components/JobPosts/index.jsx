import React from "react";
import JobPost from "./JobPost";
import { getJobsPosts } from "@/utils/utils";
import { CircularProgress } from "@mui/material";

const JobPosts = async () => {
  const response = await getJobsPosts();
  const jobPostsData = response?.jdList;

  return (
    <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-2   md:p-6 justify-center">
      {jobPostsData ? (
        jobPostsData.map((jobPost) => {
          return <JobPost key={jobPost?.jdUid} jobPostData={jobPost} />;
        })
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default JobPosts;
