import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Subjects', href: '#subjects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-900/90 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <GraduationCap className="h-7 w-7 text-accent-400" />
            EduMentor
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-white/80 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link to={user.role === 'teacher' ? '/admin' : '/dashboard'}>
                <Button size="sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-accent-500 hover:bg-accent-600 text-white">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-900 border-t border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="block text-white/80 hover:text-white py-1" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            {user ? (
              <Link to={user.role === 'teacher' ? '/admin' : '/dashboard'}>
                <Button className="w-full">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login"><Button variant="secondary" className="w-full">Login</Button></Link>
                <Link to="/register"><Button className="w-full bg-accent-500 hover:bg-accent-600">Register</Button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
