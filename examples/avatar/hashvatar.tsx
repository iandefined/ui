"use client";

import { Hashvatar } from "hashvatar/react";
import { DownloadIcon } from "lucide-react";
import * as React from "react";

import { Avatar } from "@/registry/base/avatar";
import { Button } from "@/registry/base/button";
import { Input } from "@/registry/base/input";

const usernameInputId = "hashvatar-username";

export default function AvatarHashvatarDemo() {
  const [username, setUsername] = React.useState("sophia.martinez");
  const avatarRef = React.useRef<HTMLDivElement>(null);
  const hash = username.trim() || "anonymous";

  const downloadAvatar = () => {
    const canvas = avatarRef.current?.querySelector("canvas");
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${hash.replaceAll(/[^a-z0-9]+/gi, "-")}-avatar.png`;
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <div className="flex items-center gap-4">
        <div ref={avatarRef}>
          <Avatar
            className="size-20"
            aria-label={`Generated avatar for ${hash}`}
          >
            <Hashvatar
              hash={hash}
              mode="dither"
              size={160}
              className="size-full"
            />
          </Avatar>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{hash}</p>
          <p className="text-muted-foreground text-sm">
            Deterministic dither avatar
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor={usernameInputId}>
          Username
        </label>
        <Input
          id={usernameInputId}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter a username"
        />
      </div>

      <Button className="w-fit" variant="outline" onClick={downloadAvatar}>
        <DownloadIcon aria-hidden="true" />
        Download PNG
      </Button>
    </div>
  );
}
