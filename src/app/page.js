"use client";
import Filters from "@/components/Filters/Filters";
import JobPosts from "@/components/JobPosts";
import { useJobPosts } from "@/hooks/useJobPosts";
import { applyFilters, debounce, getJobsPosts } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    minExperience: {},
    location: "",
    salary: {},
    // search: "",
    companies: "",
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

  // useEffect(() => {
  //   // Function to filter filteredPosts based on search value
  //   const filterBySearch = async () => {
  //     const trimmedSearch = selectedFilters.search.trim();
  //     if (trimmedSearch !== "") {
  //       const { totalCount } = await getJobsPosts(1);
  //       const { jdList } = await getJobsPosts(totalCount);
  //       const searchedData = jdList.filter((post) =>
  //         post.companyName.toLowerCase().includes(trimmedSearch.toLowerCase())
  //       );
  //       setFilteredPosts(searchedData);
  //     }
  //   };

  //   filterBySearch();
  // }, [selectedFilters.search]); //

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
