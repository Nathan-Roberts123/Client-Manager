import { NextRequest, NextResponse } from "next/server";
import { ZClient } from "@/lib/types";
import { getClient, updateClient } from "@/lib/services/client";
import { getServerSession } from "next-auth";
import OPTIONS from "@/lib/authOptions";

export async function GET(
  req: NextRequest,
  { params }: { params: { clientId: string } }
) {
  const session = await getServerSession(OPTIONS);

  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }

  const { clientId } = params;

  try {
    const client = await getClient(clientId);

    return NextResponse.json(client);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { clientId: string } }
) {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }
  const contentType = req.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") === -1) {
    return NextResponse.json(
      { message: "Request must be a json format" },
      { status: 400 }
    );
  }
  const { clientId } = params;

  try {
    const data = ZClient.parse(await req.json());
    const client = await updateClient(data, clientId);
    return NextResponse.json({
      client,
    });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
