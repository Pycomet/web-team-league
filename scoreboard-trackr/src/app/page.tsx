import Dashboard from "@/components/panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-none">
        <Card className="text-left min-h-[70dvh] w-[80dvw] md:w-[50dvw] z-0 border-none p-0">
          <CardHeader className="p-0">
            <CardTitle className="flex p-[2rem] justify-between w-full rounded-t-lg bg-[#E1340E] text-background">
              <h1 className="font-bold font-mono">ScoreboardTrackr</h1>
              <p className="hidden md:block">www.scoreboardtrackr.com</p>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 bg-none">
            <Dashboard />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
