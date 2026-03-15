'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Share2, 
  Cookie,
  UserX,
  Globe,
  Mail,
  Calendar,
  Printer,
  Download,
  ArrowRight,
  ChevronRight,
  FileText,
  Server,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const lastUpdated = "March 11, 2026";

const privacySections = [
  {
    id: 'introduction',
    title: '1. Introduction & Overview',
    icon: Shield,
    content: [
      {
        subtitle: '1.1 Our Commitment',
        text: 'Hassan Digital Skills ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our website, learning management system, mobile applications, and educational services (collectively, the "Services").'
      },
      {
        subtitle: '1.2 Scope of Policy',
        text: 'This policy applies to all students, instructors, visitors, and anyone who accesses our Services. By using Hassan Digital Skills, you consent to the practices described in this Privacy Policy. If you do not agree with this policy, please do not use our Services.'
      },
      {
        subtitle: '1.3 Regulatory Compliance',
        text: 'We comply with the General Data Protection Regulation (GDPR) for EU residents, the California Consumer Privacy Act (CCPA) for California residents, and the Personal Data Protection Bill of Pakistan. We implement industry-standard security measures to protect your data.'
      }
    ]
  },
  {
    id: 'collection',
    title: '2. Information We Collect',
    icon: Database,
    content: [
      {
        subtitle: '2.1 Personal Information',
        text: 'We collect personal information that you voluntarily provide, including: full name, email address, phone number, postal address, date of birth, government ID (for verification), educational background, professional experience, payment information, and profile photographs.'
      },
      {
        subtitle: '2.2 Usage Data',
        text: 'We automatically collect information about your interactions with our Services, including: IP address, browser type, device information, operating system, pages visited, time spent, click patterns, course progress, quiz scores, assignment submissions, and forum activity.'
      },
      {
        subtitle: '2.3 Technical Data',
        text: 'Our servers log technical information including: login times, session duration, error logs, download history, video watch time, feature usage statistics, and system performance data to improve our Services.'
      },
      {
        subtitle: '2.4 Third-Party Information',
        text: 'We may receive information from third parties such as: payment processors (transaction details), identity verification services, background check providers (for instructors), and marketing partners (with your consent).'
      }
    ]
  },
  {
    id: 'usage',
    title: '3. How We Use Your Information',
    icon: Eye,
    content: [
      {
        subtitle: '3.1 Service Provision',
        text: 'Your information enables us to: create and manage your account, process enrollments and payments, deliver course content, track learning progress, issue certificates, provide customer support, and send service-related notifications.'
      },
      {
        subtitle: '3.2 Platform Improvement',
        text: 'We analyze usage patterns to: optimize course recommendations, improve user interface, fix technical issues, develop new features, conduct research on learning effectiveness, and generate anonymized analytics reports.'
      },
      {
        subtitle: '3.3 Communication',
        text: 'We use your contact information to: send course updates, notify about schedule changes, share educational resources, deliver marketing communications (with consent), request feedback, and inform about policy changes.'
      },
      {
        subtitle: '3.4 Security & Compliance',
        text: 'Your data helps us: verify identity, prevent fraud, detect unauthorized access, comply with legal obligations, enforce our terms, protect rights and safety, and respond to legal requests from authorities.'
      }
    ]
  },
  {
    id: 'sharing',
    title: '4. Information Sharing & Disclosure',
    icon: Share2,
    content: [
      {
        subtitle: '4.1 Service Providers',
        text: 'We share data with trusted third parties who assist our operations: cloud hosting providers (AWS, Google Cloud), payment processors (Stripe, PayPal), video streaming services (Vimeo, YouTube), email service providers (SendGrid), and analytics tools (Google Analytics). All providers are contractually bound to protect your data.'
      },
      {
        subtitle: '4.2 Educational Partners',
        text: 'With your consent, we may share academic records with: certification partners (for credential verification), employer partners (for job placement), university affiliates (for credit transfer), and scholarship providers (for funding verification).'
      },
      {
        subtitle: '4.3 Legal Requirements',
        text: 'We may disclose information if required by law, court order, or government request; to enforce our terms and policies; to protect our rights, property, or safety; or to prevent illegal activities or fraud.'
      },
      {
        subtitle: '4.4 Business Transfers',
        text: 'In the event of a merger, acquisition, or sale of assets, user information may be transferred. We will notify you of any change in ownership or uses of your personal information.'
      },
      {
        subtitle: '4.5 Public Information',
        text: 'Information you voluntarily make public on our platform (forum posts, public profiles, shared projects) is visible to other users. Please exercise caution when sharing personal information in public areas.'
      }
    ]
  },
  {
    id: 'cookies',
    title: '5. Cookies & Tracking Technologies',
    icon: Cookie,
    content: [
      {
        subtitle: '5.1 Types of Cookies',
        text: 'We use: Essential cookies (authentication, security), Functional cookies (preferences, language), Analytics cookies (usage statistics), Marketing cookies (targeted advertising), and Third-party cookies (social media integration).'
      },
      {
        subtitle: '5.2 Purpose of Tracking',
        text: 'Cookies help us: maintain your session, remember preferences, analyze traffic patterns, personalize content, measure advertising effectiveness, and prevent fraudulent activities.'
      },
      {
        subtitle: '5.3 Cookie Management',
        text: 'You can control cookies through browser settings. However, disabling essential cookies may limit functionality. We provide a cookie consent banner allowing granular control over non-essential cookies.'
      },
      {
        subtitle: '5.4 Do Not Track',
        text: 'We honor "Do Not Track" signals from browsers. When detected, we limit non-essential tracking and data collection, though core service functionality requires some essential tracking.'
      }
    ]
  },
  {
    id: 'storage',
    title: '6. Data Storage & Security',
    icon: Server,
    content: [
      {
        subtitle: '6.1 Storage Locations',
        text: 'Your data is stored on secure servers located in Pakistan, with backup servers in Singapore and Germany. By using our Services, you consent to data transfer to these locations, which may have different data protection laws.'
      },
      {
        subtitle: '6.2 Security Measures',
        text: 'We implement: AES-256 encryption for data at rest, TLS 1.3 for data in transit, multi-factor authentication, regular security audits, penetration testing, intrusion detection systems, and employee background checks.'
      },
      {
        subtitle: '6.3 Data Retention',
        text: 'We retain your data as long as your account is active or as needed to provide Services. After account closure, we retain data for 3 years for legal compliance, then anonymize or delete it. Some financial records are kept for 7 years per tax regulations.'
      },
      {
        subtitle: '6.4 Breach Notification',
        text: 'In case of a data breach affecting your personal information, we will notify you within 72 hours via email and post a notice on our platform. We will also report to relevant authorities as required by law.'
      }
    ]
  },
  {
    id: 'rights',
    title: '7. Your Privacy Rights',
    icon: UserX,
    content: [
      {
        subtitle: '7.1 Access & Portability',
        text: 'You have the right to request a copy of your personal data in a structured, machine-readable format. You can download your data through account settings or by contacting our support team.'
      },
      {
        subtitle: '7.2 Correction & Deletion',
        text: 'You can update most information through your profile settings. For deletion requests, email privacy@hassandigitalskills.com. We will process requests within 30 days, subject to legal retention requirements.'
      },
      {
        subtitle: '7.3 Consent Withdrawal',
        text: 'You can withdraw consent for marketing communications at any time by clicking "unsubscribe" in emails or updating preferences in account settings. Withdrawal does not affect processing based on prior consent.'
      },
      {
        subtitle: '7.4 Restriction & Objection',
        text: 'You may request restriction of processing or object to processing based on legitimate interests. We will honor these requests unless we have compelling legitimate grounds or legal obligations.'
      },
      {
        subtitle: '7.5 Complaint Filing',
        text: 'If you believe we violated your privacy rights, contact us first. If unresolved, EU residents may complain to their Data Protection Authority, and Pakistani residents may contact the National Commission for Personal Data Protection.'
      }
    ]
  },
  {
    id: 'international',
    title: '8. International Data Transfers',
    icon: Globe,
    content: [
      {
        subtitle: '8.1 Transfer Mechanisms',
        text: 'When transferring data outside Pakistan, we use: Standard Contractual Clauses (SCCs), adequacy decisions for approved countries, and binding corporate rules for intra-group transfers. All transfers include appropriate safeguards.'
      },
      {
        subtitle: '8.2 EU-US Data Flow',
        text: 'For EU user data transferred to the US, we rely on the EU-US Data Privacy Framework and Standard Contractual Clauses. We verify that our US service providers maintain adequate protection levels.'
      },
      {
        subtitle: '8.3 Asian Operations',
        text: 'Our Singapore and India operations follow PDPA and IT Act requirements respectively. Data processed in these locations maintains the same protection standards as our primary operations.'
      }
    ]
  },
  {
    id: 'children',
    title: '9. Children\'s Privacy',
    icon: Shield,
    content: [
      {
        subtitle: '9.1 Age Restrictions',
        text: 'Our Services are not intended for children under 16. We do not knowingly collect data from children under 16 without verifiable parental consent. If we discover such collection, we will delete the data immediately.'
      },
      {
        subtitle: '9.2 Parental Controls',
        text: 'Parents or guardians can: review their child\'s personal information, request deletion, refuse further collection, and consent to collection without agreeing to disclosure to third parties.'
      }
    ]
  },
  {
    id: 'changes',
    title: '10. Policy Changes & Updates',
    icon: Bell,
    content: [
      {
        subtitle: '10.1 Modification Notice',
        text: 'We may update this Privacy Policy periodically. Material changes will be notified via email and platform announcement 30 days before taking effect. Continued use after changes constitutes acceptance.'
      },
      {
        subtitle: '10.2 Version History',
        text: 'Previous versions of this policy are archived and available upon request. The "Last Updated" date at the top indicates the current version date.'
      }
    ]
  }
];

const dataRights = [
  {
    title: 'Access Your Data',
    description: 'Download all personal information we hold about you',
    action: 'Request Export',
    icon: Database
  },
  {
    title: 'Delete Account',
    description: 'Permanently remove your account and associated data',
    action: 'Request Deletion',
    icon: UserX
  },
  {
    title: 'Update Preferences',
    description: 'Manage communication and privacy settings',
    action: 'Go to Settings',
    icon: CheckCircle2
  },
  {
    title: 'Cookie Settings',
    description: 'Control tracking technologies and cookies',
    action: 'Manage Cookies',
    icon: Cookie
  }
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* Hero Header */}
      <section className="relative bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0">
                <Shield className="w-3 h-3 mr-1" />
                Data Protection
              </Badge>
              <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Last updated: {lastUpdated}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Privacy <span className="text-blue-600 dark:text-blue-400">Policy</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Your privacy is our priority. Learn how Hassan Digital Skills collects, protects, and respects your personal information while delivering world-class education.
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
                <Link href="/terms">
                  Terms of Service
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Bar */}
      <section className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 overflow-x-auto">
            <span className="text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
              Quick Privacy Controls:
            </span>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                  id="service-emails"
                />
                <label htmlFor="service-emails" className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap cursor-pointer">
                  Service Emails
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={marketingEmails} 
                  onCheckedChange={setMarketingEmails}
                  id="marketing"
                />
                <label htmlFor="marketing" className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap cursor-pointer">
                  Marketing
                </label>
              </div>
              <Button size="sm" variant="secondary" className="rounded-full whitespace-nowrap">
                <Lock className="w-3 h-3 mr-2" />
                Privacy Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 px-3">Table of Contents</h3>
              {privacySections.map((section) => {
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
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Privacy Concerns?
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
                  Contact our Data Protection Officer for any privacy-related queries.
                </p>
                <Button variant="secondary" size="sm" className="w-full rounded-lg text-xs" asChild>
                  <Link href="mailto:privacy@hassandigitalskills.com">
                    Contact DPO
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            
            {/* Trust Badge */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-12 shadow-xl shadow-blue-900/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Your Data, Your Control</h2>
                  <p className="text-blue-100 leading-relaxed mb-4">
                    We believe in transparency and user empowerment. You have full control over your personal information, with easy-to-use tools to access, modify, or delete your data at any time.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-200" />
                      <span>GDPR Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-200" />
                      <span>CCPA Ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-200" />
                      <span>ISO 27001 Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Rights Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {dataRights.map((right) => {
                const Icon = right.icon;
                return (
                  <div 
                    key={right.title}
                    className="group p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{right.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{right.description}</p>
                    <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:underline">
                      {right.action}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                );
              })}
            </div>

            <Separator className="mb-12" />

            {/* Policy Sections */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="space-y-16">
                {privacySections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <section 
                      key={section.id} 
                      id={section.id}
                      className="scroll-mt-32"
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

              {/* Contact Section */}
              <section className="mt-16 bg-slate-50 dark:bg-slate-900 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Contact Us
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">Email</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">privacy@hassandigitalskills.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">Postal Address</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Data Protection Officer, Hassan Digital Skills, 123 Tech Boulevard, Lahore 54000, Pakistan</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    © 2026 Hassan Digital Skills. All rights reserved.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                      <Link href="/terms">Terms of Service</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                      <Link href="/cookies">Cookie Policy</Link>
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