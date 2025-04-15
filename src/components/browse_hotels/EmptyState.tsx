
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">No hotels found</h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        No hotels match your search criteria. Try adjusting your filters or search for a different location.
      </p>
      <Button 
        onClick={onClearFilters}
        variant="outline"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default EmptyState;
