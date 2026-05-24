'use client';

import React from 'react';

interface DebugValues {
  heightMin: number;
  heightMax: number;
  widthMin: number;
  widthMax: number;
  paddingDesktop: number;
  navbarAdjustment: number;
}

interface ContentWidthDebuggerProps {
  values: DebugValues;
  onChange: (key: keyof DebugValues, value: number) => void;
  currentHeight: number;
  currentWidth: number;
  calculatedMaxWidth: string;
}

export default function ContentWidthDebugger({ 
  values, 
  onChange, 
  currentHeight, 
  currentWidth,
  calculatedMaxWidth 
}: ContentWidthDebuggerProps) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      zIndex: 9999,
      background: '#0a0a0a',
      color: '#fff',
      padding: '24px',
      border: '1px solid #1e1e1e',
      width: '320px',
      fontFamily: 'monospace',
      fontSize: '11px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e1e1e', paddingBottom: '8px' }}>
        <span style={{ fontWeight: 'bold', color: 'var(--theme-color)' }}>CONTENT WIDTH DEBUG</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ opacity: 0.4 }}>WIN WIDTH</span>
          <span>{currentWidth}px</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ opacity: 0.4 }}>WIN HEIGHT</span>
          <span>{currentHeight}px</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4px' }}>
          <span style={{ fontWeight: 'bold' }}>MAX WIDTH</span>
          <span style={{ color: 'var(--theme-color)' }}>{calculatedMaxWidth}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Height Range */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>HEIGHT MIN</span>
            <span>{values.heightMin}px</span>
          </div>
          <input 
            type="range" min="400" max="1200" step="1" 
            value={values.heightMin} 
            onChange={(e) => onChange('heightMin', parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>HEIGHT MAX</span>
            <span>{values.heightMax}px</span>
          </div>
          <input 
            type="range" min="600" max="1600" step="1" 
            value={values.heightMax} 
            onChange={(e) => onChange('heightMax', parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>

        {/* Width Range */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>WIDTH MIN</span>
            <span>{values.widthMin}px</span>
          </div>
          <input 
            type="range" min="800" max="1600" step="1" 
            value={values.widthMin} 
            onChange={(e) => onChange('widthMin', parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>WIDTH MAX</span>
            <span>{values.widthMax}px</span>
          </div>
          <input 
            type="range" min="1000" max="2560" step="1" 
            value={values.widthMax} 
            onChange={(e) => onChange('widthMax', parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>

        {/* Adjustments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid #1e1e1e', paddingTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>DESKTOP PADDING</span>
            <span>{values.paddingDesktop}px</span>
          </div>
          <input 
            type="range" min="0" max="128" step="1" 
            value={values.paddingDesktop} 
            onChange={(e) => onChange('paddingDesktop', parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>NAVBAR ADJUST</span>
            <span>{values.navbarAdjustment}px</span>
          </div>
          <input 
            type="range" min="0" max="128" step="1" 
            value={values.navbarAdjustment} 
            onChange={(e) => onChange('navbarAdjustment', parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>
      </div>

      <div style={{ marginTop: '4px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', lineHeight: '1.5' }}>
        <div style={{ color: '#aaa', marginBottom: '4px' }}>COPY VALUES:</div>
        <div>heightMin: {values.heightMin}</div>
        <div>heightMax: {values.heightMax}</div>
        <div>widthMin: {values.widthMin}</div>
        <div>widthMax: {values.widthMax}</div>
        <div>paddingDesktop: {values.paddingDesktop}</div>
        <div>navbarAdjustment: {values.navbarAdjustment}</div>
      </div>
    </div>
  );
}
