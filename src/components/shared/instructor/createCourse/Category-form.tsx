import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface CategoryFormProps {
  initialData: {
    category: string;
  };
  courseId: string;
  options: { label: string; value: string }[];
  refetch: () => void;
}

// Form Schema
const formSchema = z.object({
  category: z.string().min(1, "Category is required"),
});

const CategoryForm = ({
  initialData,
  courseId,
  options,
  refetch,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const user = localStorage.getItem("user") || "";

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: initialData?.category || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await axios
      .patch(`http://localhost:8081/course/${courseId}`, values, {
        headers: {
          Authorization: `Bearer ${JSON.parse(user).access_token}`,
        },
      })
      .then(() => {
        toast.success("Course updated");
        toggleEdit();
        refetch();
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again: " + err.message);
      });
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.category
  );

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <Button
          onClick={toggleEdit}
          variant="ghost"
          className="border-2 border-gray-300"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.category && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "No category"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className="bg-black text-white"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CategoryForm;
