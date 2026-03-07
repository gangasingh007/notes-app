
export function isAuthenticated():boolean{
    try {
        const token = localStorage.getItem("token")
        if(token){
            return true
        }
        return false
    } catch (error) {
        console.log("error in isAuthenticated", error)
        return false
    }
}
