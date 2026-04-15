"use client"

import AddClassForm from "@/components/admin/AddClassForm";
import ClassGrid from "@/components/admin/ClassGrid"
import { getClassdata } from "@/lib/actions/class"
import { ClassItem } from "@/types";
import { useEffect, useState } from "react";

function page() {
    const [classes, setclasses] = useState<ClassItem[]>([])
    useEffect(() => {
        const fetchData = async () => {
          const result = await getClassdata();
          setclasses(result.success && result.data ? result.data : []);
        };
        fetchData();
      }, []);

    return (
    <div className="mx-auto w-full max-w-6xl  p-4 md:p-8">
        <div className = "flex mb-7 justify-end ">
            <AddClassForm />
        </div>
        <ClassGrid classes={classes} />
    </div>
  )
}

export default page