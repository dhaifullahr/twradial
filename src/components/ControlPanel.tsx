import React from 'react';

const ControlPanel = () => {
  return (
    <aside className="bg-slate-800 border border-white/10 rounded-2xl shadow-2xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Control Panel</h2>
          <div className="flex items-center space-x-2">
            <button id="randomizeBtn" className="p-2 bg-white/10 cursor-pointer hover:bg-white/20 rounded-lg transition-all duration-200 text-sm" title="Randomize All">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M237.66,178.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L212.69,192H200.94a72.12,72.12,0,0,1-58.59-30.15l-41.72-58.4A56.1,56.1,0,0,0,55.06,80H32a8,8,0,0,1,0-16H55.06a72.12,72.12,0,0,1,58.59,30.15l41.72,58.4A56.1,56.1,0,0,0,200.94,176h11.75l-10.35-10.34a8,8,0,0,1,11.32-11.32ZM143,107a8,8,0,0,0,11.16-1.86l1.2-1.67A56.1,56.1,0,0,1,200.94,80h11.75L202.34,90.34a8,8,0,0,0,11.32,11.32l24-24a8,8,0,0,0,0-11.32l-24-24a8,8,0,0,0-11.32,11.32L212.69,64H200.94a72.12,72.12,0,0,0-58.59,30.15l-1.2,1.67A8,8,0,0,0,143,107Zm-30,42a8,8,0,0,0-11.16,1.86l-1.2,1.67A56.1,56.1,0,0,1,55.06,176H32a8,8,0,0,0,0,16H55.06a72.12,72.12,0,0,0,58.59-30.15l1.2-1.67A8,8,0,0,0,113,149Z"></path></svg>
            </button>
            <button id="resetBtn" className="p-2 bg-white/10 cursor-pointer hover:bg-white/20 rounded-lg transition-all duration-200 text-sm" title="Reset All">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z"></path></svg>
            </button>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-300">Color Stops</h3>
            <span id="colorCount" className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">4 colors</span>
          </div>
          <div id="colorInputs" className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {/* Color inputs place */}
          </div>
          <button id="addColor" className="mt-4 w-full flex items-center justify-center space-x-2 p-3 cursor-pointer bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 rounded-xl transition-all duration-200 text-sm font-medium text-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
            <span>Add Color Stop</span>
          </button>
        </div>
        <div className="space-y-6">
          {/* Output */}
          <div className="bg-slate-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-300 ml-2">Tailwind code</label>
              <button id="copyBtn" className="flex items-center space-x-1 px-3 py-1.5 bg-green-500/20 cursor-pointer hover:bg-green-500/30 text-green-300 rounded-lg transition-all duration-200 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Zm-8,128H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg>
                <span>Copy</span>
              </button>
            </div>
            <input
              id="cssOutput"
              defaultValue=""
              readOnly
              className="w-full p-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-xs font-mono text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ControlPanel;