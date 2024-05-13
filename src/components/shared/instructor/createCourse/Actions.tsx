import { ConfirmModal } from "../../Confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti.store";
import axios from "axios";
import { Trash } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = localStorage.getItem("user") || "";

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios
        .patch(
          `http://localhost:8081/course/${courseId}`,
          {
            isPublished: !isPublished,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(user).access_token}`,
            },
          }
        )
        .then(() => {
          toast.success("Course updated");
        })
        .catch((err) => {
          toast.error("Something went wrong, please try again: " + err.message);
        });
      navigate("/instructor/courses");
    } catch {
      toast.error("Somethings went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    await axios
      .delete(`http://localhost:8081/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(user).access_token}`,
        },
      })
      .then(() => {
        toast.success("Course deleted");
        navigate("/instructor/courses");
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again: " + err.message);
      });
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        className="bg-purple-300 text-black"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button
          size="sm"
          disabled={isLoading}
          className="bg-red-500 text-white"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Actions;
