"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react"
import { useState } from "react"
import { login } from "@/lib/actions/auth"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"

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

  const leftPanelVariants = {
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
        
        {/* LEFT PANEL - Form (Previously right side in your code flow) */}
        <div className="w-full lg:w-1/2 p-8 md:p-14 flex flex-col">
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Enter your credentials to access the secure portal.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
            
            {/* Email */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="email" className="text-xs text-muted-foreground ml-1">Work Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  required
                  disabled={isLoading}
                  className="pl-10 bg-muted/40 border-transparent hover:bg-muted/60 focus-visible:bg-transparent transition-colors h-11"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="pl-10 pr-10 bg-muted/40 border-transparent hover:bg-muted/60 focus-visible:bg-transparent transition-colors h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            {/* Remember Me */}
            <motion.div variants={itemVariants} className="flex items-center space-x-3 ml-1 py-1">
              <Checkbox id="remember" disabled={isLoading} className="border-muted-foreground/50 data-[state=checked]:bg-primary" />
              <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Remember me
              </Label>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-sm font-medium text-destructive mt-2"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-md font-bold bg-primary hover:opacity-90 text-background border-0 transition-opacity"
              >
                {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Authenticating...</> : "Sign In"}
              </Button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border/60"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-semibold text-muted-foreground">OR</span>
                <div className="flex-grow border-t border-border/60"></div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/register")}
                className="w-full h-12 text-md font-medium bg-transparent border-border/60 hover:bg-muted/30 transition-colors"
              >
                Request Access
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-auto pt-6 text-center">
              <p className="text-xs text-muted-foreground mb-6">
                By logging in, you agree to our <a href="#" className="text-foreground hover:underline">Terms of Service</a> and <a href="#" className="text-foreground hover:underline">Privacy Policy</a>.
              </p>
            </motion.div>

          </form>
        </div>

        {/* RIGHT PANEL - Branding & Image Placeholder */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between bg-muted/20 p-12 relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

          <motion.div 
            variants={leftPanelVariants}
            initial="hidden"
            animate="show"
            className="flex-1 flex flex-col items-center justify-center space-y-12 z-10"
          >
            {/* Image Placeholder */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
               <Image src="/login.avif" className="rounded-2xl shadow-xl" alt="StudySync" width={600} height={300} priority />
            </motion.div>

            {/* Branding Text */}
            <motion.div variants={itemVariants} className="text-center space-y-2">
              <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Notes<span className="text-primary">App</span></h1>
              <p className="text-muted-foreground font-medium">Your Notes, Your Way</p>
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

      </motion.div>
    </div>
  )
}