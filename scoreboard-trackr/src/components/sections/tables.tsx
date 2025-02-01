"use client"; // Ensures it's a client component

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@/sanity/lib/client";
import { LEAGUES_QUERY, TEAMS_IN_LEAGUE_QUERY } from "@/sanity/lib/queries"; // You will define these queries
import { League, TeamInLeague } from "@/sanity/lib/types"; // Ensure types are correct for the new schema
import TeamTable from "../tables/teamTable";

const TablesSection = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teamsInLeague, setTeamsInLeague] = useState<TeamInLeague[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [teamsLoading, setTeamsLoading] = useState(false);

  // Fetch leagues on mount
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const fetchedLeagues: League[] = await client.fetch(LEAGUES_QUERY);
        setLeagues(fetchedLeagues);
        if (fetchedLeagues.length > 0) {
          setSelectedLeague(fetchedLeagues[0]._id); // Set first league as default
        }
      } catch (error) {
        console.error("Error fetching leagues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  // Fetch teams in the selected league when the selected league changes
  useEffect(() => {
    if (!selectedLeague) return;

    const fetchTeamsInLeague = async () => {
      setTeamsLoading(true);
      try {
        const fetchedTeamsInLeague: TeamInLeague[] = await client.fetch(TEAMS_IN_LEAGUE_QUERY, { leagueId: selectedLeague });
        setTeamsInLeague(fetchedTeamsInLeague);
      } catch (error) {
        console.error("Error fetching teams in league:", error);
      } finally {
        setTeamsLoading(false);
      }
    };

    fetchTeamsInLeague();
  }, [selectedLeague]);

  if (loading) return <p>Loading leagues...</p>;

  return (
    <section className="bg-none">
      <h1 className="font-bold uppercase mb-2">League Tables</h1>
      
      {/* Tabs for leagues */}
      <Tabs value={selectedLeague || ""} onValueChange={setSelectedLeague} className="w-full">
        <TabsList className="md:gap-[2em] bg-foreground text-background">
          {leagues.map((league) => (
            <TabsTrigger key={league._id} value={league._id}>
              {league.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content for each league */}
        {leagues.map((league) => (
          <TabsContent key={league._id} value={league._id} className="p-4">
            {teamsLoading ? (
              <p>Loading teams...</p>
            ) : teamsInLeague.length > 0 ? (
              <TeamTable teamsInLeague={teamsInLeague} />
            ) : (
              <p className="text-gray-500 text-sm mt-2">No teams found in this league.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default TablesSection;
