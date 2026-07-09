import { motion } from 'framer-motion';
import { Calculator, Atom, FlaskConical, Leaf } from 'lucide-react';

const subjects = [
  {
    icon: Calculator,
    name: 'Mathematics',
    description: 'Algebra, Calculus, Trigonometry, Statistics & more. Build a strong foundation step by step.',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    iconBg: 'bg-blue-100',
  },
  {
    icon: Atom,
    name: 'Physics',
    description: 'Mechanics, Electromagnetism, Optics, Thermodynamics with real-world application focus.',
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    iconBg: 'bg-purple-100',
  },
  {
    icon: FlaskConical,
    name: 'Chemistry',
    description: 'Organic, Inorganic & Physical Chemistry explained clearly with mnemonics and visual aids.',
    color: 'bg-green-50 text-green-600 border-green-100',
    iconBg: 'bg-green-100',
  },
  {
    icon: Leaf,
    name: 'Biology',
    description: 'Cell Biology, Genetics, Ecology, Human Physiology — comprehensive coverage for exams.',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    iconBg: 'bg-amber-100',
  },
];

export default function SubjectsSection() {
  return (
    <section id="subjects" className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-brand-50 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Subjects
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What I Teach
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive coverage across core science and mathematics with a focus on conceptual understanding and exam excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, i) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border-2 p-6 hover:shadow-lg transition-shadow ${subject.color}`}
            >
              <div className={`h-12 w-12 rounded-xl ${subject.iconBg} flex items-center justify-center mb-4`}>
                <subject.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">{subject.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{subject.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
