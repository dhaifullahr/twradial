import React from 'react';

interface PreviewPanelProps {
  previewStyle: React.CSSProperties; 
  onExport: () => void; 
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ previewStyle, onExport }) => { 
  return (
    <section className="bg-white/5 h-max lg:sticky top-24 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-white">Live Preview</h2>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-soft"></div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onExport}
              className="flex items-center space-x-2 px-3 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-md transition-all duration-200 text-xs font-medium text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34Zm-56,83.32-24,24a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L120,164.69V120a8,8,0,0,1,16,0v44.69l10.34-10.35a8,8,0,0,1,11.32,11.32ZM152,88V44l44,44Z"></path></svg>
              <span>Download JSON</span>
            </button>
          </div>
        </div>
      </div>
      <div
        id="preview"
        className="w-full h-96 relative overflow-hidden"
        style={previewStyle}
      >
      </div>
    </section>
  );
};

export default PreviewPanel;