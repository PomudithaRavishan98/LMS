import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Star, Users, Award } from 'lucide-react';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-hero-gradient flex items-center overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm mb-6">
              <Star className="h-4 w-4 text-accent-400 fill-accent-400" />
              Trusted by 500+ Students
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Learn From
              <span className="block text-accent-400">The Best</span>
            </h1>

            <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-lg">
              Expert tutoring in Mathematics, Physics, Chemistry & Biology. Access recorded lessons anytime and join live interactive sessions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-accent-500 hover:bg-accent-600 text-white">
                  Enroll Now — It's Free
                </Button>
              </Link>
              <a href="#about">
                <Button size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
                  <Play className="h-4 w-4" /> Learn More
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              {[
                { icon: Users, value: '500+', label: 'Students' },
                { icon: Award, value: '10+', label: 'Years Exp.' },
                { icon: Star, value: '4.9', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-5 w-5 text-accent-400 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-3 bg-white/20 rounded-full w-3/4" />
                  <div className="h-3 bg-white/20 rounded-full w-full" />
                  <div className="h-3 bg-white/20 rounded-full w-2/3" />
                </div>
                <div className="bg-brand-600/60 backdrop-blur rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-accent-400 flex items-center justify-center font-bold text-brand-900">T</div>
                    <div>
                      <div className="text-white font-semibold text-sm">Live Session</div>
                      <div className="text-white/60 text-xs">Mathematics • Today 4PM</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="h-3 w-3 text-accent-400 fill-accent-400" />)}
                    <span className="text-white/70 text-xs ml-1">5.0</span>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 text-center"
              >
                <div className="text-2xl font-bold text-brand-700">500+</div>
                <div className="text-xs text-gray-500">Students</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
