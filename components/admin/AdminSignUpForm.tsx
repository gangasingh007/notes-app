"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { registerAdmin } from "@/lib/actions/auth"
import { useRouter } from "next/navigation"

export default function AdminSignUpForm() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.id === "phone" ? "phoneNumber" : e.target.id]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.")
      return
    }

    try {
      setLoading(true)

      const result = await registerAdmin({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password
      })

      if (!result?.success) {
        setError(result?.message || "Registration failed. Please check your details.")
        return
      }

      setSuccess("Admin registered successfully! Redirecting...")
      setTimeout(() => {
        router.push("/admin")
      }, 1200)

    } catch (err) {
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-muted/40 via-background to-muted/40 p-4 md:p-8">
      <Card className="w-full max-w-2xl shadow-xl border-border/50">
        <CardHeader className="space-y-1 pb-8 pt-6 px-8 md:px-10">
          <CardTitle className="text-3xl  text-primary/80 font-bold tracking-tight">
            Register Admin
          </CardTitle>
          <CardDescription className="text-base">
            Create a new administrator account for the dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 md:px-10 pb-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* PERSONAL INFO SECTION */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="transition-colors focus-visible:ring-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="transition-colors focus-visible:ring-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@company.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="transition-colors focus-visible:ring-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 xxxxx xxxxx"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="transition-colors focus-visible:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            <hr className="border-border/50" />

            {/* SECURITY SECTION */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Security
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pr-10 transition-colors focus-visible:ring-primary/50"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pr-10 transition-colors focus-visible:ring-primary/50"
                    />
                    <button
                      type="button"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* FEEDBACK & SUBMIT */}
            <div className="pt-2 flex flex-col items-center sm:flex-row sm:justify-between sm:items-end gap-4">
              <div className="w-full sm:w-auto flex-1">
                {error && (
                  <div className="text-sm font-medium text-destructive bg-destructive/10 px-3 py-2 rounded-md border border-destructive/20">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-md border border-emerald-500/20">
                    {success}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto min-w-[140px] transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-border/50 px-8 py-6 bg-muted/30 rounded-b-xl">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/admin/login"
              className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
            >
              Sign In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}