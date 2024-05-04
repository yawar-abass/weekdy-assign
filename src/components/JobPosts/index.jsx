"use client";
import React, { useState, useEffect, useRef } from "react";
import JobPost from "./JobPost";
import { getJobsPosts } from "@/utils/utils";
import { CircularProgress } from "@mui/material";

const JobPosts = () => {
  const [jobPostsData, setJobPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let temp = false;
    const loadInitialJobPosts = async () => {
      setLoading(true);
      const { jdList } = await getJobsPosts();
      setJobPostsData(jdList);
      setLoading(false);
    };

    if (!temp) {
      loadInitialJobPosts();
    }

    return () => (temp = false);
  }, []);

  useEffect(() => {
    let temp = false;
    const handleScroll = () => {
      if (shouldLoadMore() && !temp) {
        loadMoreJobPosts();
      }
    };

    const shouldLoadMore = () => {
      return (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !loading &&
        hasMore
      );
    };

    const loadMoreJobPosts = async () => {
      try {
        setLoading(true);
        const response = await getJobsPosts(10, jobPostsData.length);
        const newJobPosts = response?.jdList;
        setJobPostsData((prevData) => [...prevData, ...newJobPosts]);
        setLoading(false);
        setHasMore(newJobPosts.length > 0);
      } catch (error) {
        console.error("Error loading more data:", error);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      temp = true;
    };
  }, [loading, hasMore, jobPostsData]);

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
