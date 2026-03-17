import { isAuthenticated } from "@/lib/actions/auth"
import { redirect } from "next/navigation";

export default async function page() {
  const checkAuthentication = isAuthenticated();
  if(await checkAuthentication){
    redirect("/admin")
  }
  redirect("/home")
  return null
}
