import { IconBadge } from "@/components/shared/IconBadge";
import PageLoader from "@/components/shared/PageLoader";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookOpen, Plus } from "lucide-react";

import { useParams } from "react-router-dom";

const ViewCourse = () => {
  // get the data id through params
  const { courseId } = useParams();

  // fetch the data of the specific course data
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["course", courseId],
  //   queryFn: () => axios.get(`/COURSE_URL/${courseId}`).then((res) => res.data),
  // });

  // if (isLoading) {
  //   return <PageLoader />;
  // }

  // if (isError) {
  //   console.log("Error, Fetch Course: ", error.message);
  // }

  const course = {
    title: "Data structures and Algorithms",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Computer science",
    chaptersLength: 5,
    progress: null,
    price: 5.0,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error obcaecati tempora tenetur blanditiis dolore quis, consequatur iure debitis incidunt minima cumque sapiente, nisi, pariatur quae libero reprehenderit nam quia nihil. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, ab velit numquam, odit dicta dolorum quam corporis vel nam iure delectus quisquam eaque. Non aspernatur enim debitis consectetur eum laudantium.",
  };
  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3  m-3 h-full">
      <div className="relative w-full  rounded-md overflow-hidden">
        <img
          className="object-cover h-[400px] w-full"
          alt={course.title}
          src={course.imageUrl}
        />
      </div>
      <div className="flex flex-col pt-2 mt-4 px-3">
        <div className="flex justify-between items-center">
          <div className="text-lg md:text-2xl font-medium group-hover:text-purple-700 transition line-clamp-2">
            {course.title}
          </div>
          <div className="flex justify-start items-center gap-5">
            {course.progress !== null ? (
              <div>TODO: Progress component</div>
            ) : (
              <p className="text-md md:text-3xl font-bold text-slate-700">
                {formatPrice(course.price)}
              </p>
            )}
            <Button className="rounded-3xl flex justify-center items-center gap-2 hover:bg-purple-700">
              <Plus size={15} />
              Add course
            </Button>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">{course.category}</p>

        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <IconBadge size="sm" icon={BookOpen} />
            <span>
              {course.chaptersLength}{" "}
              {course.chaptersLength === 1 ? "Chapter" : "Chapters"}
            </span>
          </div>
        </div>

        <p className="my-2 text-justify">{course.description}</p>
      </div>
    </div>
  );
};

export default ViewCourse;
