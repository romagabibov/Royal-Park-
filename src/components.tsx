import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Instagram, Map, Facebook, User } from 'lucide-react';
import { useI18n } from './i18n';

export const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const LogoIcon = ({ className = "", isDark = false, colorHex }: { className?: string, isDark?: boolean, colorHex?: string }) => {
  if (colorHex) {
    return (
      <div className={`relative ${className}`}>
        <img 
          src="https://res.cloudinary.com/dbnhwdyve/image/upload/f_auto,q_auto/v1774900461/Untitled_3_fsmi4e.webp" 
          alt="Royal Park Logo" 
          className="w-full h-full opacity-0"
        />
        <div 
          className="absolute inset-0 transition-colors duration-500"
          style={{
            backgroundColor: colorHex,
            WebkitMaskImage: `url(https://res.cloudinary.com/dbnhwdyve/image/upload/f_auto,q_auto/v1774900461/Untitled_3_fsmi4e.webp)`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskImage: `url(https://res.cloudinary.com/dbnhwdyve/image/upload/f_auto,q_auto/v1774900461/Untitled_3_fsmi4e.webp)`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
          }}
        />
      </div>
    );
  }

  return (
    <img 
      src="https://res.cloudinary.com/dbnhwdyve/image/upload/f_auto,q_auto/v1774900461/Untitled_3_fsmi4e.webp" 
      alt="Royal Park Logo" 
      className={`object-contain transition-all duration-500 ${isDark ? 'brightness-0 opacity-70' : 'brightness-0 invert'} ${className}`} 
    />
  );
};

export const Preloader = ({ onComplete }: { onComplete: () => void; key?: React.Key }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-olive flex flex-col items-center justify-center text-milky overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 } }}
      style={{ willChange: "opacity" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.4, filter: "blur(16px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        exit={{ scale: 25, opacity: 0, filter: "blur(8px)", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
        className="flex flex-col items-center"
        style={{ willChange: "transform, opacity, filter" }}
      >
        <LogoIcon isDark={false} className="w-64 md:w-80 h-auto" />
      </motion.div>
    </motion.div>
  );
};

export const HandDrawnImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ 
          opacity: 0, 
          scale: 1.05
        }}
        whileInView={{ 
          opacity: 1, 
          scale: 1
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isDarkPage = location.pathname === '/';
  const navBg = menuOpen ? 'bg-transparent' : 'bg-[#b1ba88] shadow-sm';
  const navText = menuOpen ? 'text-milky' : 'text-[#edebe1]';
  const logoColor = menuOpen ? '#efefe6' : '#edebe1';

  return (
    <>
      <div className="texture-bg" />
      <div className="min-h-screen bg-milky text-charcoal font-sans selection:bg-olive selection:text-milky flex flex-col relative z-10">
        {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-2 md:px-12 flex justify-between items-center transition-all duration-300 ${navBg} ${navText}`}>
        <Link 
          to="/" 
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center relative z-50 group"
        >
          <LogoIcon colorHex={logoColor} className="w-14 md:w-20 h-auto transition-transform group-hover:scale-105" />
        </Link>
        
        <div className="flex items-center gap-4 md:gap-6 relative z-50">
          <Link 
            to="#" 
            className="hidden md:block px-4 py-1.5 border border-current rounded-full text-[14px] tracking-wide lowercase font-medium hover:bg-white/10 transition-colors"
          >
            {t.nav.residentPortal}
          </Link>
          <Link 
            to="#" 
            className="md:hidden p-2 hover:opacity-70 transition-opacity"
            aria-label={t.nav.residentPortal}
          >
            <User size={24} strokeWidth={1.5} />
          </Link>
          <div className="hidden md:flex items-center gap-4 text-xs tracking-widest uppercase font-semibold">
            <button onClick={() => setLang('en')} className={lang === 'en' ? 'text-white' : 'opacity-70 hover:opacity-100'}>EN</button>
            <button onClick={() => setLang('ru')} className={lang === 'ru' ? 'text-white' : 'opacity-70 hover:opacity-100'}>RU</button>
            <button onClick={() => setLang('az')} className={lang === 'az' ? 'text-white' : 'opacity-70 hover:opacity-100'}>AZ</button>
          </div>
          <button onClick={toggleMenu} className="p-2 hover:opacity-70 transition-opacity cursor-pointer">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-olive text-[#edebe1] flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8 text-3xl md:text-5xl font-serif font-light">
              <Link to="/" onClick={toggleMenu} className="hover:text-white transition-colors">{t.nav.home}</Link>
              <Link to="/residences" onClick={toggleMenu} className="hover:text-white transition-colors">{t.nav.floorPlans || t.nav.residences}</Link>
              <Link to="/contact" onClick={toggleMenu} className="hover:text-white transition-colors">{t.nav.contact}</Link>
              <Link to="#" onClick={toggleMenu} className="hover:text-white transition-colors">{t.nav.residentPortal}</Link>
            </div>
            
            <div className="absolute bottom-12 flex md:hidden items-center gap-6 text-sm tracking-widest uppercase font-semibold">
              <button onClick={() => setLang('en')} className={lang === 'en' ? 'text-[#edebe1]' : 'text-[#edebe1]/50'}>EN</button>
              <button onClick={() => setLang('ru')} className={lang === 'ru' ? 'text-[#edebe1]' : 'text-[#edebe1]/50'}>RU</button>
              <button onClick={() => setLang('az')} className={lang === 'az' ? 'text-[#edebe1]' : 'text-[#edebe1]/50'}>AZ</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-footer-bg text-footer-text py-12 md:py-10 px-6 md:px-12 transition-colors duration-500">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-10 mb-12 md:mb-8">
            {/* Logo & Desc */}
            <div className="flex justify-center md:justify-start items-center md:items-start text-center md:text-left w-full md:w-auto">
              <LogoIcon colorHex="#efefe6" className="w-40 md:w-48 h-auto" />
            </div>
            
            {/* Action & Socials */}
            <div className="flex flex-col justify-between items-center md:items-end w-full md:w-auto mt-6 md:mt-0">
              <Link to="/contact" className="text-[#edebe1] uppercase tracking-widest text-sm font-medium hover:text-white transition-all text-center mb-8 md:mb-0">
                {t.nav.contact}
              </Link>
              <div className="flex items-center gap-4 w-full justify-center md:justify-end">
                <a href="https://www.instagram.com/royalpark.residentialcomplex/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#edebe1]/30 text-[#edebe1] flex items-center justify-center hover:bg-olive hover:text-milky hover:border-olive transition-all">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61585679425959&mibextid=wwXIfr&rdid=kORMTXlJpUhgkRLe&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AMA4sLMge%2F%3Fmibextid%3DwwXIfr#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#edebe1]/30 text-[#edebe1] flex items-center justify-center hover:bg-olive hover:text-milky hover:border-olive transition-all">
                  <Facebook size={18} />
                </a>
                <a href="https://www.tiktok.com/@royalpark.baku" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#edebe1]/30 text-[#edebe1] flex items-center justify-center hover:bg-olive hover:text-milky hover:border-olive transition-all">
                  <TikTokIcon size={18} />
                </a>
                <a href="https://maps.app.goo.gl/ju6vDLKyYsS4odJDA" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#edebe1]/30 text-[#edebe1] flex items-center justify-center hover:bg-olive hover:text-milky hover:border-olive transition-all">
                  <Map size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Horizontal Bar */}
          <div className="pt-6 border-t border-footer-text/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-footer-text/60 font-light">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4">
              <button onClick={() => setLegalModalOpen(true)} className="hover:text-olive transition-colors">{t.footer.privacy}</button>
              <button onClick={() => setLegalModalOpen(true)} className="hover:text-olive transition-colors">{t.footer.terms}</button>
              <button onClick={() => setLegalModalOpen(true)} className="hover:text-olive transition-colors">{t.footer.cookies}</button>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-center md:text-right">
              <div>&copy; 2026 Royal Park. {t.footer.rights}</div>
              <div className="uppercase tracking-widest text-[10px]">
                Powered by <a href="https://coyora.studio/" target="_blank" rel="noopener noreferrer" className="hover:text-olive transition-colors underline underline-offset-2">Coyora Studio</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      <AnimatePresence>
        {legalModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-charcoal/40"
            onClick={() => setLegalModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-milky w-full max-w-2xl mx-auto max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl p-6 md:p-10 relative text-charcoal"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setLegalModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-charcoal/50 hover:text-olive transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-serif mb-8 text-olive">{t.legal.title}</h2>
              
              <div className="space-y-8 font-light text-sm md:text-base leading-relaxed text-charcoal/80">
                <section>
                  <h3 className="text-lg font-medium text-charcoal mb-3">{t.legal.data_protection_title}</h3>
                  <p className="mb-2">{t.legal.data_protection_p1}</p>
                  <p>{t.legal.data_protection_p2}</p>
                </section>
                
                <section>
                  <h3 className="text-lg font-medium text-charcoal mb-3">{t.legal.rights_title}</h3>
                  <p className="mb-2">{t.legal.rights_p1}</p>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>{t.legal.rights_li1}</li>
                    <li>{t.legal.rights_li2}</li>
                    <li>{t.legal.rights_li3}</li>
                  </ul>
                  <p>{t.legal.rights_p2} <a href="mailto:office@royalpark.az" className="text-olive hover:underline">office@royalpark.az</a></p>
                </section>
                
                <section>
                  <h3 className="text-lg font-medium text-charcoal mb-3">{t.legal.cookies_title}</h3>
                  <p className="mb-2">{t.legal.cookies_p1}</p>
                  <p className="mb-2">{t.legal.cookies_p2}</p>
                  <p>{t.legal.cookies_p3}</p>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};
