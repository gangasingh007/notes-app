"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react"
import { useState } from "react"

export default function AdminSignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-muted/40 via-background to-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-3xl shadow-2xl border-0 ring-1 ring-border/50">
        <CardHeader className="space-y-2 pb-6 pt-4 px-10">
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Register New Admin
              </CardTitle>
              <p className="text-base text-muted-foreground mt-1">
                Create a new administrator account to manage your platform
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-10 pb-6">
          <form>
            <div className="space-y-8">
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Personal Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2.5">
                    <Label htmlFor="firstName" className="text-base font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                      className="h-12 text-base px-4 transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="lastName" className="text-base font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                      className="h-12 text-base px-4 transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
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
                    <Label htmlFor="phone" className="text-base font-medium">
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" />
                        Phone Number
                      </span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 xxxxx xxxxx"
                      className="h-12 text-base px-4 transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Account Security
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2.5">
                    <Label htmlFor="password" className="text-base font-medium">
                      Password
                    </Label>
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
                  <div className="space-y-2.5">
                    <Label htmlFor="confirmPassword" className="text-base font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="h-12 text-base px-4 pr-12 transition-all focus:ring-2 focus:ring-primary/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-[45%] h-13 text-lg font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t px-10 py-6 mt-2 bg-muted/20">
          <p className="text-base text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/admin/login"
              className="text-primary hover:underline font-semibold transition-colors hover:text-primary/80"
            >
              Sign In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}