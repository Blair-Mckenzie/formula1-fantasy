import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    name: "John",
    points: "15",
  },
  {
    name: "Paul",
    points: "87",
  },
  {
    name: "James",
    points: "59",
  },
  {
    name: "Chris",
    points: "94",
  },
  {
    name: "Sophie",
    points: "46",
  },
  {
    name: "Maddie",
    points: "60",
  },
];

export default function TableDemo() {
  return (
    <Table className="w-[60%] mx-auto rounded-md border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50%] text-center">Name</TableHead>
          <TableHead className="w-[50%] text-center">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.name}>
            <TableCell className="text-center font-medium">
              {user.name}
            </TableCell>
            <TableCell className="text-center">{user.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
