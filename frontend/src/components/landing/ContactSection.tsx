import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Mail, Phone, Send } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { sendContact } from '../../api/public.api';
import { useState } from 'react';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
      await sendContact(data);
      toast.success('Message sent! I will get back to you soon.');
      reset();
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-hero-gradient">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Get in Touch
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Have questions? Send me a message and I'll get back to you within 24 hours.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <div className="p-2 bg-white/10 rounded-lg"><Mail className="h-5 w-5" /></div>
                <span>teacher@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="p-2 bg-white/10 rounded-lg"><Phone className="h-5 w-5" /></div>
                <span>+91 98765 43210</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Your Name"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                error={errors.email?.message}
                {...register('email', { required: 'Email is required' })}
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={4}
                  placeholder="I'd like to know more about your courses..."
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
              </div>
              <Button type="submit" loading={loading} className="w-full" size="lg">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
