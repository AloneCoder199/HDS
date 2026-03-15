'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  FileText, 
  UserCheck, 
  CreditCard, 
  Lock, 
  AlertCircle,
  ChevronRight,
  Printer,
  Download,
  Calendar,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const lastUpdated = "March 11, 2026";

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    icon: FileText,
    content: [
      {
        subtitle: '1.1 Agreement to Terms',
        text: 'By accessing, browsing, or using the Hassan Digital Skills platform, website, mobile applications, or any related services (collectively referred to as the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you must immediately cease using our Services.'
      },
      {
        subtitle: '1.2 Binding Agreement',
        text: 'These Terms constitute a legally binding agreement between you ("User", "Student", "You") and Hassan Digital Skills ("Company", "We", "Us", "Our"), a registered educational technology company operating in Pakistan.'
      },
      {
        subtitle: '1.3 Age Requirements',
        text: 'By using our Services, you represent and warrant that you are at least 16 years of age. If you are under 18, you represent that you have parental or guardian consent to use our Services, and that your parent or guardian has reviewed and agreed to these Terms on your behalf.'
      }
    ]
  },
  {
    id: 'services',
    title: '2. Services Description',
    icon: Shield,
    content: [
      {
        subtitle: '2.1 Educational Services',
        text: 'Hassan Digital Skills provides online and offline educational courses, training programs, workshops, and certification programs in digital skills including but not limited to Web Development, Digital Marketing, UI/UX Design, Data Science, Graphic Design, and related technology fields.'
      },
      {
        subtitle: '2.2 Platform Access',
        text: 'Upon successful registration and payment (where applicable), users are granted a limited, non-exclusive, non-transferable license to access and use our learning management system, course materials, video content, assignments, and community forums for personal, non-commercial educational purposes only.'
      },
      {
        subtitle: '2.3 Service Modifications',
        text: 'We reserve the right to modify, suspend, or discontinue any part of our Services at any time without prior notice. This includes course content updates, platform feature changes, or third-party integrations. We will make reasonable efforts to notify users of significant changes.'
      },
      {
        subtitle: '2.4 Technical Requirements',
        text: 'Users are responsible for ensuring they have compatible devices, stable internet connectivity, and necessary software to access our Services. Minimum technical requirements are specified on our website and may vary by course.'
      }
    ]
  },
  {
    id: 'accounts',
    title: '3. User Accounts & Registration',
    icon: UserCheck,
    content: [
      {
        subtitle: '3.1 Account Creation',
        text: 'To access certain features, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.'
      },
      {
        subtitle: '3.2 Account Security',
        text: 'You are solely responsible for maintaining the confidentiality of your account credentials, including your password. You agree to notify us immediately of any unauthorized access to or use of your account. We are not liable for any loss or damage arising from your failure to secure your account.'
      },
      {
        subtitle: '3.3 Account Restrictions',
        text: 'You may not share, transfer, or sell your account access to any third party. Each account is intended for individual use only. Corporate or institutional licenses require separate agreements.'
      },
      {
        subtitle: '3.4 Termination Rights',
        text: 'We reserve the right to suspend or terminate your account immediately, without prior notice or liability, for any reason, including breach of these Terms, fraudulent activity, or conduct that we determine to be harmful to other users or our business.'
      }
    ]
  },
  {
    id: 'payment',
    title: '4. Payment & Refund Policy',
    icon: CreditCard,
    content: [
      {
        subtitle: '4.1 Pricing & Fees',
        text: 'All course fees are displayed in Pakistani Rupees (PKR) unless otherwise specified. Prices are subject to change without notice, but changes will not affect enrolled students for their current course duration. Additional taxes may apply as per government regulations.'
      },
      {
        subtitle: '4.2 Payment Methods',
        text: 'We accept payments through bank transfers, credit/debit cards, mobile wallets (JazzCash, EasyPaisa), and other methods as specified on our platform. All payment information is processed through secure, PCI-compliant payment gateways.'
      },
      {
        subtitle: '4.3 Refund Policy',
        text: 'Refund requests must be submitted within 7 days of course start date. No refunds will be issued after 30% of course content has been accessed or after 7 days from enrollment, whichever comes first. Refunds are processed within 14 business days and may be subject to a 10% administrative fee.'
      },
      {
        subtitle: '4.4 Scholarship & Discounts',
        text: 'Scholarships and promotional discounts are awarded at our discretion and cannot be combined unless explicitly stated. Scholarship recipients must maintain minimum attendance and performance standards to retain their benefits.'
      }
    ]
  },
  {
    id: 'intellectual',
    title: '5. Intellectual Property Rights',
    icon: Lock,
    content: [
      {
        subtitle: '5.1 Ownership',
        text: 'All content provided through our Services, including but not limited to videos, text, graphics, logos, images, audio clips, software, and course materials, is the exclusive property of Hassan Digital Skills or our licensors and is protected by Pakistani and international copyright, trademark, and intellectual property laws.'
      },
      {
        subtitle: '5.2 Limited License',
        text: 'Upon enrollment, you are granted a limited, revocable, non-transferable license to access course materials solely for your personal educational use. This license does not permit reproduction, distribution, public display, creation of derivative works, or commercial exploitation of any content.'
      },
      {
        subtitle: '5.3 Prohibited Activities',
        text: 'You may not download (except where explicitly permitted), copy, modify, create derivative works from, reverse engineer, decompile, disassemble, rent, lease, loan, sell, sublicense, distribute, or publicly display any content without our express written permission.'
      },
      {
        subtitle: '5.4 User Content',
        text: 'By submitting assignments, projects, forum posts, or other content to our platform, you grant us a non-exclusive, royalty-free, perpetual, irrevocable license to use, reproduce, modify, and display such content for educational and promotional purposes.'
      }
    ]
  },
  {
    id: 'conduct',
    title: '6. User Conduct & Prohibitions',
    icon: AlertCircle,
    content: [
      {
        subtitle: '6.1 Acceptable Use',
        text: 'You agree to use our Services only for lawful purposes and in accordance with these Terms. You must respect instructors, staff, and fellow students at all times. Harassment, discrimination, hate speech, or abusive behavior will result in immediate termination.'
      },
      {
        subtitle: '6.2 Academic Integrity',
        text: 'All submitted work must be your own. Plagiarism, cheating, use of unauthorized materials during assessments, or impersonation in examinations constitutes grounds for immediate course failure and account termination without refund.'
      },
      {
        subtitle: '6.3 Platform Security',
        text: 'You may not attempt to gain unauthorized access to any portion of our platform, servers, or networks. This includes hacking, password mining, or any other means of circumventing security measures. Violations may be reported to law enforcement authorities.'
      },
      {
        subtitle: '6.4 Communication Standards',
        text: 'All communications through our platform must be professional and respectful. Spam, unsolicited commercial messages, or distribution of malware through our systems is strictly prohibited.'
      }
    ]
  },
  {
    id: 'privacy',
    title: '7. Privacy & Data Protection',
    icon: Lock,
    content: [
      {
        subtitle: '7.1 Data Collection',
        text: 'Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our Services, you consent to our data practices as described in the Privacy Policy.'
      },
      {
        subtitle: '7.2 Data Security',
        text: 'We implement industry-standard security measures to protect your personal information. However, no internet transmission is completely secure, and we cannot guarantee absolute security of data transmitted to or from our Services.'
      },
      {
        subtitle: '7.3 Third-Party Services',
        text: 'We may use third-party service providers for payment processing, video hosting, analytics, and communication tools. These providers have access to personal information only to perform specific tasks on our behalf and are obligated to protect your data.'
      }
    ]
  },
  {
    id: 'liability',
    title: '8. Limitation of Liability',
    icon: Shield,
    content: [
      {
        subtitle: '8.1 Disclaimer',
        text: 'Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our Services will be uninterrupted, timely, secure, or error-free.'
      },
      {
        subtitle: '8.2 Limitation',
        text: 'To the maximum extent permitted by law, Hassan Digital Skills shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of our Services.'
      },
      {
        subtitle: '8.3 Employment Guarantee',
        text: 'While we provide career support and job placement assistance, we do not guarantee employment upon course completion. Job placement depends on individual effort, market conditions, and employer requirements.'
      },
      {
        subtitle: '8.4 Course Outcomes',
        text: 'Individual learning outcomes vary based on prior knowledge, effort, and aptitude. We do not guarantee specific skill levels, certification success, or salary increases resulting from our courses.'
      }
    ]
  },
  {
    id: 'termination',
    title: '9. Termination & Suspension',
    icon: AlertCircle,
    content: [
      {
        subtitle: '9.1 By User',
        text: 'You may terminate your account at any time by contacting our support team. Upon termination, your right to access course materials ceases immediately, and any pending refunds will be processed according to our Refund Policy.'
      },
      {
        subtitle: '9.2 By Company',
        text: 'We may suspend or terminate your access to Services immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, all licenses and rights granted to you will immediately cease.'
      },
      {
        subtitle: '9.3 Survival',
        text: 'Sections concerning intellectual property, limitation of liability, indemnification, and dispute resolution shall survive termination of these Terms.'
      }
    ]
  },
  {
    id: 'dispute',
    title: '10. Dispute Resolution',
    icon: Shield,
    content: [
      {
        subtitle: '10.1 Governing Law',
        text: 'These Terms shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, without regard to its conflict of law provisions.'
      },
      {
        subtitle: '10.2 Arbitration',
        text: 'Any dispute arising from these Terms shall first be attempted to be resolved through good faith negotiation. Failing resolution, disputes shall be submitted to binding arbitration in Lahore, Pakistan, under the Arbitration Act, 1940.'
      },
      {
        subtitle: '10.3 Jurisdiction',
        text: 'Courts in Lahore, Pakistan shall have exclusive jurisdiction over any disputes not subject to arbitration or where arbitration is deemed invalid.'
      }
    ]
  },
  {
    id: 'general',
    title: '11. General Provisions',
    icon: FileText,
    content: [
      {
        subtitle: '11.1 Entire Agreement',
        text: 'These Terms constitute the entire agreement between you and Hassan Digital Skills regarding our Services and supersede all prior agreements, understandings, and representations.'
      },
      {
        subtitle: '11.2 Severability',
        text: 'If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.'
      },
      {
        subtitle: '11.3 Waiver',
        text: 'Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. No waiver shall be effective unless in writing signed by an authorized representative.'
      },
      {
        subtitle: '11.4 Assignment',
        text: 'You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction. Any attempted assignment in violation of this section shall be void.'
      },
      {
        subtitle: '11.5 Changes to Terms',
        text: 'We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of Services after changes constitutes acceptance of revised Terms. Material changes will be notified via email or platform announcement.'
      },
      {
        subtitle: '11.6 Contact Information',
        text: 'For questions about these Terms, please contact us at legal@hassandigitalskills.com or visit our office at: Hassan Digital Skills, 123 Tech Boulevard, Lahore, Pakistan.'
      }
    ]
  }
];

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* Hero Header */}
      <section className="relative bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                Legal
              </Badge>
              <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Last updated: {lastUpdated}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Terms & <span className="text-blue-600 dark:text-blue-400">Conditions</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Please read these terms carefully before using Hassan Digital Skills platform and services. By accessing our platform, you agree to be bound by these terms.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handlePrint}
                variant="outline" 
                className="rounded-full border-slate-300 dark:border-slate-700"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full border-slate-300 dark:border-slate-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full border-slate-300 dark:border-slate-700"
                asChild
              >
                <Link href="/privacy-policy">
                  Privacy Policy
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 px-3">On this page</h3>
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection(section.id);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left',
                      activeSection === section.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{section.title}</span>
                  </button>
                );
              })}
              
              <Separator className="my-6" />
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 text-sm">Have questions?</h4>
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">Contact our legal team for clarification.</p>
                <Button variant="secondary" size="sm" className="w-full rounded-lg text-xs" asChild>
                  <Link href="mailto:legal@hassandigitalskills.com">
                    <Mail className="w-3 h-3 mr-2" />
                    Contact Legal
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              
              {/* Introduction */}
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-12">
                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Important Notice
                </h2>
                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed mb-0">
                  These Terms and Conditions govern your use of Hassan Digital Skills platform and services. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these terms. If you are entering into these terms on behalf of a company or organization, you represent that you have authority to bind such entity to these terms.
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-16">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <section 
                      key={section.id} 
                      id={section.id}
                      className="scroll-mt-24"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                          {section.title}
                        </h2>
                      </div>

                      <div className="space-y-6 pl-0 md:pl-13">
                        {section.content.map((item, idx) => (
                          <div key={idx} className="group">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                              {item.subtitle}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-0 md:pl-6">
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>

                      <Separator className="mt-12" />
                    </section>
                  );
                })}
              </div>

              {/* Footer Actions */}
              <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    © 2026 Hassan Digital Skills. All rights reserved.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                      <Link href="/privacy-policy">Privacy Policy</Link>
                    </Button>
                    
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </main>
  );
}