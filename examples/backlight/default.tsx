import { Backlight } from "@/registry/base/backlight";

const imageUrl =
  "https://images.unsplash.com/photo-1778807262782-bf2775ddd405?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function BacklightDefaultDemo() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <Backlight className="w-full max-w-xl">
        <div className="w-full">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950">
            <img
              alt="A misty mountain landscape reflected in still water"
              className="size-full object-cover"
              height="1463"
              src={imageUrl}
              width="2340"
            />
          </div>
        </div>
      </Backlight>
    </div>
  );
}
