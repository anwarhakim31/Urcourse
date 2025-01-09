import { redirect } from "next/navigation";

export async function getCategory() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/main`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return redirect("/error");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
