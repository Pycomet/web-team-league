import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: "h8qmltcs",
  dataset: "production",
  apiVersion: "2024-07-11",
  useCdn: true,
});