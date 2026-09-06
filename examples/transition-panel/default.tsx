"use client";

import * as React from "react";

import { Button } from "@/registry/base/button";
import { Input } from "@/registry/base/input";
import {
  TransitionPanel,
  TransitionPanelView,
} from "@/registry/base/transition-panel";

type Step = "account" | "verify" | "complete";

export default function TransitionPanelDefaultDemo() {
  const [step, setStep] = React.useState<Step>("account");

  return (
    <div className="w-full max-w-sm">
      <TransitionPanel
        activeKey={step}
        className="rounded-xl border border-border bg-card text-card-foreground shadow-sm"
      >
        <TransitionPanelView viewKey="account" className="space-y-4 p-5">
          <div className="space-y-1">
            <h3 className="font-semibold">Create your account</h3>
            <p className="text-sm text-muted-foreground">
              Enter your email to get started.
            </p>
          </div>
          <Input type="email" placeholder="you@example.com" />
          <Button className="w-full" onClick={() => setStep("verify")}>
            Continue
          </Button>
        </TransitionPanelView>

        <TransitionPanelView viewKey="verify" className="space-y-4 p-5">
          <div className="space-y-1">
            <h3 className="font-semibold">Check your email</h3>
            <p className="text-sm text-muted-foreground">
              Enter the verification code we sent you.
            </p>
          </div>
          <Input inputMode="numeric" placeholder="123456" />
          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => setStep("account")}
            >
              Back
            </Button>
            <Button className="flex-1" onClick={() => setStep("complete")}>
              Verify
            </Button>
          </div>
        </TransitionPanelView>

        <TransitionPanelView viewKey="complete" className="space-y-4 p-5">
          <div className="space-y-1">
            <h3 className="font-semibold">You are all set</h3>
            <p className="text-sm text-muted-foreground">
              Your account is ready to use.
            </p>
          </div>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => setStep("account")}
          >
            Start over
          </Button>
        </TransitionPanelView>
      </TransitionPanel>
    </div>
  );
}
