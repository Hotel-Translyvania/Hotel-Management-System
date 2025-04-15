import {
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const SidebarFooter = ({ isOpen, onToggle }) => {
  return (
    <div className="mt-auto border-t">
      <button
        onClick={onToggle}
        className="w-full flex items-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors justify-center"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? (
          <>
            <ChevronsLeft className="size-10" />
          </>
        ) : (
          <>
            <ChevronsRight className="size-10" />
          </>
        )}
      </button>
    </div>
  );
};

export default SidebarFooter;
