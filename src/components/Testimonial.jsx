import React from "react";
import { motion } from "framer-motion"; // or "motion/react" depending on your version

// Extracted data makes the component much cleaner and easier to update
const testimonialsData = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Verified Patient",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    text: "The booking process was incredibly smooth. I found a great specialist within minutes and didn't have to wait weeks for an appointment. Highly recommended!",
    delay: 0,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Verified Patient",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop",
    text: "I was experiencing severe back pain and used this platform to find a non-surgical treatment expert. The doctor was amazing and the platform made follow-ups a breeze.",
    delay: 0.2,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Verified Patient",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&h=200&auto=format&fit=crop",
    text: "The 100% insurance support feature saved me so much headache. The interface is user-friendly, clean, and genuinely cares about the patient experience.",
    delay: 0.4,
  },
];

const Testimonial = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900">
            What Our Patients Say
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
            Real stories from people who found the right care at the right time.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          {testimonialsData.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: testimonial.delay,
                ease: "easeOut",
              }}
              className="relative bg-white rounded-3xl p-8 pt-14 shadow-lg shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center"
            >
              {/* Background Quote Watermark */}
              <div className="absolute top-6 left-6 text-blue-50 opacity-50 pointer-events-none">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Floating Avatar */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="mb-4 relative z-10">
                <h3 className="text-xl font-bold text-slate-800">
                  {testimonial.name}
                </h3>
                <p className="text-blue-600 font-semibold text-sm mt-1">
                  {testimonial.role}
                </p>
              </div>

              {/* Review Text */}
              <p className="text-slate-600 leading-relaxed italic mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Star Ratings (Dynamically mapped) */}
              <div className="mt-auto flex gap-1 relative z-10">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
