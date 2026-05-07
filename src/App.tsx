/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { I18nProvider } from './i18n';
import { Preloader, Layout } from './components';
import { Home, Residences, Contact } from './pages';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <I18nProvider>
      <Router>
        <AnimatePresence mode="wait">
          {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        
        {!loading && (
          <Layout>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/residences" element={<Residences />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        )}
      </Router>
      <SpeedInsights />
    </I18nProvider>
  );
}
