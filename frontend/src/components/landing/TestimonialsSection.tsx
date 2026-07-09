import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { getTestimonials } from '../../api/public.api';

interface Testimonial {
  _id: string;
  studentName: string;
  text: string;
  rating: number;
  subject: string;
}

const fallback: Testimonial[] = [
  { _id: '1', studentName: 'Priya Sharma', text: 'The teaching style is amazing! I improved my grades significantly in just 2 months.', rating: 5, subject: 'Mathematics' },
  { _id: '2', studentName: 'Rahul Mehta', text: 'Best online classes I have ever attended. Concepts are explained so clearly.', rating: 5, subject: 'Physics' },
  { _id: '3', studentName: 'Anjali Patel', text: 'The video recordings are incredibly helpful for revision. Highly recommended!', rating: 5, subject: 'Chemistry' },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallback);

  useEffect(() => {
    getTestimonials()
      .then((res) => { if (res.data?.length) setTestimonials(res.data); })
      .catch(() => {});
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-brand-50 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Students Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <Quote className="h-8 w-8 text-brand-200 mb-4" />
              <p className="text-gray-700 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold">
                  {t.studentName[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.studentName}</div>
                  <div className="text-xs text-gray-500">{t.subject}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent-500 fill-accent-500" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
