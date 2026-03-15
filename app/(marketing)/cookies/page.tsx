'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Cookie,
  Shield,
  Settings,
  Info,
  Eye,
  Target,
  BarChart3,
  CheckCircle2,
  XCircle,
  Clock,
  Globe,
  ChevronRight,
  Printer,
  Download,
  ArrowRight,
  Calendar,
  Mail,
  RefreshCw,
  Trash2,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const lastUpdated = "March 11, 2026";

const cookieCategories = [
  {
    id: 'essential',
    title: 'Essential Cookies',
    description: 'Required for the website to function properly. Cannot be disabled.',
    icon: Shield,
    required: true,
    cookies: [
      { name: 'session_id', purpose: 'Maintains your login session', duration: 'Session' },
      { name: 'csrf_token', purpose: 'Security token for form submissions', duration: 'Session' },
      { name: 'cookie_consent', purpose: 'Stores your cookie preferences', duration: '1 year' },
      { name: 'language', purpose: 'Remembers your language selection', duration: '1 year' }
    ]
  },
  {
    id: 'functional',
    title: 'Functional Cookies',
    description: 'Enable enhanced functionality and personalization.',
    icon: Settings,
    required: false,
    defaultEnabled: true,
    cookies: [
      { name: 'theme_preference', purpose: 'Dark/light mode preference', duration: '1 year' },
      { name: 'course_progress', purpose: 'Saves your course progress locally', duration: '30 days' },
      { name: 'video_volume', purpose: 'Remembers video player settings', duration: '30 days' },
      { name: 'last_visited', purpose: 'Tracks recently accessed content', duration: '7 days' }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics Cookies',
    description: 'Help us understand how visitors interact with our website.',
    icon: BarChart3,
    required: false,
    defaultEnabled: true,
    cookies: [
      { name: '_ga', purpose: 'Google Analytics - distinguishes users', duration: '2 years' },
      { name: '_gid', purpose: 'Google Analytics - distinguishes users', duration: '24 hours' },
      { name: '_gat', purpose: 'Google Analytics - throttles request rate', duration: '1 minute' },
      { name: 'hotjar_id', purpose: 'Hotjar - user behavior analysis', duration: '1 year' }
    ]
  },
  {
    id: 'marketing',
    title: 'Marketing Cookies',
    description: 'Used to deliver relevant advertisements and track campaign performance.',
    icon: Target,
    required: false,
    defaultEnabled: false,
    cookies: [
      { name: '_fbp', purpose: 'Facebook Pixel - ad delivery', duration: '3 months' },
      { name: 'fr', purpose: 'Facebook - ad personalization', duration: '3 months' },
      { name: 'ads_id', purpose: 'Google Ads - conversion tracking', duration: '13 months' },
      { name: 'linkedin_insight', purpose: 'LinkedIn - campaign analytics', duration: '6 months' }
    ]
  },
  {
    id: 'third_party',
    title: 'Third-Party Cookies',
    description: 'Set by external services integrated into our platform.',
    icon: Globe,
    required: false,
    defaultEnabled: false,
    cookies: [
      { name: 'youtube_prefs', purpose: 'YouTube - embedded video preferences', duration: '8 months' },
      { name: 'vimeo_player', purpose: 'Vimeo - video player settings', duration: '2 years' },
      { name: 'stripe_mid', purpose: 'Stripe - fraud prevention', duration: '1 year' },
      { name: 'intercom_session', purpose: 'Intercom - chat support', duration: '1 week' }
    ]
  }
];

const cookiePolicySections = [
  {
    id: 'what-are-cookies',
    title: 'What Are Cookies?',
    content: 'Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences, understand how you use the site, and improve your browsing experience. Cookies cannot access your device or personal files.'
  },
  {
    id: 'how-we-use',
    title: 'How We Use Cookies',
    content: 'Hassan Digital Skills uses cookies to: (1) Ensure our platform functions correctly, (2) Remember your preferences and settings, (3) Analyze traffic and user behavior to improve our services, (4) Deliver personalized learning recommendations, (5) Measure the effectiveness of our marketing campaigns, and (6) Maintain security and prevent fraud.'
  },
  {
    id: 'types-we-use',
    title: 'Types of Cookies We Use',
    content: 'We categorize cookies into five types: Essential (required for basic functionality), Functional (enhance user experience), Analytics (help us improve), Marketing (deliver relevant ads), and Third-Party (set by integrated services). Each category serves specific purposes as detailed in our Cookie Management section.'
  },
  {
    id: 'retention',
    title: 'Cookie Retention Periods',
    content: 'Cookie lifespans vary: Session cookies expire when you close your browser, while persistent cookies remain for periods ranging from 24 hours to 2 years depending on their purpose. You can manually delete cookies through your browser settings at any time.'
  },
  {
    id: 'third-party',
    title: 'Third-Party Cookies',
    content: 'We partner with trusted third parties who may set cookies: Google (Analytics & Ads), Facebook (Pixel), Hotjar (Behavior analysis), Stripe (Payments), YouTube/Vimeo (Video hosting), Intercom (Support chat). These partners have their own privacy policies and cookie practices.'
  },
  {
    id: 'control',
    title: 'How to Control Cookies',
    content: 'You can manage cookies through: (1) Our Cookie Preferences Center on this page, (2) Your browser settings (block all or specific cookies), (3) Industry opt-out tools like YourAdChoices or Network Advertising Initiative. Note that disabling essential cookies may break site functionality.'
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: 'We may update this Cookie Policy to reflect changes in technology, regulations, or our practices. Significant changes will be notified via email or platform announcement. The "Last Updated" date indicates the current version.'
  }
];

export default function CookiesPolicyPage() {
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    essential: true,
    functional: true,
    analytics: true,
    marketing: false,
    third_party: false
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const saved = localStorage.getItem('cookie_preferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (id: string) => {
    if (id === 'essential') return; // Cannot toggle essential
    setPreferences(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    setHasChanges(true);
    setSavedSuccessfully(false);
  };

  const handleSave = () => {
    localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
    setHasChanges(false);
    setSavedSuccessfully(true);
    setTimeout(() => setSavedSuccessfully(false), 3000);
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      third_party: true
    };
    setPreferences(allEnabled);
    localStorage.setItem('cookie_preferences', JSON.stringify(allEnabled));
    setHasChanges(false);
    setSavedSuccessfully(true);
  };

  const handleRejectAll = () => {
    const minimal = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      third_party: false
    };
    setPreferences(minimal);
    localStorage.setItem('cookie_preferences', JSON.stringify(minimal));
    setHasChanges(false);
    setSavedSuccessfully(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-blue-400 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                <Cookie className="w-3 h-3 mr-1" />
                Cookie Settings
              </Badge>
              <span className="text-sm text-blue-200 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Last updated: {lastUpdated}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Cookie <span className="text-blue-200">Policy</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8">
              We value your privacy. This page explains how we use cookies and similar technologies to enhance your learning experience while giving you full control over your data.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handlePrint}
                variant="outline" 
                className="rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="/privacy">
                  Privacy Policy
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Preferences Manager */}
      <section className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">Cookie Preferences</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Manage your consent for different cookie types</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full text-xs"
                onClick={handleRejectAll}
              >
                <XCircle className="w-3 h-3 mr-2" />
                Reject All
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full text-xs"
                onClick={handleAcceptAll}
              >
                <CheckCircle2 className="w-3 h-3 mr-2" />
                Accept All
              </Button>
              <Button 
                size="sm" 
                className={cn(
                  "rounded-full text-xs transition-all",
                  hasChanges ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-400"
                )}
                onClick={handleSave}
                disabled={!hasChanges}
              >
                <Save className="w-3 h-3 mr-2" />
                Save Preferences
              </Button>
            </div>
          </div>

          {savedSuccessfully && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-300 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Your cookie preferences have been saved successfully.
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Cookie Categories */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Cookie Categories</h2>
                <Badge variant="outline" className="text-xs">
                  {Object.values(preferences).filter(Boolean).length} of {Object.keys(preferences).length} enabled
                </Badge>
              </div>

              {cookieCategories.map((category) => {
                const Icon = category.icon;
                const isEnabled = preferences[category.id];
                
                return (
                  <div 
                    key={category.id}
                    className={cn(
                      "border rounded-2xl overflow-hidden transition-all duration-300",
                      isEnabled 
                        ? "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10" 
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
                    )}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                            isEnabled 
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                          )}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                {category.title}
                              </h3>
                              {category.required && (
                                <Badge variant="secondary" className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                  Required
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={() => handleToggle(category.id)}
                          disabled={category.required}
                          className={cn(
                            category.required && "opacity-50 cursor-not-allowed"
                          )}
                        />
                      </div>

                      {/* Cookie Details Table */}
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-left text-slate-500 dark:text-slate-400">
                                <th className="pb-2 font-medium">Cookie Name</th>
                                <th className="pb-2 font-medium">Purpose</th>
                                <th className="pb-2 font-medium">Duration</th>
                              </tr>
                            </thead>
                            <tbody className="text-slate-600 dark:text-slate-400">
                              {category.cookies.map((cookie, idx) => (
                                <tr key={idx} className="border-t border-slate-100 dark:border-slate-800">
                                  <td className="py-2 font-mono text-xs">{cookie.name}</td>
                                  <td className="py-2">{cookie.purpose}</td>
                                  <td className="py-2 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {cookie.duration}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Detailed Policy Sections */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Cookie Policy Details
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {cookiePolicySections.map((section, idx) => (
                  <AccordionItem 
                    key={section.id} 
                    value={section.id}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl mb-3 px-6 data-[state=open]:border-blue-300 dark:data-[state=open]:border-blue-800"
                  >
                    <AccordionTrigger className="text-left font-semibold text-slate-900 dark:text-white hover:no-underline py-4">
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        {section.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 pl-9">
                      {section.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Browser Instructions */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Managing Cookies in Your Browser
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                You can also control cookies through your browser settings. Here's how to manage cookies in popular browsers:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'Google Chrome', path: 'Settings → Privacy → Cookies' },
                  { name: 'Mozilla Firefox', path: 'Options → Privacy → Cookies' },
                  { name: 'Safari', path: 'Preferences → Privacy → Cookies' },
                  { name: 'Microsoft Edge', path: 'Settings → Cookies' }
                ].map((browser) => (
                  <div key={browser.name} className="p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="font-semibold text-slate-900 dark:text-white mb-1">{browser.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{browser.path}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Cookies Section */}
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                    Clear All Cookies
                  </h3>
                  <p className="text-red-700 dark:text-red-300 text-sm mb-4">
                    This will remove all cookies including your saved preferences, login sessions, and course progress. You will need to log in again and reconfigure your settings.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/20"
                    onClick={() => {
                      localStorage.removeItem('cookie_preferences');
                      document.cookie.split(";").forEach(function(c) { 
                        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                      });
                      window.location.reload();
                    }}
                  >
                    Clear All Cookies
                  </Button>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              
              {/* Quick Stats */}
              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                  <Cookie className="w-5 h-5" />
                  Cookie Overview
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700 dark:text-blue-300">Total Cookies</span>
                    <span className="font-semibold text-blue-900 dark:text-blue-100">16 active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700 dark:text-blue-300">Essential</span>
                    <span className="font-semibold text-blue-900 dark:text-blue-100">4 required</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700 dark:text-blue-300">Optional</span>
                    <span className="font-semibold text-blue-900 dark:text-blue-100">12 configurable</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700 dark:text-blue-300">Third Parties</span>
                    <span className="font-semibold text-blue-900 dark:text-blue-100">6 partners</span>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Cookie Concerns?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  If you have questions about our cookie practices or need assistance managing your preferences.
                </p>
                <Button className="w-full rounded-xl" asChild>
                  <Link href="mailto:privacy@hassandigitalskills.com">
                    Contact Privacy Team
                  </Link>
                </Button>
              </div>

              {/* Related Links */}
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-900 dark:text-white px-2">Related Policies</h3>
                <Link 
                  href="/privacy" 
                  className="flex items-center justify-between p-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <span>Privacy Policy</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/terms" 
                  className="flex items-center justify-between p-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <span>Terms of Service</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2026 Hassan Digital Skills. All rights reserved.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <Link href="/privacy">Privacy Policy</Link>
              </Button>
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <Link href="/terms">Terms of Service</Link>
              </Button>
            </div>
          </div>
        </div>

      </div>

    </main>
  );
}