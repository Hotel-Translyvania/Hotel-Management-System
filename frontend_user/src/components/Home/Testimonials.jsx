
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    text: "EzyStay made our honeymoon special with their amazing recommendations. The booking process was seamless, and the hotel exceeded our expectations. Will definitely use them again!"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    rating: 4,
    text: "I travel frequently for business, and this platform has made finding quality accommodations so much easier. Their customer service team went above and beyond when I needed to make last-minute changes."
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    text: "As someone who loves exploring new destinations, I've used many booking sites, but EzyStay offers the best experience by far. Their no hidden fees policy is refreshing and honest."
  },
  {
    id: 4,
    name: "James Wilson",
    location: "Sydney, Australia",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    text: "EzyStay helped me find the perfect accommodation for my family vacation. The interface is intuitive and the options are well-curated."
  },
  {
    id: 5,
    name: "Sophia Kim",
    location: "Seoul, South Korea",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    rating: 4,
    text: "I appreciate how EzyStay provides detailed information about each property. It made my decision-making process so much easier!"
  },
  {
    id: 6,
    name: "David Garcia",
    location: "Madrid, Spain",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    text: "The customer service at EzyStay is exceptional. They handled my last-minute booking changes with professionalism and courtesy."
  }
];

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / 3);
  const testimonialsRef = useRef(null);
  
  const nextPage = () => {
    setCurrentPage((current) => (current + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((current) => (current - 1 + totalPages) % totalPages);
  };
  
  useEffect(() => {
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollTo({
        left: currentPage * testimonialsRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentPage]);
  
  return (
    <section className="py-16 px-4 bg-white" id="testimonials">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Guests Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read authentic reviews from travelers who have booked with us.
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div 
            ref={testimonialsRef}
            className="flex overflow-hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="min-w-full flex gap-4 px-2">
                {testimonials.slice(pageIndex * 3, pageIndex * 3 + 3).map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="flex-1 bg-white p-5 rounded-xl shadow-md relative flex flex-col items-center text-center"
                  >
                    <div className="absolute top-4 right-4 text-primary opacity-20">
                      <Quote size={32} />
                    </div>
                    
                    <Avatar className="h-16 w-16 mb-3 border-4 border-primary/20">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 text-sm italic mb-3">"{testimonial.text}"</p>
                    
                    <div className="mt-auto">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-muted-foreground text-xs">{testimonial.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 gap-4 items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevPage}
              className="rounded-full border-primary text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentPage ? 'w-8 bg-primary' : 'w-2.5 bg-gray-300'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextPage}
              className="rounded-full border-primary text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;