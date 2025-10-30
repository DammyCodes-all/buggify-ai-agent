import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { debugAgent } from "../agents/debug-agent";
import { searchStackOverflow } from "../tools/debug-tool";

const errorInputSchema = z.object({
  errorMessage: z.string().describe("The error message to debug"),
});

const stackOverflowStep = createStep({
  id: "search-stackoverflow",
  description: "Searches StackOverflow for related questions",
  inputSchema: errorInputSchema,
  outputSchema: z.object({
    errorMessage: z.string(),
    stackOverflowResults: z.array(
      z.object({
        title: z.string(),
        link: z.string().url(),
        score: z.number(),
      })
    ),
  }),
  execute: async ({ inputData }) => {
    return await searchStackOverflow(inputData.errorMessage);
  },
});

const explainErrorStep = createStep({
  id: "explain-error",
  description: "Explains the error and suggests fixes",
  inputSchema: z.object({
    errorMessage: z.string(),
    stackOverflowResults: z.array(
      z.object({
        title: z.string(),
        link: z.string().url(),
        score: z.number(),
      })
    ),
  }),
  outputSchema: z.object({
    explanation: z.string(),
  }),
  execute: async ({ inputData, mastra }) => {
    const agent = mastra?.getAgent("Buggify");
    if (!agent) throw new Error("Debug agent not found");

    const prompt = `
      Error: ${inputData.errorMessage}

      StackOverflow results:
      ${inputData.stackOverflowResults
        .map((q, i) => `${i + 1}. [${q.title}](${q.link}) (Score: ${q.score})`)
        .join("\n")}

      Please:
      - Explain the error in simple terms.
      - Suggest possible causes and practical fixes.
      - List 1–3 helpful StackOverflow links under a 'Learn More' section.
      - Format your response in Markdown with relevant emojis.
    `;

    const response = await agent.stream([{ role: "user", content: prompt }]);

    let explanation = "";
    for await (const chunk of response.textStream) {
      explanation += chunk;
    }
    return { explanation };
  },
});

const debugWorkflow = createWorkflow({
  id: "debug-workflow",
  inputSchema: errorInputSchema,
  outputSchema: z.object({
    explanation: z.string(),
  }),
})
  .then(stackOverflowStep)
  .then(explainErrorStep);

debugWorkflow.commit();

export { debugWorkflow };
