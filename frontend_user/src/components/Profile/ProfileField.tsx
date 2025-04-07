
import { cn } from "@/lib/utils";

interface ProfileFieldProps {
  label: string;
  value: string;
  className?: string;
}

const ProfileField = ({ label, value, className }: ProfileFieldProps) => {
  return (
    <div className={cn("mb-6", className)}>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-base text-gray-900">{value || "Not provided"}</p>
    </div>
  );
};

export default ProfileField;