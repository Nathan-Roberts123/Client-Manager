import { NextResponse } from "next/server";
import { ZClient } from "@/lib/types";
import { createClient, getClients } from "@/lib/services/client";
import { getServerSession } from "next-auth";
import OPTIONS from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(OPTIONS);

  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }

  try {
    const clients = await getClients(session.user.id);

    return NextResponse.json(clients);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function POST(req: NextResponse) {
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

  try {
    const data = ZClient.parse(await req.json());
    const client = await createClient(data, session.user.id);

    return NextResponse.json({
      client,
    });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
