import { BotIcon, CodeIcon, SparklesIcon } from "lucide-react";

import { Label } from "@/registry/base/label";
import { Radio, RadioGroup } from "@/registry/base/radio-group";

const models = [
  {
    description: "Built for long coding tasks and large project context.",
    icon: CodeIcon,
    name: "OpenAI GPT-5.1 Codex Max",
    value: "openai-gpt-5-1-codex-max",
  },
  {
    description: "A fast daily model for lightweight iteration.",
    icon: SparklesIcon,
    name: "Google Gemini 3 Flash",
    value: "google-gemini-3-flash",
  },
  {
    description: "A balanced option for writing, analysis, and coding.",
    icon: BotIcon,
    name: "Anthropic Claude 4.5 Sonnet",
    value: "anthropic-claude-4-5-sonnet",
  },
];

export default function RadioGroupCustomLayoutDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col">
        <div className="text-lg font-medium">AI Model Selection</div>
        <p className="text-sm text-muted-foreground">
          Choose your preferred AI model
        </p>
      </div>

      <RadioGroup className="w-full" defaultValue={models[0].value}>
        {models.map((model) => {
          const Icon = model.icon;

          return (
            <Label
              className="relative flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 shadow-xs transition-[border-color,box-shadow] duration-100 ease-linear has-data-checked:border-primary has-data-checked:ring-1 has-data-checked:ring-primary"
              key={model.value}
            >
              <Icon className="size-5 shrink-0 text-muted-foreground" />
              <span className="flex flex-col gap-1">
                <span className="font-medium">{model.name}</span>
                <span className="text-sm text-muted-foreground">
                  {model.description}
                </span>
              </span>
              <span className="absolute -right-2.5 -top-3 flex items-center justify-center rounded-full bg-card p-0.5">
                <Radio value={model.value} />
              </span>
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
