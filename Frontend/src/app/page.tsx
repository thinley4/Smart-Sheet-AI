import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Testimonial } from "./components/Testimonial";

export default function Page() {
  return (
    <div>
      <Hero />
      {/* about us */}
      <About />
      {/* testimonials */}
      <Testimonial />
      {/* faq */}
      {/* footer section */}
      <Footer />
    </div>
  );
}
