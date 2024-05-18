import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { QUEUE_LIST } from "../constants/queue-list";
import { Caller } from "./caller";

export function TableQueue() {
  return (
    <Table>
      <TableCaption>
        Sample Daftar Antrian (Rakhmat&apos;s Project).
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] whitespace-nowrap font-medium">
            No Antrian
          </TableHead>
          <TableHead className="font-medium">Kategori</TableHead>
          <TableHead className="sr-only">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {QUEUE_LIST.map((q, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{q.queueNo}</TableCell>
            <TableCell className="capitalize">{q.category}</TableCell>
            <Caller queueNo={q.queueNo} category={q.category} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
