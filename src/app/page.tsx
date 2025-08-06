"use client";

import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
import ControlPanel from '@/components/ControlPanel';
import PreviewPanel from '@/components/PreviewPanel';
import Footer from '@/components/Footer';
import { useGradientGenerator } from '@/hooks/useGradientGenerator'; 

export default function Home() {
  const {
    colors,
    colorCountText,
    cssOutput,
    previewStyle,
    addColor,
    removeColor,
    updateColor,
    randomizeAll,
    reset,       
  } = useGradientGenerator();

  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback(() => {
    setToastVisible(true);
    const timer = setTimeout(() => {
      setToastVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(cssOutput).then(() => {
      showToast();
    });
  }, [cssOutput, showToast]);

  const handleExport = useCallback(() => {
    const exportData = {
      colors,
      css: cssOutput,
      timestamp: new Date().toISOString()
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gradient-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast();
  }, [colors, cssOutput, showToast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-8">
          <ControlPanel
            colors={colors}
            colorCountText={colorCountText}
            cssOutput={cssOutput}
            onAddColor={addColor}
            onRemoveColor={removeColor}
            onUpdateColor={updateColor}
            onCopy={copyToClipboard}
            onRandomize={randomizeAll}
            onReset={reset}
          />
          <PreviewPanel
            previewStyle={previewStyle}
            onExport={handleExport}
          />
        </div>
      </main>
      <Footer />
      <div
        id="toast"
        className={`fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl transition-all duration-300 z-50 ${
          toastVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0'
        }`}
      >
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
          <span>Copied to clipboard!</span>
        </div>
      </div>
    </div>
  );
}