import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { env } from "@/lib/env";
import { signIn } from "next-auth/react";

const GoogleButton = () => {
  const handleClick = () => {
    signIn("google", {
      callbackUrl: env.NEXT_PUBLIC_WEBAPPURL,
    });
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleClick}>
      <Icons.google className="mr-2 h-4 w-4" />
      Google
    </Button>
  );
};

export default GoogleButton;
