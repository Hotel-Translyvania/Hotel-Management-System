import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HotelPagination = ({ currentPage, setCurrentPage, pageCount }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <Button
        variant="default"
        className={"bg-blue-600 hover:bg-blue-700 text-white"}
        onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
        disabled={currentPage === 0}
      >
        <ChevronLeft className="size-4 mr-2" />
        Previous
      </Button>

      <span className="text-sm">
        Page {currentPage + 1} of {pageCount}
      </span>

      <Button
        variant="default"
        className={"bg-blue-600 hover:bg-blue-700 text-white"}
        onClick={() => setCurrentPage((p) => Math.min(pageCount - 1, p + 1))}
        disabled={currentPage >= pageCount - 1}
      >
        Next
        <ChevronRight className="size-4 ml-4" />
      </Button>
    </div>
  );
};

export default HotelPagination;
