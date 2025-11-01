# Mastra Weather Agent

This project is a template for building AI-powered agents and workflows using the Mastra framework. It includes a debug workflow for error analysis and can be extended with custom agents, tools, and scorers.

## Features

- **Debug Workflow**: Automatically searches StackOverflow for error messages and provides explanations and fixes.
- **Custom Agents**: Includes a debug agent for error analysis.
- **Scorers**: Ready to enable weather-related scorers for tool appropriateness, completeness, and translation.
- **Flexible Storage**: Uses in-memory storage by default, with options for persistent storage.
- **Observability**: Built-in tracing and logging for AI workflows.

# Buggify — Mastra Debug Agent

A small demo agent and workflow built with the Mastra framework that helps developers debug runtime errors by searching StackOverflow and producing a concise, user-friendly explanation and suggested fixes.

## What this agent does

- Accepts an error message as input.
- Searches StackOverflow for relevant questions/answers.
- Uses a debug agent (an LLM-backed agent) to:
  - Explain the error in simple terms.
  - Suggest likely causes and practical fixes.
  - Provide 1–3 helpful StackOverflow links under a "Learn More" section.

This is implemented as a Mastra workflow (`debugWorkflow`) that wires together a StackOverflow search tool and an LLM agent for synthesis.

## Key files

- `src/mastra/index.ts` — Mastra initialization and registration of workflows, agents, storage, and observability.
- `src/mastra/workflows/debug-workflow.ts` — The workflow that runs the StackOverflow search and asks the debug agent to produce the explanation.
- `src/mastra/agents/debug-agent.ts` — Agent implementation used to synthesize explanations.
- `src/mastra/tools/debug-tool.ts` — Tool used to query StackOverflow.
- `src/mastra/scorers/weather-scorer.ts` — Example scorers (optional; not required to run the debug workflow).

## Quick start (Windows PowerShell)

1. Install dependencies:

```powershell
npm install
```

2. Run the project:

```powershell
npm start
```

Notes:

- `npm start` should be configured in `package.json` to run your app (for example: `node ./dist/index.js` or a dev runner). If no start script exists, run the entry directly with Node or your build tool.
- During development you may need to compile TypeScript first (e.g., `npm run build` or use `ts-node`).

## Triggering the debug workflow

The workflow expects a single input: an error message string. How you trigger it depends on how your app exposes the workflow. For quick local testing, create a tiny script that imports the Mastra instance and calls the workflow programmatically. Example (pseudo):

```ts
import { mastra } from "./src/mastra";

async function run() {
  const result = await mastra.runWorkflow("debug-workflow", {
    errorMessage: "TypeError: Cannot read property x of undefined",
  });
  console.log(result);
}

run();
```

Adjust this snippet to match your project's runtime API (see `Mastra` usage in `src/mastra/index.ts`).

## Configuration tips

- Scorers: The project includes example scorers in `src/mastra/scorers/`. Uncomment and register them in `index.ts` if you want Mastra to score tool calls and outputs.
- Storage: By default the project uses an in-memory `LibSQLStore`. To persist data, update the `url` property in `index.ts` to a file path (for example `file:./mastra.db`).
- Logging & Observability: `PinoLogger` and Mastra observability are already enabled in `index.ts`. Adjust `level` and `observability.default.enabled` as needed.

## Development checklist

- [x] Install dependencies
- [x] Build / run the project
- [ ] Add persistent storage (optional)
- [ ] Add more tools/agents or adapt the workflow for additional types of debugging

## Troubleshooting

- If the TypeScript compiler reports schema mismatches while editing workflows, ensure each step's `outputSchema` matches the next step's `inputSchema` (Mastra enforces typed chaining).
- If the agent cannot be found at runtime, confirm it is registered in `src/mastra/index.ts`.

## License

MIT

## Credits

Built with Mastra
