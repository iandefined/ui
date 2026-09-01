import { Avatar, AvatarFallback, AvatarImage } from "@/registry/base/avatar";

const users = [
  {
    alt: "U1",
    src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80",
  },
  {
    alt: "U2",
    src: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=96&h=96&dpr=2&q=80",
  },
  {
    alt: "U3",
    src: "https://images.unsplash.com/photo-1655874819398-c6dfbec68ac7?w=96&h=96&dpr=2&q=80",
  },
];

export default function AvatarGroupDemo() {
  return (
    <div className="flex -space-x-[0.6rem]">
      {users.map(({ alt, src }) => (
        <Avatar className="ring-2 ring-background" key={alt}>
          <AvatarImage alt={alt} src={src} />
          <AvatarFallback>{alt}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
