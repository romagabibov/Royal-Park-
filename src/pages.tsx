import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Wind, Shield, Leaf, Phone, Mail, MapPin, X } from 'lucide-react';
import { useI18n } from './i18n';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import AutoScroll from 'embla-carousel-auto-scroll';
import emailjs from '@emailjs/browser';

import { HandDrawnImage, LogoIcon } from './components';

const getOptimizedUrl = (url: string, transform: string) => {
  if (!url.includes('upload/')) return url;
  return url.replace('upload/', `upload/${transform}/`);
};

const desktopHeroImages = [
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774897726/IMG_4381_jxltwy.jpg",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774897732/IMG_4420_otyrup.jpg",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774897809/0S3A7708_knbdoc.jpg",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1778133683/Gemini_Generated_Image_3o3g9e3o3g9e3o3g_xpet55.png",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774899659/0S3A7377_1_fwpxtd.jpg",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774899740/0S3A7602_f7sn49.jpg",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774903934/0S3A7593_nsdfi2.jpg",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774903674/0S3A7568_2_ciamdu.jpg",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1778132933/0S3A7738_1_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F1_1_qllqx4.webp",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1778133119/0S3A7683_1_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F1_1_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F2_kxrapt.webp",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1778133185/0S3A7630-_%D0%9F1_q2hmcr.webp",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1778133187/0S3A7632-_%D0%9F1_zt9yul.webp"
];

const mobileHeroImages = [
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774903684/0S3A7761_po2euw.jpg",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774903676/0S3A7718_cnue0p.jpg",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774903675/IMG_4383_gzqn05.jpg",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774903674/0S3A7568_2_ciamdu.jpg",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774904901/ChatGPT_Image_31_%D0%BC%D0%B0%D1%80._2026_%D0%B3._01_06_38_dx8iog.png",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774904902/ChatGPT_Image_31_%D0%BC%D0%B0%D1%80._2026_%D0%B3._01_07_58_ugzvse.png",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1774905331/ChatGPT_Image_31_%D0%BC%D0%B0%D1%80._2026_%D0%B3._01_14_40_rajl2i.png",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1778132933/0S3A7683_1_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F1_1_v0hogd.webp",
  "https://res.cloudinary.com/dbnhwdyve/image/upload/v1778133187/0S3A7687-_%D0%9F1_fxped6.webp"
];

const generateShuffledIndices = (length: number, lastIndex?: number) => {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  // Ensure the first item is not the same as the last item of the previous round
  if (lastIndex !== undefined && indices[0] === lastIndex && indices.length > 1) {
    [indices[0], indices[1]] = [indices[1], indices[0]];
  }
  return indices;
};

export const Home = () => {
  const { t } = useI18n();
  const [currentDesktopIdx, setCurrentDesktopIdx] = React.useState(0);
  const [currentMobileIdx, setCurrentMobileIdx] = React.useState(0);
  
  const desktopQueue = React.useRef<number[]>([]);
  const mobileQueue = React.useRef<number[]>([]);

  React.useEffect(() => {
    // Initialize queues
    desktopQueue.current = generateShuffledIndices(desktopHeroImages.length);
    mobileQueue.current = generateShuffledIndices(mobileHeroImages.length);

    // Set initial images
    setCurrentDesktopIdx(desktopQueue.current.shift()!);
    setCurrentMobileIdx(mobileQueue.current.shift()!);

    const timer = setInterval(() => {
      setCurrentDesktopIdx((prev) => {
        if (desktopQueue.current.length === 0) {
          desktopQueue.current = generateShuffledIndices(desktopHeroImages.length, prev);
        }
        return desktopQueue.current.shift()!;
      });
      
      setCurrentMobileIdx((prev) => {
        if (mobileQueue.current.length === 0) {
          mobileQueue.current = generateShuffledIndices(mobileHeroImages.length, prev);
        }
        return mobileQueue.current.shift()!;
      });
    }, 6000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* Hero Section with Slider */}
      <section className="relative h-screen w-full overflow-hidden bg-[#efefe6] pt-[90px] md:pt-[110px] pb-4 md:pb-6 px-4 md:px-6 flex flex-col items-center">
        {/* Hero Container */}
        <div className="relative w-full max-w-[1920px] flex-1 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl z-10">
          <div className="absolute inset-0 bg-charcoal/5 z-10" />
          
          {/* Desktop Images */}
          <div className="hidden md:block absolute inset-0">
            {desktopHeroImages.map((src, idx) => (
              <motion.img
                key={src}
                src={getOptimizedUrl(src, 'q_auto,f_auto,w_1920')}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ 
                  opacity: idx === currentDesktopIdx ? 1 : 0,
                  scale: idx === currentDesktopIdx ? 1 : 1.05
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Royal Park"
              />
            ))}
          </div>

          {/* Mobile Images */}
          <div className="block md:hidden absolute inset-0">
            {mobileHeroImages.map((src, idx) => (
              <motion.img
                key={src}
                src={getOptimizedUrl(src, 'q_auto,f_auto,w_800,ar_9:16,c_fill')}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ 
                  opacity: idx === currentMobileIdx ? 1 : 0,
                  scale: idx === currentMobileIdx ? 1 : 1.05
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Royal Park"
              />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// Preload images to prevent loading delays when navigating
if (typeof window !== 'undefined') {
  const preloadList = [
    ...desktopHeroImages.map(src => getOptimizedUrl(src, 'q_auto,f_auto,w_1920')),
    ...mobileHeroImages.map(src => getOptimizedUrl(src, 'q_auto,f_auto,w_800,ar_9:16,c_fill')),
    getOptimizedUrl("https://res.cloudinary.com/dtjgjl5os/image/upload/v1774607901/Png_eskiz_th2_uznnrs.png", 'q_auto,f_auto,w_1200'),
    getOptimizedUrl("https://res.cloudinary.com/dtjgjl5os/image/upload/v1774607901/C_blok_esk%C4%B1z_png_xpt7bu.png", 'q_auto,f_auto,w_1200')
  ];

  const preload = () => {
    preloadList.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };

  // Start preloading after a short delay to not block the initial render
  setTimeout(preload, 1000);
}

export const Residences = () => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'townhouse' | 'villa'>('townhouse');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const plans = {
    townhouse: {
      title: "Townhouse",
      image: getOptimizedUrl("https://res.cloudinary.com/dtjgjl5os/image/upload/v1774607901/Png_eskiz_th2_uznnrs.png", 'f_auto,q_auto,w_1200')
    },
    villa: {
      title: "Villa",
      image: getOptimizedUrl("https://res.cloudinary.com/dtjgjl5os/image/upload/v1774607901/C_blok_esk%C4%B1z_png_xpt7bu.png", 'f_auto,q_auto,w_1200')
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="pt-32 pb-24 px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl md:text-7xl font-serif font-light mb-8 md:mb-16 text-center"
      >
        {t.nav.floorPlans || t.nav.residences}
      </motion.h1>

      <div className="flex flex-col items-center">
        {/* Tabs */}
        <div className="flex items-center gap-4 md:gap-8 mb-12 border-b border-charcoal/10 pb-4">
          <button 
            onClick={() => setActiveTab('townhouse')}
            className={`text-lg md:text-xl font-serif transition-colors ${activeTab === 'townhouse' ? 'text-olive' : 'text-charcoal/40 hover:text-charcoal/70'}`}
          >
            Townhouse
          </button>
          <button 
            onClick={() => setActiveTab('villa')}
            className={`text-lg md:text-xl font-serif transition-colors ${activeTab === 'villa' ? 'text-olive' : 'text-charcoal/40 hover:text-charcoal/70'}`}
          >
            Villa
          </button>
        </div>

        {/* Plan Display */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-charcoal/5"
        >
          <h2 className="text-2xl font-serif text-center mb-8 text-charcoal">{plans[activeTab].title}</h2>
          <div 
            className="w-full aspect-auto md:aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden cursor-zoom-in flex items-center justify-center p-4"
            onClick={() => setZoomedImage(plans[activeTab].image)}
          >
            <img 
              src={plans[activeTab].image} 
              alt={plans[activeTab].title} 
              className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700"
            />
          </div>
          <p className="text-center text-sm text-charcoal/50 mt-6 font-light uppercase tracking-widest">
            {t.residences.clickToEnlarge}
          </p>
        </motion.div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-milky/95 p-4 md:p-12 cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-charcoal/50 hover:text-charcoal transition-colors z-[120]"
              onClick={() => setZoomedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={zoomedImage}
              alt="Zoomed Floor Plan"
              className="max-w-[95vw] max-h-[90vh] md:max-w-full md:max-h-full object-contain rounded-lg shadow-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Contact = () => {
  const { t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>('idle');

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Please replace these with your actual EmailJS credentials
    // 1. Create an account at https://www.emailjs.com/
    // 2. Add an Email Service (e.g., Gmail) and get the SERVICE_ID
    // 3. Create an Email Template and get the TEMPLATE_ID
    // 4. Get your PUBLIC_KEY from Account -> API Keys
    const SERVICE_ID = 'service_30rhtps';
    const TEMPLATE_ID = 'template_zym51wd';
    const PUBLIC_KEY = 'Dt_a9Rc7vlNnLyDb9';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
          console.log('SUCCESS!', result.text);
          setSubmitStatus('success');
          formRef.current?.reset();
      }, (error) => {
          console.error('FAILED...', error);
          // Store the actual error message to display it
          setSubmitStatus(error.text || 'error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="pt-32 pb-24 px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl md:text-7xl font-serif font-light mb-6 text-center"
      >
        {t.contact.title}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-charcoal-light font-light max-w-4xl mx-auto mb-20"
      >
        {t.contact.desc}
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-olive/10"
        >
          <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-charcoal-light font-medium">{t.contact.form_name}</label>
              <input type="text" name="name" required className="w-full border-b border-charcoal/20 pb-2 bg-transparent focus:outline-none focus:border-olive transition-colors font-light" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-charcoal-light font-medium">{t.contact.form_email}</label>
              <input type="email" name="email" required className="w-full border-b border-charcoal/20 pb-2 bg-transparent focus:outline-none focus:border-olive transition-colors font-light" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-charcoal-light font-medium">{t.contact.form_phone}</label>
              <input type="tel" name="phone" className="w-full border-b border-charcoal/20 pb-2 bg-transparent focus:outline-none focus:border-olive transition-colors font-light" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-charcoal-light font-medium">{t.contact.form_message}</label>
              <textarea name="message" required rows={4} className="w-full border-b border-charcoal/20 pb-2 bg-transparent focus:outline-none focus:border-olive transition-colors font-light resize-none"></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-olive text-milky py-4 rounded-full uppercase tracking-widest text-sm font-medium hover:bg-olive-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : t.contact.form_submit}
            </button>
            
            {submitStatus === 'success' && (
              <p className="text-green-600 text-sm text-center mt-4">Message sent successfully!</p>
            )}
            {submitStatus !== 'idle' && submitStatus !== 'success' && (
              <p className="text-red-600 text-sm text-center mt-4">Failed to send message: {submitStatus}. Please try again or check EmailJS configuration.</p>
            )}
          </form>
        </motion.div>

        {/* Contact Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col justify-center space-y-12"
        >
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive shrink-0">
              <MapPin size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest text-charcoal-light font-medium mb-2">{t.contact.info_address}</h3>
              <p className="font-serif text-2xl">{t.contact.address_val}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive shrink-0">
              <Phone size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest text-charcoal-light font-medium mb-2">{t.contact.info_phone}</h3>
              <p className="font-serif text-2xl">(+994 51) 252-56-56</p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive shrink-0">
              <Mail size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest text-charcoal-light font-medium mb-2">{t.contact.info_email}</h3>
              <p className="font-serif text-2xl">sales@royalpark.az</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
