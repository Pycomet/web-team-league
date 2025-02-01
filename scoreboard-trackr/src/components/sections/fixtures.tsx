/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Ensures it's a client component
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { FIXTURES_QUERY } from "@/sanity/lib/queries"; // You need to define this query
import { Fixture } from "@/sanity/lib/types"; // Define the correct type for a fixture
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

// Define columns for the fixture table
export const fixtureColumns: ColumnDef<Fixture>[] = [
  {
    accessorKey: "homeTeam.name",
    header: "Home Team",
  },
  {
    accessorKey: "awayTeam.name",
    header: "Away Team",
  },
  {
    accessorKey: "matchDate",
    header: "Match Date",
    cell: ({ row }) => new Date(row?.original?.matchDate as string).toLocaleString(),
  },
  {
    accessorKey: "homeScore",
    header: "Home Score",
  },
  {
    accessorKey: "awayScore",
    header: "Away Score",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

interface FixtureSectionProps {
  selectedLeagueId: string;
}

const FixtureSection: React.FC<FixtureSectionProps> = ({ selectedLeagueId }) => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch fixtures based on the selected league
  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const fetchedFixtures: Fixture[] = await client.fetch(FIXTURES_QUERY, { leagueId: selectedLeagueId });
        setFixtures(fetchedFixtures);
      } catch (error) {
        console.error("Error fetching fixtures:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedLeagueId) {
      fetchFixtures();
    }
  }, [selectedLeagueId]);

  const table = useReactTable({
    data: fixtures,
    columns: fixtureColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Show detailed fixture when clicked
  const handleFixtureClick = (fixture: Fixture) => {
    setSelectedFixture(fixture);
  };

  if (loading) return <p>Loading fixtures...</p>;

  return (
    <section>
      <h2 className="font-bold uppercase mb-2">Match Fixtures</h2>

      {/* Fixtures Table */}
      <Table className="border border-gray-300 shadow-md rounded-lg mt-4">
        <TableHeader className="bg-[#e1350e5d]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="px-4 py-2 cursor-pointer">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-b cursor-pointer"
                onClick={() => handleFixtureClick(row.original)} // Handle row click to show details
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={fixtureColumns.length} className="text-center py-4 text-gray-500">
                No fixtures found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Fixture Details Section */}
      {selectedFixture && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Fixture Details</h3>
          <p><strong>Home Team:</strong> {(selectedFixture?.homeTeam as any)?.name}</p>
          <p><strong>Away Team:</strong> {(selectedFixture?.awayTeam as any)?.name}</p>
          <p><strong>Match Date:</strong> {new Date(selectedFixture?.matchDate as string).toLocaleString()}</p>
          <p><strong>Status:</strong> {selectedFixture.status}</p>
          <p><strong>Home Score:</strong> {selectedFixture.homeScore}</p>
          <p><strong>Away Score:</strong> {selectedFixture.awayScore}</p>
        </div>
      )}
    </section>
  );
};

export default FixtureSection;
