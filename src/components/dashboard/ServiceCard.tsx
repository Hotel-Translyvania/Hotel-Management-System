
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <Card className="hover:shadow-md transition-all duration-300 cursor-pointer group">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="p-3 bg-hotel-secondary rounded-full mb-3 group-hover:bg-hotel-primary group-hover:text-white transition-all duration-300">
          {icon}
        </div>
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
