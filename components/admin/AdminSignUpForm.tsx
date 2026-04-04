"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, Mail, Smartphone, Lock, User } from "lucide-react"
import { useState } from "react"
import { registerAdmin } from "@/lib/actions/auth"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"

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

  // Animation Variants
   const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  }

  const panelVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
      {/* Main Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex w-full max-w-6xl overflow-hidden rounded-[2rem] border border-border/50 bg-card shadow-2xl"
      >
        
        {/* LEFT PANEL - Branding & Image Placeholder */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between bg-muted/20 p-12 relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

          <motion.div 
            variants={panelVariants}
            initial="hidden"
            animate="show"
            className="flex-1 flex flex-col items-center justify-center space-y-12 z-10"
          >
            {/* Image Placeholder */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
               <Image src="/register.avif" className="rounded-2xl shadow-xl" alt="StudySync" width={300} height={300} priority />
            </motion.div>

            {/* Branding Text */}
            <motion.div variants={itemVariants} className="text-center space-y-2">
              <h1 className="text-4xl font-extrabold text-foreground tracking-tight">StudySync</h1>
              <p className="text-muted-foreground font-medium">Academic Hub</p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex items-center gap-10 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">12k+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Students</p>
              </div>
              <div className="w-px h-10 bg-border/50" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">500+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Resources</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="z-10 mt-auto pt-12"
          >
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
              EST. 2024 — STUDY SYNC DIGITAL INFRASTRUCTURE
            </p>
          </motion.div>
        </div>

        {/* RIGHT PANEL - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-14 flex flex-col">
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Create an account</h2>
            <p className="text-muted-foreground">Start your journey to academic excellence today.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
            
            {/* First & Last Name Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs text-muted-foreground ml-1">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-10 bg-muted/40 border-transparent hover:bg-muted/60 focus-visible:bg-transparent transition-colors h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs text-muted-foreground ml-1">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="pl-10 bg-muted/40 border-transparent hover:bg-muted/60 focus-visible:bg-transparent transition-colors h-11"
                  />
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="email" className="text-xs text-muted-foreground ml-1">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@university.edu"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-muted/40 border-transparent hover:bg-muted/60 focus-visible:bg-transparent transition-colors h-11"
                />
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="phone" className="text-xs text-muted-foreground ml-1">Phone Number</Label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="pl-10 bg-muted/40 border-transparent hover:bg-muted/60 focus-visible:bg-transparent transition-colors h-11"
                />
              </div>
            </motion.div>

            {/* Passwords Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs text-muted-foreground ml-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-muted/40 border-transparent hover:bg-muted/60 focus-visible:bg-transparent transition-colors h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-xs text-muted-foreground ml-1">Confirm</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-muted/40 border-transparent hover:bg-muted/60 focus-visible:bg-transparent transition-colors h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Error & Success States */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-medium text-destructive mt-2">
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-medium text-emerald-500 mt-2">
                {success}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-md font-semibold bg-primary hover:opacity-90 text-background border-0 transition-opacity"
              >
                {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating...</> : "Sign Up"}
              </Button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border/60"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-semibold text-muted-foreground">OR</span>
                <div className="flex-grow border-t border-border/60"></div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/login")}
                className="w-full h-12 text-md font-medium bg-transparent border-border/60 hover:bg-muted/30 transition-colors"
              >
                Log In
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-auto pt-6 text-center">
              <p className="text-xs text-muted-foreground mb-6">
                By signing up, you agree to our <a href="#" className="text-foreground hover:underline">Terms of Service</a> and <a href="#" className="text-foreground hover:underline">Privacy Policy</a>.
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}