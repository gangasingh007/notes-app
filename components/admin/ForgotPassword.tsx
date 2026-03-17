"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Phone, Loader2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-muted/40 via-background to-muted/40 p-4 md:p-8">
      <Card className="w-full max-w-lg shadow-xl border-border/50">
        <CardHeader className="space-y-2 text-center pb-6 pt-8 px-8 md:px-10">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Forgot Password?
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Enter your phone number and we'll send you a verification code to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 md:px-10 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-semibold text-foreground/90">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 xxxxx xxxxx"
                  required
                  disabled={isLoading}
                  className="h-12 pl-10 text-base transition-colors focus-visible:ring-primary/50"
                />
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold tracking-wide shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Code...
                </>
              ) : (
                "Send Verification Code"
              )}
            </Button>
            
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-border/50 px-8 py-6 bg-muted/30 rounded-b-xl">
          <a
            href="/admin/login"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to login
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}