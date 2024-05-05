"use client";
import Filters from "@/components/Filters/Filters";
import JobPosts from "@/components/JobPosts";
import { useJobPosts } from "@/hooks/useJobPosts";
import { applyFilters, getJobsPosts } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    minExperience: {},
    location: "",
    salary: {},
  });
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { jobPostsData, loading } = useJobPosts();
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    if (jobPostsData && jobPostsData.length > 0) {
      const filteredData = applyFilters(jobPostsData, selectedFilters);
      setFilteredPosts(filteredData);

      setInitialRenderComplete(true);
      console.log("test" + jobPostsData);
    }
  }, [jobPostsData, selectedFilters]);

  console.log(filteredPosts);
  useEffect(() => {
    if (initialRenderComplete && filteredPosts.length === 0 && !loading) {
      (async () => {
        setIsLoading(true);
        const { jdList } = await getJobsPosts(600);

        const filteredData = applyFilters(jdList, selectedFilters);
        setFilteredPosts(filteredData);

        setInitialRenderComplete(false);
        setIsLoading(false);
        console.log("testing in effect");
      })();
    }
  }, [filteredPosts.length, initialRenderComplete, loading, selectedFilters]);

  const handleFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };
  // console.log("test" + selectedFilters);

  return (
    <main className="container mx-auto p-4 max-w-screen-xl">
      <Filters onFiltersChange={handleFiltersChange} />
      <JobPosts jobPostsData={filteredPosts} loading={isLoading} />
    </main>
  );
}
