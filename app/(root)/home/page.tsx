import ClassHomeLayout from "@/components/main/ClassHomeLayout";
import { getClassdata } from "@/lib/actions/class";
import { ClassItem } from "@/types";

export default async function Page() {
  const result = await getClassdata();
  const classes: ClassItem[] = result.success && result.data ? result.data : [];

  return (
    <div className="w-full p-2 md:p-8">
      <ClassHomeLayout classes={classes} />
    </div>
  );
}