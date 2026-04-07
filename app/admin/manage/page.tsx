import AddClassForm from "@/components/admin/AddClassForm";
import ClassGrid from "@/components/admin/ClassGrid"
import { getClassdata } from "@/lib/actions/class"

async  function page() {
    const result = await getClassdata();
    const classes = result.success && result.data ? result.data : []
  
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