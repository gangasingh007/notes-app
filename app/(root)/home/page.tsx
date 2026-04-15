"use client"
import ClassHomeLayout from "@/components/main/ClassHomeLayout";
import { getClassdata } from "@/lib/actions/class";
import { ClassItem } from "@/types";
import { useEffect, useState } from "react";


export default function page() {
const [classes, setclasses] = useState<ClassItem[]>([])
    useEffect(() => {
        const fetchData = async () => {
          const result = await getClassdata();
          setclasses(result.success && result.data ? result.data : []);
        };
        fetchData();
      }, []);

    return (
      <div className="w-full p-2 md:p-8">
        <ClassHomeLayout classes={classes} />
      </div>
    )
  }