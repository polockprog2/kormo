import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.findWork': 'Find Work',
    'nav.hireWorker': 'Hire a Worker',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.profile': 'Profile',
    'nav.messages': 'Messages',
    'nav.myJobs': 'My Jobs',
    'nav.browseJobs': 'Browse Jobs',
    'nav.appliedJobs': 'Applied Jobs',
    
    // Home Page
    'home.tagline': 'Local Work, Local Workers – KajKhuji',
    'home.subtitle': 'Connect with skilled professionals in your city',
    'home.howItWorks': 'How It Works',
    'home.step1.title': 'Post Your Job',
    'home.step1.desc': 'Describe what you need done',
    'home.step2.title': 'Get Applications',
    'home.step2.desc': 'Receive proposals from local workers',
    'home.step3.title': 'Hire & Pay',
    'home.step3.desc': 'Work together and pay securely',
    
    // Job Related
    'job.postJob': 'Post a Job',
    'job.apply': 'Apply',
    'job.title': 'Job Title',
    'job.category': 'Category',
    'job.description': 'Description',
    'job.budget': 'Budget',
    'job.deadline': 'Deadline',
    'job.location': 'Location',
    'job.posted': 'Posted',
    'job.applicants': 'Applicants',
    'job.status.open': 'Open',
    'job.status.ongoing': 'Ongoing',
    'job.status.completed': 'Completed',
    
    // Categories
    'category.webDevelopment': 'Web Development',
    'category.graphicDesign': 'Graphic Design',
    'category.contentWriting': 'Content Writing',
    'category.dataEntry': 'Data Entry',
    'category.mobileApp': 'Mobile App',
    'category.other': 'Other',
    
    // Profile
    'profile.edit': 'Edit Profile',
    'profile.experience': 'Experience',
    'profile.skills': 'Skills',
    'profile.rating': 'Rating',
    'profile.pastJobs': 'Past Jobs',
    
    // Footer
    'footer.privacy': 'Privacy Policy',
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    
    // Common
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.city': 'City',
    'common.payRange': 'Pay Range',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.loading': 'Loading...',
  },
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.findWork': 'কাজ খুঁজুন',
    'nav.hireWorker': 'কর্মী নিয়োগ',
    'nav.login': 'লগইন',
    'nav.register': 'নিবন্ধন',
    'nav.logout': 'লগআউট',
    'nav.profile': 'প্রোফাইল',
    'nav.messages': 'বার্তা',
    'nav.myJobs': 'আমার কাজ',
    'nav.browseJobs': 'কাজ খুঁজুন',
    'nav.appliedJobs': 'আবেদিত কাজ',
    
    // Home Page
    'home.tagline': 'স্থানীয় কাজ, স্থানীয় কর্মী – কাজখুঁজি',
    'home.subtitle': 'আপনার শহরের দক্ষ পেশাদারদের সাথে যুক্ত হন',
    'home.howItWorks': 'কিভাবে কাজ করে',
    'home.step1.title': 'আপনার কাজ পোস্ট করুন',
    'home.step1.desc': 'কি করতে হবে তা বর্ণনা করুন',
    'home.step2.title': 'আবেদন পান',
    'home.step2.desc': 'স্থানীয় কর্মীদের থেকে প্রস্তাব পান',
    'home.step3.title': 'নিয়োগ ও পেমেন্ট',
    'home.step3.desc': 'একসাথে কাজ করুন এবং নিরাপদে পেমেন্ট করুন',
    
    // Job Related
    'job.postJob': 'কাজ পোস্ট করুন',
    'job.apply': 'আবেদন করুন',
    'job.title': 'কাজের শিরোনাম',
    'job.category': 'ক্যাটেগরি',
    'job.description': 'বিবরণ',
    'job.budget': 'বাজেট',
    'job.deadline': 'শেষ তারিখ',
    'job.location': 'অবস্থান',
    'job.posted': 'পোস্ট করা হয়েছে',
    'job.applicants': 'আবেদনকারী',
    'job.status.open': 'খোলা',
    'job.status.ongoing': 'চলমান',
    'job.status.completed': 'সম্পন্ন',
    
    // Categories
    'category.webDevelopment': 'ওয়েব ডেভেলপমেন্ট',
    'category.graphicDesign': 'গ্রাফিক ডিজাইন',
    'category.contentWriting': 'কন্টেন্ট রাইটিং',
    'category.dataEntry': 'ডেটা এন্ট্রি',
    'category.mobileApp': 'মোবাইল অ্যাপ',
    'category.other': 'অন্যান্য',
    
    // Profile
    'profile.edit': 'প্রোফাইল এডিট',
    'profile.experience': 'অভিজ্ঞতা',
    'profile.skills': 'দক্ষতা',
    'profile.rating': 'রেটিং',
    'profile.pastJobs': 'পূর্বের কাজ',
    
    // Footer
    'footer.privacy': 'গোপনীয়তা নীতি',
    'footer.about': 'আমাদের সম্পর্কে',
    'footer.contact': 'যোগাযোগ',
    
    // Common
    'common.search': 'খুঁজুন',
    'common.filter': 'ফিল্টার',
    'common.city': 'শহর',
    'common.payRange': 'বেতন পরিসীমা',
    'common.submit': 'জমা দিন',
    'common.cancel': 'বাতিল',
    'common.save': 'সংরক্ষণ',
    'common.loading': 'লোড হচ্ছে...',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}