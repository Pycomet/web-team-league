import { defineQuery } from 'next-sanity';

export const TEAMS_QUERY = defineQuery(`*[
    _type == "team"
  ]|order(dateCreated desc)[0...12]{_id, name, manager, dateCreated}`);

export const PLAYERS_BY_TEAM_QUERY = defineQuery(`
  *[_type == "player" && team._ref == $teamId]{
    _id, name, position, goals, assists, cards
  }
`);


export const PLAYERS_QUERY = defineQuery(`*[
  _type == "player"
]{
  _id, 
  name, 
  position, 
  goals, 
  assists, 
  cards, 
  team->{_id, name}
}`);


export const LEAGUES_QUERY = defineQuery(`
  *[_type == "league"]{
    _id,
    name
  }
`);

export const TEAMS_IN_LEAGUE_QUERY = defineQuery(`
  *[_type == "teamInLeague" && league._ref == $leagueId]{
    _id,
    points,
    matches,
    wins,
    losses,
    draws,
    goalDifference,
    team->{
      _id,
      name
    }
  }
`);

export const FIXTURES_QUERY = `
  *[_type == "fixture" && league._ref == $leagueId]{
    _id,
    homeTeam->{
      name
    },
    awayTeam->{
      name
    },
    matchDate,
    homeScore,
    awayScore,
    status
  }
`;


export const EVENTS_QUERY = `
  *[_type == "event" && fixture._ref == $fixtureId] | order(eventTime asc) {
    _id,
    eventType,
    eventTime,
    "player": player->{
      _id,
      name
    },
    "team": team->{
      _id,
      name
    }
  }
`;
