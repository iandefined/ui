import {
  ArchiveIcon,
  EditIcon,
  EllipsisIcon,
  FilesIcon,
  FilmIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react";

import { Button } from "@/registry/base/button";
import { ButtonGroup } from "@/registry/base/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/base/dropdown-menu";

export default function ButtonGroupBasicDemo() {
  return (
    <ButtonGroup aria-label="File actions">
      <Button variant="outline">
        <FilesIcon />
        Files
      </Button>
      <Button variant="outline">
        <FilmIcon />
        Media
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button aria-label="Menu" size="icon" variant="outline" />}
        >
          <EllipsisIcon className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <EditIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArchiveIcon />
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
