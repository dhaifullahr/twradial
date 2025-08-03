type ColorData = {
  color: string;
  opacity: number;
  x: number;
  y: number;
  size: number;
};

class GradientGenerator {
  private colors: ColorData[] = [
    { color: '#FF9A9E', opacity: 0.8, x: 20, y: 30, size: 50 },
    { color: '#0B27F1', opacity: 0.8, x: 53, y: 26, size: 50 },
    { color: '#B77085', opacity: 0.8, x: 87, y: 76, size: 50 },
    { color: '#E6C625', opacity: 0.8, x: 44, y: 61, size: 50 }
  ];

  constructor() {
    this.init();
  }

  private init() {
    this.bindEvents();
    this.renderColorInputs();
    this.updatePreview();
    this.updateColorCount();
  }

  private bindEvents() {
    
    const addColorBtn = document.getElementById('addColor');
    const randomizeBtn = document.getElementById('randomizeBtn');
    const resetBtn = document.getElementById('resetBtn');
    if (addColorBtn) addColorBtn.addEventListener('click', this.addColor.bind(this));
    if (randomizeBtn) randomizeBtn.addEventListener('click', this.randomizeAll.bind(this));
    if (resetBtn) resetBtn.addEventListener('click', this.reset.bind(this));

    // Copy button
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) copyBtn.addEventListener('click', this.copyToClipboard.bind(this));
  }

  private renderColorInputs() {
    const container = document.getElementById('colorInputs');
    if (!container) return;
    container.innerHTML = '';
    this.colors.forEach((colorData, index) => {
      const colorInput = this.createColorInput(colorData, index);
      container.appendChild(colorInput);
    });
  }

  private createColorInput(colorData: ColorData, index: number): HTMLElement {
    const div = document.createElement('div');
    div.className = 'color-input bg-slate-800 rounded-xl p-4 border border-white/10';
    div.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-medium text-white">Color ${index + 1}</h4>
            <button class="remove-color flex justify-between items-center text-center cursor-pointer gap-2 py-1.5 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-200 ${this.colors.length <= 1 ? 'opacity-50 pointer-events-none' : ''}" data-index="${index}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                <p class="text-sm text-red-300">Delete</p>
            </button>
        </div>
        <div class="space-y-4">
            <div class="flex items-center space-x-3">
                <div class="relative">
                    <input type="color" class="color-picker w-12 h-12 rounded-lg border-2 border-white/20 bg-transparent cursor-pointer" value="${colorData.color}" data-index="${index}">
                    <div class="absolute inset-0 rounded-lg ring-2 ring-transparent pointer-events-none transition-all duration-200"></div>
                </div>
                <div class="flex-1">
                    <input type="text" class="color-hex w-full p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-sm font-mono text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50" value="${colorData.color}" data-index="${index}" placeholder="#FFFFFF">
                </div>
            </div>
            <div class="grid grid-cols-4 gap-3">
                <div>
                    <label class="block text-xs font-medium text-slate-400 mb-2">Opacity</label>
                    <div class="space-y-2">
                        <input type="range" class="opacity-slider w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider" min="0" max="1" step="0.1" value="${colorData.opacity}" data-index="${index}">
                        <div class="text-center">
                            <span class="opacity-value text-xs font-mono text-blue-300">${colorData.opacity}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-medium text-slate-400 mb-2">X Position</label>
                    <div class="space-y-2">
                        <input type="range" class="x-pos w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider" min="0" max="100" value="${colorData.x}" data-index="${index}">
                        <div class="text-center">
                            <span class="x-value text-xs font-mono text-blue-300">${colorData.x}%</span>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-medium text-slate-400 mb-2">Y Position</label>
                    <div class="space-y-2">
                        <input type="range" class="y-pos w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider" min="0" max="100" value="${colorData.y}" data-index="${index}">
                        <div class="text-center">
                            <span class="y-value text-xs font-mono text-blue-300">${colorData.y}%</span>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-medium text-slate-400 mb-2">Size</label>
                    <div class="space-y-2">
                        <input type="range" class="size-slider w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider" min="0" max="100" value="${colorData.size}" data-index="${index}">
                        <div class="text-center">
                            <span class="size-value text-xs font-mono text-blue-300">${colorData.size}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add event listeners
    const colorPicker = div.querySelector('.color-picker') as HTMLInputElement | null;
    const colorHex = div.querySelector('.color-hex') as HTMLInputElement | null;
    const opacitySlider = div.querySelector('.opacity-slider') as HTMLInputElement | null;
    const xSlider = div.querySelector('.x-pos') as HTMLInputElement | null;
    const ySlider = div.querySelector('.y-pos') as HTMLInputElement | null;
    const removeBtn = div.querySelector('.remove-color') as HTMLButtonElement | null;
    const sizeSlider = div.querySelector('.size-slider') as HTMLInputElement | null;

    if (colorPicker) colorPicker.addEventListener('input', (e) => this.updateColor(index, 'color', (e.target as HTMLInputElement).value));
    if (colorHex) colorHex.addEventListener('input', (e) => this.updateColorHex(index, (e.target as HTMLInputElement).value));
    if (opacitySlider) opacitySlider.addEventListener('input', (e) => this.updateColor(index, 'opacity', parseFloat((e.target as HTMLInputElement).value)));
    if (xSlider) xSlider.addEventListener('input', (e) => this.updateColor(index, 'x', parseInt((e.target as HTMLInputElement).value, 10)));
    if (ySlider) ySlider.addEventListener('input', (e) => this.updateColor(index, 'y', parseInt((e.target as HTMLInputElement).value, 10)));
    if (removeBtn) removeBtn.addEventListener('click', () => this.removeColor(index));
    if (sizeSlider) sizeSlider.addEventListener('input', (e) => this.updateColor(index, 'size', parseInt((e.target as HTMLInputElement).value, 10)));

    return div;
  }

  private updateColor(index: number, property: keyof ColorData, value: any) {
    if (this.colors[index]) {
      (this.colors[index] as any)[property] = value;
      this.updatePreview();
      this.updateValueDisplays();
    }
  }

  private updateColorHex(index: number, value: string) {
    if (/^#[0-9A-F]{6}$/i.test(value) && this.colors[index]) {
      this.colors[index].color = value;
      const colorPicker = document.querySelector(`input[type="color"][data-index="${index}"]`) as HTMLInputElement | null;
      if (colorPicker) colorPicker.value = value;
      this.updatePreview();
    }
  }

  private updateValueDisplays() {
    this.colors.forEach((colorData, index) => {
      const container = document.querySelectorAll('.color-input')[index];
      if (container) {
        const opacityValue = container.querySelector('.opacity-value');
        const xValue = container.querySelector('.x-value');
        const yValue = container.querySelector('.y-value');
        const colorHexInput = container.querySelector('.color-hex') as HTMLInputElement | null;
        const sizeValue = container.querySelector('.size-value');

        if (opacityValue) opacityValue.textContent = colorData.opacity.toString();
        if (xValue) xValue.textContent = `${colorData.x}%`;
        if (yValue) yValue.textContent = `${colorData.y}%`;
        if (colorHexInput) colorHexInput.value = colorData.color;
        if (sizeValue) sizeValue.textContent = `${colorData.size}%`;
      }
    });
  }

  private addColor() {
    const newColor: ColorData = {
      color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
      opacity: +(Math.random() * 0.8 + 0.2).toFixed(1),
      x: Math.floor(Math.random() * 101),
      y: Math.floor(Math.random() * 101),
      size: 50
    };
    this.colors.push(newColor);
    this.renderColorInputs();
    this.updatePreview();
    this.updateColorCount();
  }

  private removeColor(index: number) {
    if (this.colors.length > 1) {
      this.colors.splice(index, 1);
      this.renderColorInputs();
      this.updatePreview();
      this.updateColorCount();
    }
  }

  private updatePreview() {
    const preview = document.getElementById('preview');
    if (!preview) return;

    let gradients: string[] = [];
    this.colors.forEach(colorData => {
      const hex = colorData.color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      gradients.push(`radial-gradient(circle_at_${colorData.x}%_${colorData.y}%,_rgba(${r},${g},${b},${colorData.opacity})_0%,_transparent_${colorData.size}%)`);
    });

    if (preview) {
        preview.style.background = gradients.join(', ').replace(/_/g, ' '); 
    }

    const tailwindGradientParts = gradients.map(g => g.replace(/ /g, '_'));
    const tailwindClasses = `bg-[${tailwindGradientParts.join(',')}]`;

    const cssOutput = document.getElementById('cssOutput') as HTMLInputElement | null;
    if (cssOutput) {
      cssOutput.value = tailwindClasses;
    }
  }

  private updateColorCount() {
    const colorCount = document.getElementById('colorCount');
    if (colorCount) colorCount.textContent = `${this.colors.length} color${this.colors.length !== 1 ? 's' : ''}`;
  }

  private randomizeAll() {
    this.colors = this.colors.map(() => ({
      color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
      opacity: +(Math.random() * 0.8 + 0.2).toFixed(1),
      x: Math.floor(Math.random() * 101),
      y: Math.floor(Math.random() * 101),
      size: 50
    }));
    this.renderColorInputs();
    this.updatePreview();
  }

  private reset() {
    this.colors = [
      { color: '#FF9A9E', opacity: 0.8, x: 20, y: 30, size: 50 },
      { color: '#0B27F1', opacity: 0.8, x: 53, y: 26, size: 50 },
      { color: '#B77085', opacity: 0.8, x: 87, y: 76, size: 50 },
      { color: '#E6C625', opacity: 0.8, x: 44, y: 61, size: 50 }
    ];

    this.renderColorInputs();
    this.updatePreview();
    this.updateColorCount();
  }

  private copyToClipboard() {
    const cssOutput = document.getElementById('cssOutput') as HTMLInputElement | null;
    if (cssOutput) {
      cssOutput.select();
      navigator.clipboard.writeText(cssOutput.value).then(() => {
        this.showToast();
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
          const originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg><span>Copied!</span>';
          copyBtn.classList.remove('bg-green-500/20', 'hover:bg-green-500/30');
          copyBtn.classList.add('bg-green-500', 'text-white');
          setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.classList.add('bg-green-500/20', 'hover:bg-green-500/30');
            copyBtn.classList.remove('bg-green-500', 'text-white');
          }, 2000);
        }
      });
    }
  }

  private showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.classList.remove('translate-y-full', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
      setTimeout(() => {
        toast.classList.add('translate-y-full', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
      }, 3000);
    }
  }

}

export default GradientGenerator;