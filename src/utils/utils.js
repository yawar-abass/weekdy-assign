export async function getJobsPosts(limit, offset) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const body = JSON.stringify({
    limit: limit ?? 10,
    offset: offset ?? 0,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };

  try {
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );
    const jobPosts = await response.json();
    // console.log(jobPosts);
    return jobPosts;
  } catch (error) {
    console.log("Error while fething job posts", error);
  }
}

export const filterByRoles = (jobPostsData, roles) => {
  return jobPostsData.filter((job) =>
    roles.some((role) => job.jobRole.includes(role.value))
  );
};

export const filterByMinExperience = (jobPostsData, minExperience) => {
  return jobPostsData.filter((job) => job?.minExp <= minExperience);
};

export const filterByRemote = (jobPostsData, location) => {
  if (location?.value.toLowerCase() === "in-office") {
    return jobPostsData.filter(
      (job) => job.location.toLowerCase() !== "remote"
    );
  } else if (location?.value.toLowerCase() === "hybrid") {
    return jobPostsData.filter((job) =>
      job.location.toLowerCase().includes(location.value.toLowerCase())
    );
  } else {
    return jobPostsData.filter((job) =>
      job.location.toLowerCase().includes(location.value.toLowerCase())
    );
  }
};
export const filterByLocation = (jobPostsData, location) => {
  return jobPostsData.filter((job) =>
    job.location.toLowerCase().includes(location.value.toLowerCase())
  );
};

export const filterBySalary = (jobPostsData, salary) => {
  return jobPostsData.filter(
    (job) => (job.minJdSalary ?? job?.maxJdSalary) >= salary.value
  );
};
export const filterByCompany = (data, searchQuery) => {
  return data.filter((post) =>
    post.companyName
      .trim()
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
};

export const applyFilters = (data, filters) => {
  let filteredData = [...data];

  //Filter by Roles
  if (filters.roles.length > 0) {
    filteredData = filterByRoles(filteredData, filters.roles);
  }

  // Filter by minExperience
  if (
    filters.minExperience &&
    typeof filters.minExperience === "object" &&
    Object.keys(filters.minExperience).length !== 0
  ) {
    filteredData = filterByMinExperience(
      filteredData,
      filters.minExperience?.value
    );
  }

  // Filter by Remote
  if (
    filters.remote &&
    typeof filters.remote === "object" &&
    Object.keys(filters.remote).length !== 0
  ) {
    filteredData = filterByRemote(filteredData, filters.remote);
  }

  // Filter by locations
  if (
    filters.location &&
    typeof filters.location === "object" &&
    Object.keys(filters.location).length !== 0
  ) {
    filteredData = filterByLocation(filteredData, filters.location);
  }

  // Filter by Salary
  if (
    filters.salary &&
    typeof filters.salary === "object" &&
    Object.keys(filters.salary).length !== 0
  ) {
    filteredData = filterBySalary(filteredData, filters.salary);
  }
  // Filter by Companies
  if (
    filters.companies &&
    typeof filters.companies === "object" &&
    Object.keys(filters.companies).companies !== 0
  ) {
    filteredData = filterByCompany(filteredData, filters.companies);
  }

  return filteredData;
};

export const getCompanies = async () => {
  try {
    const { totalCount } = await getJobsPosts(1);
    const { jdList } = await getJobsPosts(totalCount);

    const companies = jdList.map((job) => ({
      label: job.companyName,
      value: job.companyName,
    }));
    // Remove duplicate compnay names
    const uniqueCompanies = [...new Set(companies.map(JSON.stringify))].map(
      JSON.parse
    );
    return uniqueCompanies || [];
  } catch (error) {
    console.error("Error loading more data:", error);
  }
};

export const getLocations = async () => {
  try {
    const { jdList } = await getJobsPosts(700);

    if (!jdList) {
      console.error("Error: No job list found.");
      return [];
    }

    const locations = jdList
      .filter((job) => job.location !== "remote")
      .map((job) => ({
        label: job.location,
        value: job.location,
      }));

    // Remove duplicate locations
    const uniqueLocations = [...new Set(locations.map(JSON.stringify))].map(
      JSON.parse
    );
    return uniqueLocations || [];
  } catch (error) {
    console.error("Error loading in more locations:", error);
    return [];
  }
};
