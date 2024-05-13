import { IconBadge } from "@/components/shared/IconBadge";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import TitleForm from "@/components/shared/instructor/createCourse/Title-form";
import DescriptionForm from "@/components/shared/instructor/createCourse/Description-form";
import ImageForm from "@/components/shared/instructor/createCourse/Image-form";
import CategoryForm from "@/components/shared/instructor/createCourse/Category-form";
import PriceForm from "@/components/shared/instructor/createCourse/Price-form";
import AttachmentForm from "@/components/shared/instructor/createCourse/Attachment-form";
import ChapterForm from "@/components/shared/instructor/createCourse/Chapter-form";
import Actions from "@/components/shared/instructor/createCourse/Actions";
import Banner from "@/components/shared/Banner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const user = localStorage.getItem("user") || "";

  if (!courseId) {
    navigate("/instructor/courses");
  }

  if (!user) {
    navigate("/sign-in");
  }

  // Fetch the course data
  const {
    data: course,
    isLoading: isCourseLoading,
    refetch,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () =>
      axios
        .get(`http://localhost:8081/course/${courseId}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(user).access_token}`,
          },
        })
        .then((res) => res.data),
  });

  const categories = [
    { label: "Web Development", value: "web-development" },
    { label: "Mobile Development", value: "mobile-development" },
    { label: "UI/UX Design", value: "ui-ux-design" },
    { label: "Data Science", value: "data-science" },
    { label: "Digital Marketing", value: "digital-marketing" },
    { label: "Other", value: "other" },
  ];

  if (isCourseLoading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    navigate("/");
  }

  const requiredFields = [
    course.name,
    course.description,
    course.price,
    course.category,
  ];

  //add empy chapters to the course
  if (!course.chapters) {
    course.chapters = [];
  }
  //add empty attachments to the course
  if (!course.attachments) {
    course.attachments = [];
  }

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={courseId || ""}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm
              initialData={course}
              courseId={course._id}
              refetch={refetch}
            />
            <DescriptionForm
              initialData={course}
              courseId={course._id}
              refetch={refetch}
            />
            {/* <ImageForm initialData={course} courseId={course._id} /> */}
            <CategoryForm
              initialData={course}
              courseId={course._id}
              options={categories}
              refetch={refetch}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChapterForm initialData={course} courseId={course._id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm
                initialData={course}
                courseId={course._id}
                refetch={refetch}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course._id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
