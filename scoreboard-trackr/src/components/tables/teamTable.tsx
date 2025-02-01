"use client"; // Ensures it's a client component

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamInLeague } from "@/sanity/lib/types";

// Define columns for the team table
export const teamColumns: ColumnDef<TeamInLeague>[] = [
  {
    accessorKey: "team.name",
    header: "Team Name",
    enableSorting: true, // Enable sorting on the "Team Name" column
  },
  {
    accessorKey: "points",
    header: "P",
    enableSorting: true, // Enable sorting on the "Points" column
  },
  {
    accessorKey: "wins",
    header: "W",
    enableSorting: true, // Enable sorting on the "Wins" column
  },
  {
    accessorKey: "losses",
    header: "L",
    enableSorting: true, // Enable sorting on the "Losses" column
  },
  {
    accessorKey: "draws",
    header: "D",
    enableSorting: true, // Enable sorting on the "Draws" column
  },
  {
    accessorKey: "goalDifference",
    header: "GD",
    enableSorting: true, // Enable sorting on the "Goal Difference" column
  },
  {
    accessorKey: "isQualified",
    header: "Qualified",
    cell: ({ row }) => (
      <span className={row.original.isQualified ? "text-green-500" : "text-red-500"}>
        {row.original.isQualified ? "Yes" : "No"}
      </span>
    ),
    enableSorting: true, // Enable sorting on the "Qualified" column
  },
];

interface TeamTableProps {
  teamsInLeague: TeamInLeague[];
}

const TeamTable: React.FC<TeamTableProps> = ({ teamsInLeague }) => {
  const [sorting, setSorting] = useState([{ id: "team.name", desc: false }]); // Sorting state

  const table = useReactTable({
    data: teamsInLeague,
    columns: teamColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting, // Update sorting state when sorting changes
  });

  return (
    <Table className="border border-gray-300 shadow-md rounded-lg mt-4">
      <TableHeader className="bg-[#e1350e5d]">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <TableHead
                key={header.id}
                className={`px-4 py-2 cursor-pointer ${index === 0 ? 'w-[30rem]' : ''}`}
                onClick={header.column.getToggleSortingHandler()} // Handle sorting when header is clicked
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                <span>
                  {header.column.getIsSorted()
                    ? header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : " 🔽"
                    : ""}
                </span>
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
            <TableCell colSpan={teamColumns.length} className="text-center py-4 text-gray-500">
              No teams found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TeamTable;
