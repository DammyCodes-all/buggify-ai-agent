import { createTool } from "@mastra/core";
import z from "zod";
export const searchStackOverflow = async (query: string) => {
  let url = `https://api.stackexchange.com/2.3/similar?order=desc&sort=relevance&title=${encodeURIComponent(
    query
  )}&site=stackoverflow`;

  let res = await fetch(url);
  let data = await res.json();

  if (!data.items?.length) {
    // fallback to advanced search
    res = await fetch(
      `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&title=${encodeURIComponent(
        query
      )}&site=stackoverflow`
    );
    data = await res.json();
  }
  console.log(data.items.map((q: any) => q.link));
  return data.items.slice(0, 3).map((q: any) => ({
    title: q.title,
    link: q.link,
    score: q.score,
  }));
};

export const stackOverFlowTool = createTool({
  id: "searchStackOverflow",
  description:
    "Search StackOverflow for relevant questions and answers related to coding errors.",
  inputSchema: z
    .string()
    .describe("The error message or coding issue to search for."),
  outputSchema: z.array(
    z.object({
      title: z.string(),
      link: z.string().url(),
      score: z.number(),
    })
  ),
  execute: async ({ context }) => {
    return await searchStackOverflow(context);
  },
});
