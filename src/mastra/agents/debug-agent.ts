import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { stackOverFlowTool } from "../tools/debug-tool";
// import { scorers } from "../scorers/weather-scorer";

export const debugAgent = new Agent({
  name: "Buggify",
  instructions: `
    You are a friendly developer assistant who explains coding errors clearly.

    When given an error message:
    - Search StackOverflow for related questions using the stackOverFlowTool by passing the error message as input.
    - Explain the error in simple, easy-to-understand language.
    - Suggest possible causes and practical fixes.
    - Share 1–3 helpful StackOverflow links under a 'Learn More' section.

    Format your response using Markdown and relevant emojis for clarity and engagement.
  `,
  model: "google/gemini-2.5-flash-lite",
  tools: { stackOverFlowTool },
  // scorers: {
  //   toolCallAppropriateness: {
  //     scorer: scorers.toolCallAppropriatenessScorer,
  //     sampling: {
  //       type: "ratio",
  //       rate: 1,
  //     },
  //   },
  //   completeness: {
  //     scorer: scorers.completenessScorer,
  //     sampling: {
  //       type: "ratio",
  //       rate: 1,
  //     },
  //   },
  //   translation: {
  //     scorer: scorers.translationScorer,
  //     sampling: {
  //       type: "ratio",
  //       rate: 1,
  //     },
  //   },
  // },
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
