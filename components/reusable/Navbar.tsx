'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Moon,
  Sun,
  ArrowUpRight,
  Search,
  Bell,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Courses', href: '/courses' },
  { name: 'Scholarship', href: '/scholarship' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const pathname = usePathname();

  // Initialize theme
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 h-20">
        <div className="max-w-350 mx-auto px-6 h-full flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#3495EB] to-[#8B5CF6] animate-pulse" />
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Main Navbar - Floating Glassmorphism Design */}
      <nav
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-350 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
          isScrolled
            ? 'top-3'
            : 'top-4 sm:top-6'
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-500',
            isScrolled
              ? 'bg-white/80 dark:bg-[#0B1220]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(52,149,235,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-[#E5E7EB]/60 dark:border-[#1F2937]/60'
              : 'bg-white/60 dark:bg-[#0B1220]/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border-[#E5E7EB]/40 dark:border-[#1F2937]/40'
          )}
        >
          {/* Animated linear Border */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-linear-to-r from-[#3495EB]/20 via-[#8B5CF6]/20 to-[#3495EB]/20 opacity-0 transition-opacity duration-500 pointer-events-none"
               style={{ opacity: isScrolled ? 1 : 0 }} 
          />
          
          {/* Inner Content */}
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-18">
              
              {/* Logo Section - Premium Style */}
              <Link 
                href="/" 
                className="flex items-center gap-3 group relative z-10"
              >
                {/* Logo with Soft Glow */}
                <div className="relative">
                  {/* Soft Glow on Hover */}
                  <div className="absolute -inset-2 bg-linear-to-r from-[#3495EB]/30 to-[#8B5CF6]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Logo Container */}
                  <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-[#3495EB] via-[#347ce0] to-[#8B5CF6] p-0.5 shadow-lg shadow-[#3495EB]/20 group-hover:shadow-[#3495EB]/40 transition-all duration-300 group-hover:scale-105">
                    <div className="w-full h-full rounded-[10px] bg-white dark:bg-[#111827] flex items-center justify-center overflow-hidden">
                      <Image
                        src="/logo.webp"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Brand Text */}
                <div className="hidden sm:flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-[#111827] dark:text-white leading-none group-hover:text-[#3495EB] transition-colors duration-300">
                    Hassan Digital
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                    Skills
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation - Modern Pill Design */}
              <div className="hidden lg:flex items-center">
                <nav className="flex items-center gap-1 p-1.5 rounded-full bg-[#F9FAFB] dark:bg-[#111827]/80 border border-[#E5E7EB]/50 dark:border-[#1F2937]/50">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const isHovered = activeHover === link.name;
                    
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onMouseEnter={() => setActiveHover(link.name)}
                        onMouseLeave={() => setActiveHover(null)}
                        className={cn(
                          'relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out',
                          isActive
                            ? 'text-white'
                            : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white'
                        )}
                      >
                        {/* Active Background */}
                        {isActive && (
                          <span className="absolute inset-0 rounded-full bg-linear-to-r from-[#3495EB] to-[#347ce0] shadow-md shadow-[#3495EB]/25" />
                        )}
                        
                        {/* Hover Background */}
                        {!isActive && isHovered && (
                          <span className="absolute inset-0 rounded-full bg-[#E5E7EB]/50 dark:bg-[#1F2937]/50" />
                        )}
                        
                        <span className="relative z-10 flex items-center gap-2">
                          {link.name}
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse" />
                          )}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Right Actions - Premium Style */}
              <div className="flex items-center gap-2 sm:gap-3">
                
                {/* Search - Desktop */}
                {/* 
                {/* Theme Toggle - Premium */}
                <button
                  onClick={toggleTheme}
                  className={cn(
                    'relative flex items-center justify-center w-10 h-10 rounded-full',
                    'bg-[#F9FAFB] dark:bg-[#111827] text-[#6B7280] dark:text-[#9CA3AF]',
                    'border border-[#E5E7EB]/50 dark:border-[#1F2937]/50',
                    'hover:border-[#3495EB]/50 hover:text-[#3495EB] transition-all duration-300',
                    'focus:outline-none focus:ring-2 focus:ring-[#3495EB]/20'
                  )}
                  aria-label="Toggle theme"
                >
                  <div className="relative w-4 h-4">
                    <Sun
                      className={cn(
                        'absolute inset-0 w-4 h-4 transition-all duration-500 rotate-0 scale-100',
                        isDark && 'rotate-90 scale-0 opacity-0'
                      )}
                    />
                    <Moon
                      className={cn(
                        'absolute inset-0 w-4 h-4 transition-all duration-500 -rotate-90 scale-0 opacity-0',
                        isDark && 'rotate-0 scale-100 opacity-100'
                      )}
                    />
                  </div>
                </button>

                {/* CTA Button - Premium linear */}
                <Button
                  asChild
                  className={cn(
                    'hidden sm:flex relative overflow-hidden rounded-full px-6 h-10 font-semibold text-sm',
                    'bg-linear-to-r from-[#3495EB] to-[#347ce0] text-white',
                    'shadow-lg shadow-[#3495EB]/25 hover:shadow-xl hover:shadow-[#3495EB]/30',
                    'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
                    'transition-all duration-300 ease-out',
                    'group border-0'
                  )}
                >
                  <Link href="/login" className="flex items-center gap-2">
                    <span>Get Started</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>

                {/* Mobile Menu Trigger */}
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn(
                        'lg:hidden flex items-center justify-center w-10 h-10 rounded-full',
                        'bg-[#F9FAFB] dark:bg-[#111827] text-[#6B7280] dark:text-[#9CA3AF]',
                        'border border-[#E5E7EB]/50 dark:border-[#1F2937]/50',
                        'hover:bg-white dark:hover:bg-[#0B1220] hover:text-[#3495EB]'
                      )}
                    >
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  
                  {/* Mobile Menu - Premium Sheet */}
                  <SheetContent 
                    side="right" 
                    className="w-full sm:w-105 bg-white dark:bg-[#0B1220] border-l border-[#E5E7EB]/50 dark:border-[#1F2937]/50 p-0"
                  >
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-linear-to-br from-[#3495EB]/5 via-transparent to-[#8B5CF6]/5 dark:from-[#3495EB]/10 dark:to-[#8B5CF6]/10 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#3495EB]/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <SheetHeader className="relative p-6 border-b border-[#E5E7EB]/50 dark:border-[#1F2937]/50">
                      <SheetTitle>
                        <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-linear-to-br from-[#3495EB] to-[#8B5CF6] shadow-lg shadow-[#3495EB]/20">
                            <Image
                              src="/logo.webp"
                              alt="Hassan Digital Skills"
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-[#111827] dark:text-white">Hassan Digital</span>
                            <span className="text-xs font-medium tracking-wider uppercase text-[#3495EB]">Skills</span>
                          </div>
                        </Link>
                      </SheetTitle>
                    </SheetHeader>
                    
                    <nav className="relative flex flex-col p-6">
                      <div className="space-y-1">
                        {navLinks.map((link, index) => {
                          const isActive = pathname === link.href;
                          return (
                            <SheetClose asChild key={link.name}>
                              <Link
                                href={link.href}
                                className={cn(
                                  'flex items-center justify-between px-5 py-4 rounded-xl text-base font-semibold transition-all duration-300',
                                  isActive
                                    ? 'bg-linear-to-r from-[#3495EB] to-[#347ce0] text-white shadow-lg shadow-[#3495EB]/25'
                                    : 'text-[#6B7280] dark:text-[#9CA3AF] hover:bg-[#F9FAFB] dark:hover:bg-[#111827]'
                                )}
                                style={{ 
                                  animationDelay: `${index * 50}ms`,
                                }}
                              >
                                <span>{link.name}</span>
                                <ArrowUpRight className={cn(
                                  'w-5 h-5 transition-all',
                                  isActive ? 'opacity-100' : 'opacity-0'
                                )} />
                              </Link>
                            </SheetClose>
                          );
                        })}
                      </div>

                      {/* Mobile Actions */}
                      <div className="mt-8 space-y-3">
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F9FAFB] dark:bg-[#111827] border border-[#E5E7EB]/50 dark:border-[#1F2937]/50">
                          <span className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">Theme</span>
                          <div className="flex-1" />
                          <button
                            onClick={toggleTheme}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#0B1220] border border-[#E5E7EB] dark:border-[#1F2937] text-sm"
                          >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            <span>{isDark ? 'Light' : 'Dark'}</span>
                          </button>
                        </div>

                        <SheetClose asChild>
                          <Button
                            asChild
                            className="w-full rounded-xl py-6 text-base font-bold bg-linear-to-r from-[#3495EB] to-[#347ce0] text-white hover:shadow-xl transition-all border-0"
                          >
                            <Link href="/get-started" className="flex items-center justify-center gap-2">
                              Get Started Now
                              <ArrowUpRight className="w-5 h-5" />
                            </Link>
                          </Button>
                        </SheetClose>
                      </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-24 sm:h-28" />
    </>
  );
}