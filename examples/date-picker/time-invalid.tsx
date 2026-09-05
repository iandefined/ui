"use client";

import { useState } from "react";

import { Button } from "@/registry/base/button";
import {
  DatePicker,
  DatePickerContent,
  DatePickerTimer,
  DatePickerTrigger,
} from "@/registry/base/date-picker";
import {
  Field,
  FieldError,
  FieldErrorSlot,
  FieldLabel,
} from "@/registry/base/field";

export default function DatePickerTimeInvalid() {
  const [value, setValue] = useState<Date[]>([]);
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isDateInvalid = value.length === 0;
  const isTimeInvalid = !time;

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!isDateInvalid && !isTimeInvalid) {
          setSubmitted(true);
        }
      }}
    >
      <Field className="w-full space-y-2" invalid={isDateInvalid}>
        <DatePicker
          className="w-full max-w-sm"
          invalid={isDateInvalid}
          onValueChange={(details) => {
            setValue(details.value);
            setSubmitted(false);
          }}
          value={value}
        >
          <FieldLabel htmlFor="appointment-date-invalid">Date</FieldLabel>
          <DatePickerTrigger
            id="appointment-date-invalid"
            aria-describedby={
              isDateInvalid ? "invalid-appointment-date-message" : undefined
            }
            className="w-full justify-start"
            invalid={isDateInvalid}
          />
          <DatePickerContent />
        </DatePicker>
        <FieldErrorSlot>
          <FieldError
            id="invalid-appointment-date-message"
            match={isDateInvalid}
          >
            Select an appointment date.
          </FieldError>
        </FieldErrorSlot>
      </Field>

      <Field className="w-full space-y-2" invalid={isTimeInvalid}>
        <FieldLabel htmlFor="appointment-time-invalid">Time</FieldLabel>
        <div className="w-full">
          <DatePickerTimer
            aria-describedby={
              isTimeInvalid ? "invalid-appointment-time-message" : undefined
            }
            className="w-full justify-start"
            id="appointment-time-invalid"
            invalid={isTimeInvalid}
            onChange={(event) => {
              setTime(event.target.value);
              setSubmitted(false);
            }}
            value={time}
          />
        </div>
        <FieldErrorSlot>
          <FieldError
            id="invalid-appointment-time-message"
            match={isTimeInvalid}
          >
            Select an appointment time.
          </FieldError>
        </FieldErrorSlot>
      </Field>

      <div className="flex flex-col gap-2 pt-1">
        {(!isDateInvalid || !isTimeInvalid) && (
          <Button
            className="w-full"
            onClick={() => {
              setValue([]);
              setTime("");
              setSubmitted(false);
            }}
            type="button"
            variant="outline"
          >
            Reset
          </Button>
        )}
        <Button
          className="w-full"
          disabled={isDateInvalid || isTimeInvalid}
          type="submit"
        >
          Book appointment
        </Button>
      </div>

      {submitted && value[0] && time && (
        <output className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
          Appointment booked for{" "}
          {value[0].toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          at {time}.
        </output>
      )}
    </form>
  );
}
