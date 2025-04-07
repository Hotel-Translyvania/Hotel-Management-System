
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  imageSrc?: string;
  className?: string;
}

const UserAvatar = ({ name, imageSrc, className }: UserAvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <Avatar className={cn("h-20 w-20", className)}>
      <AvatarImage src={imageSrc} alt={name} />
      <AvatarFallback className="bg-primary/10 text-primary text-lg">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;