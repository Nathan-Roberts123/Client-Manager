import { createUserHandler } from "@/lib/services/user";
import { NextRequest, NextResponse } from "next/server";
import { ZSignUp } from "@/lib/types";
import { exclude } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") === -1) {
    return NextResponse.json(
      { message: "Request must be a json format" },
      { status: 400 }
    );
  }

  try {
    const data = ZSignUp.parse(await req.json());
    const res = await createUserHandler(exclude(data, ["confirmPassword"]));

    if (res instanceof Error) {
      return NextResponse.json({ message: res.message }, { status: 400 });
    }

    return NextResponse.json(res, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
