
import { Shield, Clock, CreditCard, MessageSquare } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it and give you an additional 10% off your booking."
  },
  {
    icon: <CreditCard className="h-10 w-10" />,
    title: "No Hidden Fees",
    description: "What you see is what you pay. We believe in complete transparency with our customers."
  },
  {
    icon: <Clock className="h-10 w-10" />,
    title: "24/7 Customer Support",
    description: "Our support team is available around the clock to assist you with any issues or questions."
  },
  {
    icon: <MessageSquare className="h-10 w-10" />,
    title: "Verified Guest Reviews",
    description: "All reviews on our platform are from real guests who've stayed at the properties."
  }
];

const Features = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose EzyStay?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best hotel booking experience with these key benefits.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg transition-all duration-300 hover:shadow-md"
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="text-primary mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
