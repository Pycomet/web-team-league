"use client";

import { useState } from "react";
import { FaBasketball, FaTable, FaPeopleGroup } from "react-icons/fa6";
import TeamsSection from "./sections/teams";
import TablesSection from "./sections/tables";
import FixtureSection from "./sections/fixtures";

const mainMenu = [
  { label: "Fixtures", icon: <FaBasketball className="my-auto" /> },
  { label: "Tables", icon: <FaTable className="my-auto" /> },
  { label: "Teams", icon: <FaPeopleGroup className="my-auto" /> },
];

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState(mainMenu[0].label);

  return (
    <div className="flex flex-col md:flex-row gap-4 min-h-fit">
      {/* Sidebar Menu */}
      <div className="w-full md:w-[25%] flex md:flex-col gap-2 p-2 bg-foreground text-background md:h-[70vh] md:py-6">
        <br />
        {mainMenu.map((tab) => (
          <div
            key={tab.label}
            className={`flex font-semibold text-xl w-auto gap-[1em] p-4 rounded-md cursor-pointer transition ${
            selectedTab === tab.label ? "bg-[#E1340E] text-background" : "hover:bg-[#E1340E] hover:text-[#E1340E] bg-opacity-20 hover:bg-opacity-20"
            }`}
            onClick={() => setSelectedTab(tab.label)}
          >
            {tab.icon}
            <p className="hidden md:block">{tab.label}</p>
          </div>
        ))}
      </div>

      {/* Dynamic Content Area */}
      <div className="w-full overflow-x-auto p-2 md:p-4">
        {selectedTab === "Fixtures" && <FixtureSection selectedLeagueId={"e39486b7-6516-4674-adc3-e890459b1091"} />}
        {selectedTab === "Tables" && <TablesSection />}
        {selectedTab === "Teams" && <TeamsSection />}
      </div>
    </div>
  );
}
