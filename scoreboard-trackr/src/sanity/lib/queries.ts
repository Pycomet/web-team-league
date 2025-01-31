import { defineQuery } from 'next-sanity';

export const TEAMS_QUERY = defineQuery(`*[
    _type == "team"
  ]|order(dateCreated desc)[0...12]{_id, name, manager, dateCreated}`);

