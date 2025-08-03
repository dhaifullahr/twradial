"use client";

import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import ControlPanel from '@/components/ControlPanel';
import PreviewPanel from '@/components/PreviewPanel';
import Footer from '@/components/Footer'; 
import GradientGenerator from '@/lib/gradientGenerator';

export default function Home() {
  const generatorRef = useRef<GradientGenerator | null>(null);

  useEffect(() => {
    generatorRef.current = new GradientGenerator();

    return () => {
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-8">
          <ControlPanel />
          <PreviewPanel />
        </div>
      </main>
      <Footer />
      <div id="toast" className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl transform translate-y-full opacity-0 transition-all duration-300 z-50">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
          <span>Copied to clipboard!</span>
        </div>
      </div>
    </div>
  );
}