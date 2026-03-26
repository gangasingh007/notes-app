"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, BookOpen, Sparkles } from "lucide-react"

interface WelcomeCardProps {
  adminName?: string;
}

export default function WelcomeCard({ adminName = "Ganga" }: WelcomeCardProps) {
  return (
    <Card className="relative overflow-hidden border-border/80 bg-black/90 shadow-md transition-all duration-300 hover:shadow-lg">
      
      {/* Decorative background glow for a visually striking feel */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
      
      <CardHeader className="pb-4 relative z-10">        
        <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back, {adminName}
        </CardTitle>
        
        <CardDescription className="text-base text-muted-foreground mt-2 max-w-[600px]">
          Manage your classes, curate educational materials, and oversee system resources effortlessly from your command center.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}