"use client"; // Ensures it's a client component
import { JSX, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@/sanity/lib/client";
import { EVENTS_QUERY, FIXTURES_QUERY } from "@/sanity/lib/queries";
import { Event, Fixture } from "@/sanity/lib/types";
import { FaFutbol, FaPause, FaFlagCheckered } from 'react-icons/fa';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useMemo } from "react";

const eventIcons: { [key: string]: JSX.Element } = {
    'Goal': <FaFutbol className="text-green-600" />,
    'Yellow Card': <p className="text-yellow-500">🟨</p>,
    'Red Card': <p className="text-red-600">🟥</p>,
    'Half-Time': <FaPause className="text-gray-600" />,
    'Full-Time': <FaFlagCheckered className="text-blue-600" />,
  };

// Function to generate a random pastel color
const getRandomColor = () => {
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Function to get initials from a team name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const FixtureRow: React.FC<{ fixture: Fixture }> = ({ fixture }) => {
    const homeTeamColor = useMemo(() => getRandomColor(), [(fixture?.homeTeam as unknown as { name: string} )?.name]);
    const awayTeamColor = useMemo(() => getRandomColor(), [(fixture?.awayTeam as unknown as { name: string} )?.name]);
  
    const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(false);
  
    const handleFixtureClick = async (fixture: Fixture) => {
      if (fixture === selectedFixture) {
        setSelectedFixture(null);
        setEvents([]);
      } else {
        setSelectedFixture(fixture);
        setLoadingEvents(true);
        try {
          const fetchedEvents = await client.fetch(EVENTS_QUERY, { fixtureId: fixture._id });
          setEvents(fetchedEvents);
        } catch (error) {
          console.error("Error fetching events:", error);
        } finally {
          setLoadingEvents(false);
        }
      }
    };
  
    return (
      <>
        <div
          onClick={() => handleFixtureClick(fixture)}
          className="flex flex-row h-fit justify-between my-[1em] text-sm align-middle text-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
        >
          {/* Home Team */}
          <div className="md:w-[20%] flex flex-col my-auto items-center">
            <Avatar className="hidden md:block">
              <AvatarImage src={(fixture.homeTeam as unknown as { logoUrl: string})?.logoUrl} alt={(fixture?.homeTeam as unknown as { name: string})?.name} />
              <AvatarFallback className={`${homeTeamColor} text-white font-bold`}>
                {getInitials((fixture.homeTeam as unknown as { name: string})?.name)}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-lg">{(fixture?.homeTeam as unknown as { name: string})?.name}</span>
          </div>
  
          {/* Home Score */}
          <div className="flex text-4xl flex-col my-auto">{fixture?.homeScore}</div>
  
          {/* VS and Date */}
          <div className="md:w-[20%] flex flex-col my-auto">
            <span className="text-xl font-bold">VS</span>
            <span className="hidden md:block">{new Date(fixture?.matchDate as string).toDateString()}</span>
            <span className="hidden md:block text-xs text-green">({fixture?.status})</span>
          </div>
  
          {/* Away Score */}
          <div className="flex text-4xl flex-col my-auto">{fixture.awayScore}</div>
  
          {/* Away Team */}
          <div className="md:w-[20%] flex flex-col my-auto items-center">
            <Avatar className="hidden md:block">
              <AvatarImage src={(fixture.awayTeam as unknown as { logoUrl: string})?.logoUrl} alt={(fixture?.awayTeam as unknown as { name: string})?.name} />
              <AvatarFallback className={`${awayTeamColor} text-white font-bold`}>
                {getInitials((fixture.awayTeam as unknown as { name: string})?.name)}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-lg">{(fixture.awayTeam as unknown as { name: string})?.name}</span>
          </div>
        </div>
  
        {fixture === selectedFixture && (
          <div className="p-4 ">
            {/* Events Section */}
            <h3 className=" font-bold">Match Events</h3>
            {loadingEvents ? (
              <p>Loading events...</p>
            ) : events.length > 0 ? (
              <ul className="mt-2">
                {events.map((event) => (
                  <li key={event._id} className="text-sm py-1 border-b justify-between flex flex-col md:flex-row">
                    <span className="font-semibold">{new Date(event?.eventTime as string).toLocaleTimeString()}&apos;</span> <span className="flex gap-2">{eventIcons[event?.eventType as string]} {event.eventType} ({(event.player as unknown as { name: string})?.name} - {(event.team as unknown as { name: string})?.name})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No events recorded.</p>
            )}
          </div>
        )}
      </>
    );
  };
// FixturesTable component to avoid repetition
const FixtureCards: React.FC<{ fixtures: Fixture[] }> = ({ fixtures }) => {

    return (
    <Card className="border border-gray-300 shadow-md rounded-lg mt-4 max-h-[55vh] overflow-auto">
      <CardContent>
        {fixtures.length > 0 ? (
          fixtures.map((fixture: Fixture, index) => (
            <>
                <FixtureRow fixture={fixture} key={index} />
                < hr />
            </>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No fixtures available.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface FixtureSectionProps {
  selectedLeagueId: string;
}

const FixtureSection: React.FC<FixtureSectionProps> = ({ selectedLeagueId }) => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  
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

  const today = new Date();
  const todayFixtures = fixtures.filter(fixture => {
    const matchDate = new Date(fixture?.matchDate as string);
    return matchDate.toDateString() === today.toDateString();
  });

  const upcomingFixtures = fixtures.filter(fixture => new Date(fixture?.matchDate as string) > today);
  const pastFixtures = fixtures.filter(fixture => new Date(fixture?.matchDate as string) < today);

  if (loading) return <p>Loading fixtures...</p>;

  return (
    <section className="bg-none">
      <h2 className="font-bold uppercase">Match Fixtures</h2>
      <hr className="my-2" />
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="md:gap-[2em] bg-foreground text-background">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <br />

        {/* Today's Fixtures Tab */}
        <TabsContent value="today">
          <FixtureCards fixtures={todayFixtures} />
        </TabsContent>

        {/* Upcoming Fixtures Tab */}
        <TabsContent value="upcoming">
          <FixtureCards fixtures={upcomingFixtures} />
        </TabsContent>

        {/* Past Fixtures Tab */}
        <TabsContent value="past">
          <FixtureCards fixtures={pastFixtures} />
        </TabsContent>
      </Tabs>

    </section>
  );
};

export default FixtureSection;
