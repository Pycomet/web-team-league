"use client"; // Ensures it's a client component

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Player } from "@/sanity/lib/types";

// Define columns for the player table
export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: "name",
    header: "Player Name",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "goals",
    header: "Goals",
  },
  {
    accessorKey: "assists",
    header: "Assists",
  },
  {
    accessorKey: "cards",
    header: "Yellow/Red Cards",
  },
];

interface PlayersTableProps {
  players: Player[];
}

const PlayersTable: React.FC<PlayersTableProps> = ({ players }) => {
  const table = useReactTable({
    data: players,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="border border-gray-300 shadow-md rounded-lg mt-4">
      <TableHeader className="bg-[#e1350e5d]">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <TableHead key={header.id} className={`px-4 py-2 ${index === 0 ? 'w-[30rem]' : ''}`}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-4 text-gray-500">
              No players found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PlayersTable;
