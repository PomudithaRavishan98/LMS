import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const highlights = [
  'Personalized teaching approach for every student',
  'Recorded sessions available 24/7 for revision',
  'Weekly live interactive doubt-clearing sessions',
  'Comprehensive study materials included',
  'Track record of 95%+ student improvement',
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-3xl bg-gradient-to-br from-brand-100 to-brand-200 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-32 w-32 rounded-full bg-brand-600 mx-auto mb-4 flex items-center justify-center text-5xl font-bold text-white font-display">
                    T
                  </div>
                  <p className="text-brand-700 font-medium">Teacher Photo</p>
                  <p className="text-brand-500 text-sm">Replace with your photo</p>
                </div>
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <div className="text-3xl font-bold text-brand-700">10+</div>
              <div className="text-sm text-gray-500">Years of Excellence</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-brand-50 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              About Me
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Passionate About
              <span className="text-brand-600"> Student Success</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              With over a decade of teaching experience, I've helped hundreds of students transform their understanding of core science and mathematics subjects. My approach combines conceptual clarity with practical application.
            </p>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
