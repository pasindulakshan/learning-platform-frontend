import { columns } from "@/components/shared/instructor/dashboard/column";
import Datatable from "@/components/shared/instructor/dashboard/data-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const ViewAllCourses = () => {
  const user = localStorage.getItem("user") || "";
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () =>
      axios
        .get(`http://localhost:8081/course/author/${JSON.parse(user)._id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(user).access_token}`,
          },
        })
        .then((res) => res.data),
  });

  if (isError) {
    toast.error("An error occurred: " + error.message);
  }

  return (
    <div className="p-6">
      <Datatable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
};

export default ViewAllCourses;
