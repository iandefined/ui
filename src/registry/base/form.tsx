"use client";

import type { AnyFormApi } from "@tanstack/react-form";
import { cn } from "cn";
import type { ComponentProps, FormEventHandler } from "react";

interface FormProps extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: Pick<AnyFormApi, "handleSubmit">;
}

function Form({ className, form, noValidate = true, ...props }: FormProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    void form.handleSubmit();
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
