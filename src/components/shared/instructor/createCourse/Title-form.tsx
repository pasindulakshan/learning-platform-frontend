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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface TitleFormProps {
  initialData: {
    name: string;
  };
  courseId: string;
  refetch: () => void;
}

//Form Schema
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Title is required",
  }),
});

const TitleForm = ({ initialData, courseId, refetch }: TitleFormProps) => {
  //Course title edit state
  const [isEditing, setIsEditing] = useState(false);
  const user = localStorage.getItem("user") || "";

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
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

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Title
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
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.name}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Advanced web development"
                      {...field}
                    />
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

export default TitleForm;
