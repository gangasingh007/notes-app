import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Phone } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-muted/40 via-background to-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-lg shadow-2xl border-0 ring-1 ring-border/50">
        <CardHeader className="space-y-4 text-center pb-5 pt-2 px-10">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Reset Your Password
          </CardDescription>
        </CardHeader>

        <CardContent className="px-10 pb-8">
          <form>
            <div className="space-y-6">
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
              <Button
                type="submit"
                size="lg"
                className="w-full h-13 text-lg font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Verify
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t px-10 py-6 mt-2 bg-muted/20">
          <p className="text-base text-[15px] text-muted-foreground">
            Try saving your password for further convenience
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
