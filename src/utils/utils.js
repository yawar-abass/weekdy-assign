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

    return jobPosts;
  } catch (error) {
    console.log("Error while fething job posts", error);
  }
}
