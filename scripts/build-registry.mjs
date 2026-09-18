import { spawn } from "node:child_process";
/* eslint-disable no-console */
import { mkdir, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputArgument = "./public/r";
const outDir = path.resolve(root, outputArgument);
const expectedOutDir = path.resolve(root, "public", "r");

if (
  path.normalize(path.resolve(outDir)) !==
  path.normalize(path.resolve(expectedOutDir))
) {
  throw new Error(`Refusing to remove unexpected registry output: ${outDir}`);
}

const source = JSON.parse(
  await readFile(path.join(root, "registry.json"), "utf8")
);
const expectedNames = source.items.map((item) => item.name);

if (expectedNames.length !== 56) {
  throw new Error(`Expected 56 registry items, found ${expectedNames.length}`);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const isWindows = process.platform === "win32";
const command = isWindows ? process.env.ComSpec || "cmd.exe" : "pnpm";
const commandArgs = isWindows
  ? [
      "/d",
      "/s",
      "/c",
      `pnpm exec shadcn build registry.json --output ${outputArgument}`,
    ]
  : ["exec", "shadcn", "build", "registry.json", "--output", outputArgument];
const exitCode = await new Promise((resolve, reject) => {
  const child = spawn(command, commandArgs, {
    cwd: root,
    stdio: "inherit",
  });

  child.on("error", reject);
  child.on("close", (code) => resolve(code ?? 1));
});

if (exitCode !== 0) {
  process.exit(exitCode);
}

const entries = await readdir(outDir, { withFileTypes: true });
const actualNames = entries.map((entry) => {
  if (!entry.isFile()) {
    throw new Error(`Unexpected directory in registry output: ${entry.name}`);
  }

  return entry.name;
});
const expectedFiles = [
  "registry.json",
  ...expectedNames.map((name) => `${name}.json`),
];

const compareSets = (left, right) =>
  left.length === right.length &&
  left.every((value, index) => value === right[index]);

const sortedActual = [...actualNames].sort();
const sortedExpected = [...expectedFiles].sort();
if (!compareSets(sortedActual, sortedExpected)) {
  throw new Error(
    `Registry output mismatch. Expected ${sortedExpected.join(", ")}; found ${sortedActual.join(", ")}`
  );
}

const generatedIndex = JSON.parse(
  await readFile(path.join(outDir, "registry.json"), "utf8")
);

if (generatedIndex.name !== source.name) {
  throw new Error(
    `Generated registry name ${generatedIndex.name} does not match source ${source.name}`
  );
}

if (generatedIndex.items?.length !== expectedNames.length) {
  throw new Error("Generated registry item count does not match registry.json");
}

for (const item of generatedIndex.items ?? []) {
  for (const file of item.files ?? []) {
    if (Object.hasOwn(file, "content")) {
      throw new Error(
        `Generated registry index contains file content: ${item.name}`
      );
    }
  }
}

const generatedItems = new Map(
  await Promise.all(
    expectedNames.map(async (name) => {
      const item = JSON.parse(
        await readFile(path.join(outDir, `${name}.json`), "utf8")
      );
      return [name, item];
    })
  )
);
const calendarDate = generatedItems
  .get("calendar")
  ?.files?.find((file) => file.path === "src/shared/lib/date.ts")?.content;
const dateInputDate = generatedItems
  .get("date-input")
  ?.files?.find((file) => file.path === "src/shared/lib/date.ts")?.content;

if (calendarDate === undefined || dateInputDate === undefined) {
  throw new Error(
    "calendar and date-input must both include src/shared/lib/date.ts"
  );
}

if (calendarDate !== dateInputDate) {
  throw new Error("calendar and date-input generated lib/date.ts files differ");
}

console.log(
  `Built and verified ${expectedNames.length} registry items in ${outDir}`
);
