import Filters from "@/components/Filters/Filters";
import JobPosts from "@/components/JobPosts";

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-screen-xl">
      <Filters />
      <JobPosts />
    </main>
  );
}
