"use client";
import React from "react";
import { Button } from "./button";
import { FaAddressCard } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <nav className="flex bg-primary-foreground justify-between py-2 px-2 items-center">
      <Link href="/" className="flex items-center gap-2">
        <FaAddressCard className="text-4xl" />
        <span className="font-bold text-3xl">
          {status === "authenticated" && session.user.username}
        </span>
      </Link>
      <div className="space-x-2">
        <Button asChild={true}>
          <Link href="/clients/new">New Client</Link>
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            signOut({
              redirect: false,
              callbackUrl: "/auth/sign-in",
            });
            router.push("/auth/sign-in");
          }}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
