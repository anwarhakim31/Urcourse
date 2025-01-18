"use client";
import React, { Fragment } from "react";
import {
  Droppable,
  DragDropContext,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { FileWarning, Grip, Pencil, Trash } from "lucide-react";
import useReorder from "@/hooks/course/curriculum/useReorder";
import { useRouter } from "next/navigation";
import { ModalDelete } from "@/components/fragments/modal-delete";
import useDeleteCurriculumList from "@/hooks/course/curriculum/useDeleteCurriculumList";
import { toast } from "sonner";
import { ResponseErrorAxios } from "@/lib/response-error";
import { cn } from "@/lib/utils";

type Data = {
  id: string;
  type: string;
  title: string;
  position: number;
  isPublished: boolean;
};

const CurriculumListView = ({
  data,
  courseId,
}: {
  data: Data[];
  courseId: string;
}) => {
  const router = useRouter();
  const [isDelete, setIsDelete] = React.useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [datas, setDatas] = React.useState<Data[]>([]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    setDatas(data);
  }, [data]);

  const { mutate: curriculumMutate, isPending } =
    useDeleteCurriculumList(courseId);
  const { mutate: reorderMutate } = useReorder(courseId);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(datas);

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDatas(items);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedCurriculum = items.slice(startIndex, endIndex + 1);

    const UpdateData = updatedCurriculum.map((section) => ({
      id: section.id,
      position: items.findIndex((item) => item.id === section.id) + 1,
      type: section.type,
      courseId: courseId,
    }));

    reorderMutate(UpdateData);
  };

  const onEdit = (id: string, type: string) => {
    if (type === "module")
      router.push(`/admin/course/${courseId}/curriculum/module/${id}`);
    if (type === "exercise")
      router.push(`/admin/course/${courseId}/curriculum/exercise/${id}`);
  };

  if (!isMounted)
    return (
      <div className="mt-28 flex items-center justify-center w-full gap-2">
        <div className="w-3 h-3 rounded-full bg-indigo-700 animate-bounce"></div>
        <div className="w-3 h-3 rounded-full bg-indigo-700  animate-bounce delay-200"></div>
        <div className="w-3 h-3 rounded-full bg-indigo-700  animate-bounce"></div>
      </div>
    );

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="data">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className="space-y-2 mt-4 relative">
                {datas.length > 0 ? (
                  datas.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          className={cn(
                            "flex items-center   rounded-lg text-sm  p-3",
                            item.isPublished ? "bg-indigo-50" : "bg-orange-50"
                          )}
                        >
                          <div {...provided.dragHandleProps}>
                            <Grip className="h-4 w-4 cursor-pointer mr-4 hover:text-blue-600 font-medium" />
                          </div>
                          <div className="flex items-center">
                            <p className="text-sm line-clamp-1">
                              <span className="font-medium">
                                {item.type} :{" "}
                              </span>
                              {item.title}
                            </p>
                          </div>

                          <div className="absolute right-4 flex gap-2 items-center bg-indigo-50">
                            <Trash
                              className="h-4 w-4 cursor-pointer hover:text-blue-600"
                              onClick={() => setIsDelete(item)}
                            />
                            <Pencil
                              className="h-4 w-4 cursor-pointer hover:text-blue-600"
                              onClick={() => onEdit(item.id, item.type)}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div className="mt-24 flex-center flex-col">
                    <FileWarning
                      size={52}
                      className="text-slate-700"
                      strokeWidth={1.5}
                    />
                    <p className="mt-2">No data</p>
                  </div>
                )}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ModalDelete
        isOpen={isDelete !== null}
        onClose={() => setIsDelete(null)}
        onConfirm={() => {
          curriculumMutate(isDelete?.id as string, {
            onSuccess: () => {
              router.refresh();
              setIsDelete(null);
              toast.success("Curriculum deleted successfully");
            },
            onError: (error: Error) => {
              console.log(error);
              ResponseErrorAxios(error);
            },
          });
        }}
        loading={isPending}
        desc={`Are you sure you want to delete ${isDelete?.title}?`}
      />
    </Fragment>
  );
};

export default CurriculumListView;
