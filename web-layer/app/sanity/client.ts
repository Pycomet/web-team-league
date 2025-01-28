import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "h8qmltcs",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});