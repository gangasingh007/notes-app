"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff} from "lucide-react"
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
      setError("Passwords do not match")
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
        setError(result?.message || "Registration failed")
        return
      }

      setSuccess("Admin registered successfully!")

      // redirect after success
      setTimeout(() => {
        router.push("/admin")
      }, 1200)

    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-muted/40 via-background to-muted/40 p-6 md:p-12">

      <Card className="w-full max-w-3xl shadow-2xl border-0 ring-1 ring-border/50">

        <CardHeader className="space-y-2 pb-6 pt-4 px-10">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Register New Admin
          </CardTitle>
          <p className="text-base text-muted-foreground mt-1">
            Create a new administrator account
          </p>
        </CardHeader>

        <CardContent className="px-10 pb-6">

          <form onSubmit={handleSubmit}>

            <div className="space-y-8">

              {/* PERSONAL INFO */}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@company.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 xxxxx xxxxx"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* PASSWORD */}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>

                  <div className="relative">

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
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
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>
                </div>

              </div>

            </div>

            {/* ERROR MESSAGE */}

            {error && (
              <p className="text-red-500 text-sm mt-4">{error}</p>
            )}

            {success && (
              <p className="text-green-500 text-sm mt-4">{success}</p>
            )}

            <div className="mt-10">

              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-[45%]"
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>

            </div>

          </form>

        </CardContent>

        <CardFooter className="flex justify-center border-t px-10 py-6 mt-2 bg-muted/20">
          <p className="text-base text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/admin/login"
              className="text-primary hover:underline font-semibold"
            >
              Sign In
            </a>
          </p>
        </CardFooter>

      </Card>
    </div>
  )
}