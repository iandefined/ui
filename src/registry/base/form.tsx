"use client";

import type { AnyFormApi } from "@tanstack/react-form";
import { cn } from "cn";
import type { ComponentProps, FormEventHandler } from "react";

interface FormProps extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: Pick<AnyFormApi, "handleSubmit">;
}

const shakeCleanupTimers = new WeakMap<HTMLElement, number>();

function replayInvalidShakes(formElement: HTMLFormElement) {
  const invalidSelector = '[aria-invalid="true"], [data-invalid]';

  formElement
    .querySelectorAll<HTMLElement>('[data-invalid-shake="owner"]')
    .forEach((target) => {
      if (
        !target.matches(invalidSelector) &&
        !target.querySelector(invalidSelector)
      ) {
        return;
      }

      const cleanupTimer = shakeCleanupTimers.get(target);
      if (cleanupTimer !== undefined) {
        window.clearTimeout(cleanupTimer);
      }

      target.classList.remove("is-shaking");
      void target.offsetWidth;
      target.classList.add("is-shaking");
      shakeCleanupTimers.set(
        target,
        window.setTimeout(() => {
          target.classList.remove("is-shaking");
          shakeCleanupTimers.delete(target);
        }, 300)
      );
    });
}

function focusFirstInvalidControl(formElement: HTMLFormElement) {
  const firstInvalid = formElement.querySelector<HTMLElement>(
    '[aria-invalid="true"], [data-invalid]'
  );

  if (!firstInvalid) {
    return;
  }

  const focusableSelector =
    'input:not([type="hidden"]), textarea, select, button, [tabindex]:not([tabindex="-1"])';
  const control = firstInvalid.matches(focusableSelector)
    ? firstInvalid
    : firstInvalid.querySelector<HTMLElement>(focusableSelector);

  control?.focus();
}

function handleInvalidSubmission(formElement: HTMLFormElement) {
  replayInvalidShakes(formElement);
  focusFirstInvalidControl(formElement);
}

function Form({ className, form, noValidate = true, ...props }: FormProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const formElement = event.currentTarget;
    event.preventDefault();
    void Promise.resolve(form.handleSubmit()).then(
      () => requestAnimationFrame(() => handleInvalidSubmission(formElement)),
      () => requestAnimationFrame(() => handleInvalidSubmission(formElement))
    );
  };

  return (
    <form
      className={cn(className)}
      data-slot="form"
      noValidate={noValidate}
      onSubmit={handleSubmit}
      {...props}
    />
  );
}

export { Form };
export type { FormProps };
