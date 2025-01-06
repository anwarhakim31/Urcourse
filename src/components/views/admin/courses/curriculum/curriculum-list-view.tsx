"use client";
import React from "react";
import {
  Droppable,
  DragDropContext,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import useReorder from "@/hooks/course/useReorder";
import { useRouter } from "next/navigation";

type Data = { id: string; type: string; title: string; position: number };

const CurriculumListView = ({
  data,
  courseId,
}: {
  data: Data[];
  courseId: string;
}) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);
  const [datas, setDatas] = React.useState<Data[]>([]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    setDatas(data);
  }, [data]);

  const { mutate } = useReorder();

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
    }));

    mutate(UpdateData);
  };

  const onEdit = (id: string, type: string) => {
    if (type === "module")
      router.push(`/admin/course/${courseId}/curriculum/module/${id}`);
    if (type === "exercise")
      router.push(`/admin/course/${courseId}/curriculum/exercise/${id}`);
  };

  if (!isMounted)
    return (
      <div className="mt-4 flex items-center justify-center">
        <p>Loading</p>
      </div>
    );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="data">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className="space-y-2 mt-4">
              {datas.length > 0 ? (
                datas.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="flex items-center bg-indigo-50  rounded-lg text-sm  p-3"
                      >
                        <div {...provided.dragHandleProps}>
                          <Grip className="h-4 w-4 cursor-pointer mr-4 hover:text-blue-600 font-medium" />
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm">
                            <span className="font-medium">{item.type} : </span>
                            {item.title}
                          </p>
                        </div>

                        <div className="ml-auto">
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
                <div className="mt-4">
                  <p>No data</p>
                </div>
              )}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CurriculumListView;
