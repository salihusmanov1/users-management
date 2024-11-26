import { ArrowUpDown } from "lucide-react";
import { Button } from "./button";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Seen
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "last_seen",
    cell: ({ row }) => {
      const lastSeen = row.original.last_seen;
      return moment(lastSeen).fromNow();
    },
  },
  {
    header: "Status",
    accessorKey: "is_blocked",
    cell: ({ row }) => {
      return row.original.is_blocked ? (
        <Badge className="border-red-300 text-red-500" variant="outline">
          Blocked
        </Badge>
      ) : (
        <Badge
          className="border-emerald-300 text-emerald-500"
          variant="outline"
        >
          Active
        </Badge>
      );
    },
  },
];
