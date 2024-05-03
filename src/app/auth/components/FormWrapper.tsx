import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import GoogleButton from "./GoogleButton";

const FormWrapper = ({
  children,
  formType,
}: {
  children: React.ReactNode;
  formType: "signIn" | "signUp";
}) => {
  return (
    <div className="flex h-full justify-center items-center">
      <Card className="lg:w-1/3">
        <CardHeader className="flex justify-center py-2">
          <CardTitle className="text-2xl flex justify-center">
            {formType === "signIn"
              ? "Login to your account"
              : "Create an account"}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2">{children}</CardContent>
        <CardFooter className="text-sm flex-col gap-2 justify-center py-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleButton />
          <div className="text-xs flex justify-center">
            {formType === "signIn" ? (
              <>
                <span className="bg-background text-muted-foreground">
                  Don&apos;t Have An Account&nbsp;
                </span>
                <Link href="/auth/sign-up" className="text-blue-500">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Label>Already Have An Account&nbsp;</Label>
                <Link href="/auth/sign-in" className="text-blue-500">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormWrapper;
