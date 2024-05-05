import { useState, useEffect } from "react";
import { getJobsPosts } from "@/utils/utils";

export const useJobPosts = () => {
  const [jobPostsData, setJobPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    let temp = false;
    const loadInitialJobPosts = async () => {
      setLoading(true);
      const { jdList, totalCount } = await getJobsPosts(10);
      setJobCount(totalCount);
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
        setJobCount(response.totalCount);

        setJobPostsData((prevData) => [...prevData, ...newJobPosts]);
        setHasMore(newJobPosts.length > 0);

        setLoading(false);
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

  return { jobPostsData, loading, jobCount };
};
