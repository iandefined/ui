"use client";

import { HeartIcon, MessageSquareIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/registry/base/button";
import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base/drawer";
import { Input } from "@/registry/base/input";

const comments = [
  {
    id: 1,
    user: "Alex Chen",
    avatar: "AC",
    text: "This is absolutely stunning! The attention to detail is incredible.",
    time: "2h",
    likes: 24,
  },
  {
    id: 2,
    user: "Maria Garcia",
    avatar: "MG",
    text: "Love this so much! 😍",
    time: "1h",
    likes: 8,
  },
  {
    id: 3,
    user: "James Wilson",
    avatar: "JW",
    text: "Where can I get this? Asking for a friend 👀",
    time: "45m",
    likes: 12,
  },
  {
    id: 4,
    user: "Sophie Turner",
    avatar: "ST",
    text: "The colors are perfect together!",
    time: "30m",
    likes: 5,
  },
  {
    id: 5,
    user: "David Kim",
    avatar: "DK",
    text: "Been following your work for a while, this might be your best yet.",
    time: "15m",
    likes: 18,
  },
  {
    id: 6,
    user: "Emma Roberts",
    avatar: "ER",
    text: "Shared this with all my friends!",
    time: "10m",
    likes: 3,
  },
  {
    id: 7,
    user: "Chris Johnson",
    avatar: "CJ",
    text: "This is inspiring me to start creating again.",
    time: "5m",
    likes: 7,
  },
];

export default function DrawerStickyFooterDemo() {
  const [newComment, setNewComment] = React.useState("");

  return (
    <Drawer defaultSnapPoint={0.4} snapPoints={[0.4, 1]} snapToSequentialPoints>
      <DrawerTrigger render={<Button variant="outline" />}>
        <span className="flex items-center gap-2">
          <MessageSquareIcon className="size-4" />
          {comments.length} Comments
        </span>
      </DrawerTrigger>
      <DrawerPopup showBar className="max-w-2xl">
        <DrawerHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <DrawerTitle>Comments</DrawerTitle>
            <span className="text-muted-foreground text-sm">
              {comments.length} comments
            </span>
          </div>
        </DrawerHeader>
        <DrawerPanel scrollFade className="py-4!">
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                  {comment.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{comment.user}</span>
                    <span className="text-muted-foreground text-xs">
                      {comment.time}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{comment.text}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <button
                      type="button"
                      className="text-muted-foreground flex items-center gap-1 text-xs hover:text-red-500"
                    >
                      <HeartIcon className="size-3.5" />
                      <span className="tabular-nums">{comment.likes}</span>
                    </button>
                    <button
                      type="button"
                      className="text-muted-foreground text-xs hover:underline"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DrawerPanel>
        <DrawerFooter className="border-t py-4 sm:flex-row">
          <form
            className="flex w-full gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!newComment.trim()) return;
              setNewComment("");
            }}
          >
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!newComment.trim()}>
              Post
            </Button>
          </form>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
