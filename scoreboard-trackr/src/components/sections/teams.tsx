"use client"; // Ensures it's a client component

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@/sanity/lib/client";
import { PLAYERS_BY_TEAM_QUERY, TEAMS_QUERY } from "@/sanity/lib/queries";
import { Team, Player } from "@/sanity/lib/types";
import PlayersTable from "@/components/tables/playersTable";

export default function TeamsSection() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [playersLoading, setPlayersLoading] = useState(false);

  // Fetch teams on mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams: Team[] = await client.fetch(TEAMS_QUERY);
        setTeams(fetchedTeams);
        if (fetchedTeams.length > 0) {
          setSelectedTeam(fetchedTeams[0]._id); // Set first team as default
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Fetch players when selected team changes
  useEffect(() => {
    if (!selectedTeam) return;

    const fetchPlayers = async () => {
      setPlayersLoading(true);
      try {
        const fetchedPlayers: Player[] = await client.fetch(PLAYERS_BY_TEAM_QUERY, { teamId: selectedTeam });
        setPlayers(fetchedPlayers);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setPlayersLoading(false);
      }
    };

    fetchPlayers();
  }, [selectedTeam]);

  if (loading) return <p>Loading teams...</p>;

  return (
    <section className="bg-none">
      <h1 className="font-bold uppercase mb-2">Teams</h1>
      <Tabs value={selectedTeam || ""} onValueChange={setSelectedTeam} className="w-full">
        <TabsList className="md:gap-[2em] bg-foreground text-background">
          {teams.map((team: Team) => (
            <TabsTrigger key={team?._id} value={team?._id}>
              {team?.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {teams.map((team) => (
          <TabsContent key={team._id} value={team._id} className="p0 md:p-4">
            <p className="text-right mb-2">
              Team manager: <span className="font-semibold">{team.manager}</span>
            </p>
            {playersLoading ? (
              <p>Loading players...</p>
            ) : players.length > 0 ? (
              <PlayersTable players={players} />
            ) : (
              <p className="text-gray-500 text-sm mt-2">No players found.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
