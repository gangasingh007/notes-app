"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription,CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useState } from "react"

export default function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-muted/40 via-background to-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-lg shadow-2xl border-0 ring-1 ring-border/50">
        <CardHeader className="space-y-4 text-center pb-5 pt-2 px-10">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Enter your credentials to access the admin portal.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-10 pb-8">
          <form>
            <div className="space-y-6">
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-base font-medium">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    Work Email
                  </span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  required
                  className="h-12 text-base px-4 transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base font-medium">
                    <span className="flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5" />
                      Password
                    </span>
                  </Label>
                  <a
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline transition-colors hover:text-primary/80"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="h-12 text-base px-4 pr-12 transition-all focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 pb-1">
                <Checkbox id="remember" className="h-4.5 w-4.5" />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-13 text-lg font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t px-10 py-6 mt-2 bg-muted/20">
          <p className="text-base text-muted-foreground">
            Need an admin account?{" "}
            <a
              href="/admin/register"
              className="text-primary hover:underline font-semibold transition-colors hover:text-primary/80"
            >
              Request access
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}