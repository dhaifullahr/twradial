import { useState, useCallback, useMemo } from 'react';

export type ColorData = {
  id: string;
  color: string;
  opacity: number;
  x: number;
  y: number;
  size: number;
};

const DEFAULT_COLORS: ColorData[] = [
  { id: '1', color: '#FF9A9E', opacity: 0.8, x: 20, y: 30, size: 50 },
  { id: '2', color: '#0B27F1', opacity: 0.8, x: 53, y: 26, size: 50 },
  { id: '3', color: '#B77085', opacity: 0.8, x: 87, y: 76, size: 50 },
  { id: '4', color: '#E6C625', opacity: 0.8, x: 44, y: 61, size: 50 }
];

export const useGradientGenerator = () => {
  const [colors, setColors] = useState<ColorData[]>(DEFAULT_COLORS);

  const addColor = useCallback(() => {
    const newColor: ColorData = {
      id: Date.now().toString(), 
      color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
      opacity: +(Math.random() * 0.8 + 0.2).toFixed(1),
      x: Math.floor(Math.random() * 101),
      y: Math.floor(Math.random() * 101),
      size: 50 
    };
    setColors(prev => [...prev, newColor]);
  }, []);

  const removeColor = useCallback((id: string) => {
    setColors(prev => prev.length > 1 ? prev.filter(c => c.id !== id) : prev);
  }, []);

  const updateColor = useCallback(<K extends keyof ColorData>(id: string, property: K, value: ColorData[K]) => {
    setColors(prev =>
      prev.map(color =>
        color.id === id ? { ...color, [property]: value } : color
      )
    );
  }, []);

  const randomizeAll = useCallback(() => {
    setColors(prev =>
      prev.map(color => ({
        ...color,
        color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
        opacity: +(Math.random() * 0.8 + 0.2).toFixed(1),
        x: Math.floor(Math.random() * 101),
        y: Math.floor(Math.random() * 101),
        size: Math.floor(Math.random() * 101)
      }))
    );
  }, []);

  const reset = useCallback(() => {
    setColors(DEFAULT_COLORS);
  }, []);

  const cssOutput = useMemo(() => {
    const gradients = colors.map(colorData => {
      const hex = colorData.color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `radial-gradient(circle_at_${colorData.x}%_${colorData.y}%,_rgba(${r},${g},${b},${colorData.opacity})_0%,_transparent_${colorData.size}%)`;
    });

    const tailwindGradientParts = gradients.map(g => g.replace(/ /g, '_'));
    return `bg-[${tailwindGradientParts.join(',')}]`;
  }, [colors]); 

  const previewStyle = useMemo(() => {
    const gradients = colors.map(colorData => {
      const hex = colorData.color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `radial-gradient(circle at ${colorData.x}% ${colorData.y}%, rgba(${r},${g},${b},${colorData.opacity}) 0%, transparent ${colorData.size}%)`;
    });
    return {
      background: gradients.join(', ')
    };
  }, [colors]); 

  const colorCountText = useMemo(() => {
    return `${colors.length} color${colors.length !== 1 ? 's' : ''}`;
  }, [colors]);

  return {
    colors,
    colorCountText,
    cssOutput,
    previewStyle,
    addColor,
    removeColor,
    updateColor,
    randomizeAll,
    reset
  };
};