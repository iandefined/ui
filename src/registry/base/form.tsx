"use client";

import type { AnyFormApi } from "@tanstack/react-form";
import { cn } from "cn";
import type { ComponentProps, FormEventHandler } from "react";

interface FormProps extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: Pick<AnyFormApi, "handleSubmit">;
}

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

      target.classList.remove("is-shaking");
      void target.offsetWidth;
      target.classList.add("is-shaking");
    });
}

function Form({ className, form, noValidate = true, ...props }: FormProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const formElement = event.currentTarget;
    event.preventDefault();
    void Promise.resolve(form.handleSubmit()).then(
      () => requestAnimationFrame(() => replayInvalidShakes(formElement)),
      () => requestAnimationFrame(() => replayInvalidShakes(formElement))
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
