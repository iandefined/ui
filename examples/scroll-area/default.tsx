import { ScrollArea, ScrollAreaContent } from "@/registry/base/scroll-area";

export default function ScrollAreaDefaultDemo() {
  return (
    <div className="border rounded-md">
      <ScrollArea className="h-64 w-80" scrollShadow="vertical">
        <ScrollAreaContent className="p-4">
          <p>
            At the edge of the town stood a narrow house with seven windows. Six
            looked toward the road, where carts passed in the morning and lamps
            appeared at night. The seventh looked toward the hills. Nobody paid
            much attention to that window except a boy named Emil. Every evening
            he climbed the stairs, pushed aside the curtain, and watched the
            last sunlight disappear behind the grass. One evening he noticed a
            small light moving across the hillside. It was too low to be a star
            and too steady to be a lantern. It moved slowly, stopped beneath an
            old tree, and remained there until the sky became completely dark.
            The next evening it returned. On the third evening, Emil packed a
            piece of bread, a bottle of water, and the little brass compass his
            grandfather had given him. Then he walked out of town and followed
            the path toward the hills. The farther he went, the quieter
            everything became. Soon he could no longer hear the market bell or
            the wheels on the road. He heard only his footsteps and the wind
            moving through the long grass. When he reached the old tree, the
            mysterious light was nowhere to be seen. Instead, sitting beneath
            the branches, he found an old woman repairing a paper lantern. “I
            thought you were something much stranger,” Emil said. “Most things
            are strange,” she replied, “until you arrive.” Emil considered this.
            He had spent three evenings wondering what the light might be.
            Somehow the answer felt smaller than the question, but not less
            interesting. He sat beneath the tree while the woman worked. Above
            them, the first stars appeared one by one, quietly taking their
            places in the dark.
          </p>
        </ScrollAreaContent>
      </ScrollArea>
    </div>
  );
}
