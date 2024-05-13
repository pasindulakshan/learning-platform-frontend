import CourseCard from "./CourseCard";

type CourseWithProgressWithCategory = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  category: any;
  chapters: { id: string }[];
  progress: number | null;
};
interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item: any) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foregrounded mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};

export default CoursesList;
