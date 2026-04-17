
import ClassHomeLayout from "@/components/main/ClassHomeLayout";
import { getClassdata } from "@/lib/actions/class";


export default async function page() {
    const result = await getClassdata();
    const classes = result.data || [];
    return (
      <div className="w-full p-2 md:p-8">
        <ClassHomeLayout classes={classes} />
      </div>
    )
  }