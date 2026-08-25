"use client";

import { useEffect, useState } from "react";

import { getStargazerCount } from "@/shared/lib/github";

import { GitHubStars } from "./github-stars";

export const NavItemGithub = () => {
  const [stargazersCount, setStargazersCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    void getStargazerCount().then((count) => {
      if (!ignore) {
        setStargazersCount(count);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  return <GitHubStars stargazersCount={stargazersCount} />;
};
