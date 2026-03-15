// app/contact/page.tsx
import HeroSection from '@/components/contact/contacthero';
import {ContactForm} from '@/components/contact/ContactForm';
import FAQSection from '@/components/contact/FAQSection';

export const metadata = {
  title: 'Contact Us | Hassan Digital Skills',
  description: 'Get in touch with HDS. Questions about courses, corporate training, or partnerships? We are here to help.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 relative bottom-10">
      <HeroSection />
      <br/>
      <ContactForm />
      <FAQSection />
    </main>
  );
}