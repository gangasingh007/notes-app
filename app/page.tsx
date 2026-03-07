import { isAuthenticated } from "@/lib/actions/auth"
import { redirect } from "next/navigation";

export default function page() {
  const checkAuthentication = isAuthenticated();
  if(checkAuthentication){
    redirect("/admin")
  }
  redirect("/home")
  return null
}
