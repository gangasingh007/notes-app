"use client"
import AdminDashboard from '@/components/admin/AdminDashboard'
import AdminSignUpForm from '@/components/admin/AdminSignUpForm'
import { isAuthenticated } from '@/lib/actions/auth'
import { redirect } from 'next/navigation'
import{ useEffect, useState } from 'react'

export default function adminpage() {
    const [isAuth, setisAuth] = useState<boolean>(false)
    useEffect(() => {
        function checkAuth(){
            const isAdminauth = isAuthenticated();
            setisAuth(isAdminauth)
        }
        checkAuth()
    }, [isAuth])
    
  return (
   <>
    {!isAuth ? redirect("/admin/register"): <AdminDashboard />}
   </>
  );
}
