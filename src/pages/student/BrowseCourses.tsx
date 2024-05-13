import SearchInput from "@/components/shared/SearchInput";
import Categories from "@/components/shared/student/Categories";
import CoursesList from "@/components/shared/student/CoursesList";

const BrowseCourses = () => {
  return (
    <>
      {/* mobile responsive */}
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={[
            { id: 1, name: "Software engineering" },
            { id: 2, name: "Data Science" },
            { id: 3, name: "Computer Science" },
            { id: 4, name: "Computer Network" },
            { id: 5, name: "Operating Systems" },
            { id: 6, name: "Accounting" },
          ]}
        />
        <CoursesList
          items={[
            {
              id: "1",
              title: "Introduction to Programming",
              description:
                "Learn the basics of programming with this introductory course.",
              imageUrl:
                "https://images.unsplash.com/photo-1487611459768-bd414656ea10?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              price: "49.99",
              category: { name: "Computer Science" },
              chapters: [
                { id: "chapter1" },
                { id: "chapter2" },
                { id: "chapter3" },
              ],
              progress: null,
            },
            {
              id: "2",
              title: "Data Structures and Algorithms",
              description:
                "Master data structures and algorithms with this comprehensive course.",
              imageUrl:
                "https://images.unsplash.com/photo-1642952469120-eed4b65104be?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              price: "69.99",
              category: { name: "Computer Science" },
              chapters: [
                { id: "chapter1" },
                { id: "chapter2" },
                { id: "chapter3" },
                { id: "chapter4" },
              ],
              progress: null,
            },
            {
              id: "3",
              title: "Introduction to Machine Learning",
              description:
                "Dive into the fascinating world of machine learning.",
              imageUrl:
                "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=2534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              price: "89.99",
              category: { name: "Artificial Intelligence" },
              chapters: [
                { id: "chapter1" },
                { id: "chapter2" },
                { id: "chapter3" },
                { id: "chapter4" },
                { id: "chapter5" },
              ],
              progress: null,
            },
            // Add more mock course data as needed
          ]}
        />
      </div>
    </>
  );
};

export default BrowseCourses;
