import type { SanityDocument } from "@sanity/client";
import { Link } from "react-router";
import { client } from "~/sanity/client";
import type { Route } from "./+types/home";

const TEAMS_QUERY = `*[
  _type == "team"
]|order(dateCreated desc)[0...12]{_id, name, manager, dateCreated}`;

export async function loader() {
  return { teams: await client.fetch<SanityDocument[]>(TEAMS_QUERY) };
}

export default function IndexPage({ loaderData }: Route.ComponentProps) {
  const { teams } = loaderData;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Teams</h1>
      <ul className="flex flex-col gap-y-4">
        {teams.map((team) => (
          <li className="hover:underline" key={team._id}>
            <Link to={`/${team.logoUrl}`}>
              <h2 className="text-xl font-semibold">{team.name}</h2>
              <p>{new Date(team.dateCreated).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}