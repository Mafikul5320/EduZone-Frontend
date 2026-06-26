import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, CheckCircle2 } from "lucide-react";

export default function ProfileSetupPrompt() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <UserPlus className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Complete Your Tutor Profile</CardTitle>
          <CardDescription className="text-base">
            You're almost there! Set up your tutor profile to start accepting students and earning.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">What you'll need:</h3>
            <ul className="space-y-2">
              {[
                "Your professional bio and teaching experience",
                "Subjects you want to teach",
                "Your hourly rate",
                "A teaching category",
                "Profile image (optional)",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
            <Link href="/tutor-dashboard/create-profile" className="block">
              <Button size="lg" className="w-full">
                <UserPlus className="w-5 h-5 mr-2" />
                Create Tutor Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
