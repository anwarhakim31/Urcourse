import ExerciseMainPage from "@/components/views/exercise/exercise-main-view";
import authOptions from "@/lib/authOptions";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { exerciseId: string };
}) {
  const exerciseResult = await db.exerciseResult.findUnique({
    where: {
      id: params.exerciseId,
    },
    include: {
      exercise: true,
    },
  });

  return {
    title: exerciseResult?.exercise?.title,
    description: exerciseResult?.exercise?.description,
  };
}

const ExercisePage = async ({ params }: { params: { exerciseId: string } }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const exerciseResult = await db.exerciseResult.findUnique({
    where: {
      id: params.exerciseId,
    },
    include: {
      exercise: true,
    },
  });

  if (exerciseResult?.isPassed) {
    return redirect(`/exercise/${params.exerciseId}/result`);
  }

  if (!exerciseResult) {
    return redirect("/");
  }

  const exercise = await db.exercise.findUnique({
    where: {
      id: exerciseResult.exerciseId,
    },
  });

  if (!exercise) {
    return redirect("/");
  }

  return <ExerciseMainPage roomId={params.exerciseId} />;
};

export default ExercisePage;
