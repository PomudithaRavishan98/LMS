import { GraduationCap, Mail, Phone, Youtube, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 text-accent-400" />
              <span className="font-bold text-xl">EduMentor</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Empowering students to achieve their academic dreams through personalized, engaging education.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#subjects" className="hover:text-white transition-colors">Subjects</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-3 mb-4">
              <a href="#" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"><Youtube className="h-4 w-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"><Linkedin className="h-4 w-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"><Instagram className="h-4 w-4" /></a>
            </div>
            <div className="space-y-1 text-sm text-white/60">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>teacher@example.com</span></div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>+91 98765 43210</span></div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} EduMentor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
