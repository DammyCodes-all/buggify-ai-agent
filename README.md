# Mastra Weather Agent

This project is a template for building AI-powered agents and workflows using the Mastra framework. It includes a debug workflow for error analysis and can be extended with custom agents, tools, and scorers.

## Features

- **Debug Workflow**: Automatically searches StackOverflow for error messages and provides explanations and fixes.
- **Custom Agents**: Includes a debug agent for error analysis.
- **Scorers**: Ready to enable weather-related scorers for tool appropriateness, completeness, and translation.
- **Flexible Storage**: Uses in-memory storage by default, with options for persistent storage.
- **Observability**: Built-in tracing and logging for AI workflows.

## Project Structure

```
src/mastra/
  index.ts                # Main entry point, Mastra initialization
  agents/
    debug-agent.ts        # Debug agent definition
  scorers/
    weather-scorer.ts     # Scorer implementations
  tools/
    debug-tool.ts         # Tool for StackOverflow search
  workflows/
    debug-workflow.ts     # Debug workflow definition
    weather-workflow.ts   # (Optional) Weather workflow
```

## Getting Started

1. **Install dependencies**:
   ```powershell
   npm install
   ```
2. **Run the project**:
   ```powershell
   npm start
   ```
3. **Configure storage**:
   - By default, uses in-memory storage.
   - To persist data, change the `url` in `LibSQLStore` to a file path (e.g., `file:../mastra.db`).

## Usage

- The debug workflow can be triggered with an error message to get StackOverflow search results and a detailed explanation.
- Agents and scorers can be customized or extended for your use case.

## Extending

- Add new agents in `src/mastra/agents/`
- Add new workflows in `src/mastra/workflows/`
- Add new tools in `src/mastra/tools/`
- Add or enable scorers in `src/mastra/scorers/` and register them in `index.ts`

## License

MIT

## Credits

- Built with [Mastra](https://mastra.ai)
