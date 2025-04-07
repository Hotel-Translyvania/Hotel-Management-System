
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OfferProps {
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  backgroundColor: string;
  id: string;
}

const SpecialOfferCard: React.FC<OfferProps> = ({
  title,
  description,
  discount,
  validUntil,
  backgroundColor,
  id
}) => {
  return (
    <Card className={`${backgroundColor} overflow-hidden h-full`}>
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <span className="inline-block text-lg font-bold bg-white text-hotel-primary px-3 py-1 rounded-full">
            {discount} OFF
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/90 text-sm mb-4 flex-grow">{description}</p>
        <div className="mt-auto">
          <div className="text-xs text-white/80 mb-4">Valid until: {validUntil}</div>
          <Button 
            className="w-full bg-white text-hotel-primary hover:bg-gray-100"
            asChild
          >
            <a href={`/offers/${id}`}>View Offer</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface SpecialOffersProps {
  offers: OfferProps[];
}

const SpecialOffers: React.FC<SpecialOffersProps> = ({ offers }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-900">Special Offers</h2>
        <Button 
          variant="link" 
          className="text-hotel-primary font-medium"
          asChild
        >
          <a href="/offers">View All</a>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {offers.map((offer, index) => (
          <SpecialOfferCard key={index} {...offer} />
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
