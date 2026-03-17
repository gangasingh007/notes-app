"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"
import { useState } from "react"
import { login } from "@/lib/actions/auth"
import { useRouter } from "next/navigation"

export default function AdminLoginForm() {

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError("")
    setIsLoading(true)

    try {
      const res = await login({ email, password })

      if (!res?.success) {
        setError(res?.message || "Login failed")
        return
      }
      router.push("/admin")

    } catch (err) {
      setError("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-muted/40 via-background to-muted/40 p-4 md:p-8">

      <Card className="w-full max-w-lg shadow-xl border-border/50">

        <CardHeader className="space-y-2 text-center pb-6 pt-8 px-8 md:px-10">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Enter your credentials to access the secure portal.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 md:px-10 pb-8">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  required
                  disabled={isLoading}
                  className="h-12 pl-10"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="h-12 pl-10 pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* REMEMBER */}
            <div className="flex items-center space-x-3">
              <Checkbox id="remember" disabled={isLoading} />
              <Label htmlFor="remember">Remember me</Label>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

          </form>

        </CardContent>

        <CardFooter className="flex justify-center border-t px-8 py-6 bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Need an admin account?{" "}
            <a href="/admin/register" className="text-primary hover:underline">
              Request access
            </a>
          </p>
        </CardFooter>

      </Card>
    </div>
  )
}