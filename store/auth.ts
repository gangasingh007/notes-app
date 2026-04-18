import { isAuthenticated } from "@/lib/actions/auth";

export async function checkAuth(){
    const result = await isAuthenticated();
    if (result){
        return true
    }
    return false
}