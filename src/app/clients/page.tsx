import ClientList from "./components/clients-list-table";
import { env } from "@/lib/env";
import { TClient } from "@/lib/types";
import { cookies } from "next/headers";

async function getClients() {
  const res = await fetch(`${env.NEXT_PUBLIC_WEBAPPURL}/api/client`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Clients = async () => {
  const data: TClient[] = await getClients();

  if (!data.length) {
    return (
      <div className="flex justify-center">
        <h3>You Have No Clients</h3>
      </div>
    );
  }

  return <ClientList clients={data} />;
};

export default Clients;
