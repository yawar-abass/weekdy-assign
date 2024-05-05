import { revalidatePath } from "next/cache";

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
    console.log(jobPosts);
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

export const filterByLocation = (jobPostsData, location) => {
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

export const filterBySalary = (jobPostsData, salary) => {
  return jobPostsData.filter((job) => job?.minJdSalary >= salary.value);
};
