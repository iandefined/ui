"use client";

import * as React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/base/pagination";

export default function PaginationControlledDemo() {
  const [currentPage, setCurrentPage] = React.useState(2);
  const totalPages = 5;

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              isDisabled={currentPage <= 1}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage((p) => p - 1);
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              isDisabled={currentPage >= totalPages}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage((p) => p + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p className="text-muted-foreground text-xs">
        Current page:{" "}
        <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
        {totalPages}
      </p>
    </div>
  );
}
