import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TClient } from "@/lib/types";
import Link from "next/link";

const ClientList = ({ clients }: { clients: TClient[] }) => {
  return (
    <Table>
      <TableCaption>A list of your clients.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30px]"></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client, key) => {
          return (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{key}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phoneNumber}</TableCell>
              <TableCell>{client.address && client.address.street}</TableCell>
              <TableCell>{client.company}</TableCell>
              <TableCell>{client.note}</TableCell>
              <TableCell className="text-right">
                <Button asChild={true}>
                  <Link href={`/clients/${client.id}`}>Edit</Link>
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ClientList;
