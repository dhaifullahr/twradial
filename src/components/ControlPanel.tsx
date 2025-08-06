import React, { useState } from 'react';
import { ColorData } from '@/hooks/useGradientGenerator';

interface ControlPanelProps {
  colors: ColorData[];
  colorCountText: string;
  cssOutput: string;
  onAddColor: () => void;
  onRemoveColor: (id: string) => void;
  onUpdateColor: <K extends keyof ColorData>(id: string, property: K, value: ColorData[K]) => void;
  onCopy: () => void;
  onRandomize: () => void; 
  onReset: () => void;     
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  colors,
  colorCountText,
  cssOutput,
  onAddColor,
  onRemoveColor,
  onUpdateColor,
  onCopy,
  onRandomize,
  onReset      
}) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const handleCopyClick = () => {
    onCopy();
    setCopyButtonText('Copied!');
    setTimeout(() => setCopyButtonText('Copy'), 2000);
  };

  return (
    <aside className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Control Panel</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onRandomize} 
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-all duration-200 text-sm"
              title="Randomize All"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M237.66,178.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L212.69,192H200.94a72.12,72.12,0,0,1-58.59-30.15l-41.72-58.4A56.1,56.1,0,0,0,55.06,80H32a8,8,0,0,1,0-16H55.06a72.12,72.12,0,0,1,58.59,30.15l41.72,58.4A56.1,56.1,0,0,0,200.94,176h11.75l-10.35-10.34a8,8,0,0,1,11.32-11.32ZM143,107a8,8,0,0,0,11.16-1.86l1.2-1.67A56.1,56.1,0,0,1,200.94,80h11.75L202.34,90.34a8,8,0,0,0,11.32,11.32l24-24a8,8,0,0,0,0-11.32l-24-24a8,8,0,0,0-11.32,11.32L212.69,64H200.94a72.12,72.12,0,0,0-58.59,30.15l-1.2,1.67A8,8,0,0,0,143,107Zm-30,42a8,8,0,0,0-11.16,1.86l-1.2,1.67A56.1,56.1,0,0,1,55.06,176H32a8,8,0,0,0,0,16H55.06a72.12,72.12,0,0,0,58.59-30.15l1.2-1.67A8,8,0,0,0,113,149Z"></path></svg>
            </button>
            <button
              onClick={onReset} 
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-all duration-200 text-sm"
              title="Reset All"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z"></path></svg>
            </button>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-300">Color Stops</h3>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
              {colorCountText}
            </span>
          </div>
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {colors.map((colorData, index) => (
              <div key={colorData.id} className="color-input bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-white">Color {index + 1}</h4>
                  <button
                    onClick={() => onRemoveColor(colorData.id)}
                    className={`remove-color flex justify-between items-center text-center gap-2 py-1.5 px-4 cursor-pointer bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-200 text-sm ${colors.length <= 1 ? 'opacity-50 pointer-events-none' : ''}`}
                    disabled={colors.length <= 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z"></path></svg>
                    <p className="text-sm text-red-300">Delete</p>
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <input
                        type="color"
                        className="color-picker w-12 h-12 rounded-lg border-2 border-white/20 bg-transparent cursor-pointer"
                        value={colorData.color}
                        onChange={(e) => onUpdateColor(colorData.id, 'color', e.target.value)}
                      />
                      <div className="absolute inset-0 rounded-lg ring-2 ring-transparent pointer-events-none transition-all duration-200"></div>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        className="color-hex w-full p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-sm font-mono text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        value={colorData.color}
                        onChange={(e) => onUpdateColor(colorData.id, 'color', e.target.value)}
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Opacity</label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          className="opacity-slider w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          min="0"
                          max="1"
                          step="0.1"
                          value={colorData.opacity}
                          onChange={(e) => onUpdateColor(colorData.id, 'opacity', parseFloat(e.target.value))}
                        />
                        <div className="text-center">
                          <span className="opacity-value text-xs font-mono text-blue-300">{colorData.opacity}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">X Position</label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          className="x-pos w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          min="0"
                          max="100"
                          value={colorData.x}
                          onChange={(e) => onUpdateColor(colorData.id, 'x', parseInt(e.target.value, 10))}
                        />
                        <div className="text-center">
                          <span className="x-value text-xs font-mono text-blue-300">{colorData.x}%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Y Position</label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          className="y-pos w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          min="0"
                          max="100"
                          value={colorData.y}
                          onChange={(e) => onUpdateColor(colorData.id, 'y', parseInt(e.target.value, 10))}
                        />
                        <div className="text-center">
                          <span className="y-value text-xs font-mono text-blue-300">{colorData.y}%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Size</label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          className="size-slider w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          min="0"
                          max="100"
                          value={colorData.size}
                          onChange={(e) => onUpdateColor(colorData.id, 'size', parseInt(e.target.value, 10))}
                        />
                        <div className="text-center">
                          <span className="size-value text-xs font-mono text-blue-300">{colorData.size}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onAddColor}
            className="mt-4 w-full flex items-center cursor-pointer justify-center space-x-2 p-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl transition-all duration-200 text-sm font-medium text-blue-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
            <span>Add Color Stop</span>
          </button>
        </div>
        {/* Output */}
        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-300">Generated Tailwind</label>
              <button
                onClick={handleCopyClick}
                className="flex items-center space-x-1 px-3 py-1.5 cursor-pointer bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-all duration-200 text-xs"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Zm-8,128H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg>
                <span>{copyButtonText}</span>
              </button>
            </div>
            <input
              id="cssOutput"
              value={cssOutput}
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