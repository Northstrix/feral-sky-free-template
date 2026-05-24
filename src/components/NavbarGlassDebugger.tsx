'use client';

import React from 'react';

interface DebugValues {
  bodyOpacity: number;
  borderOpacity: number;
  blurStrength: number;
}

interface NavbarGlassDebuggerProps {
  values: DebugValues;
  onChange: (key: keyof DebugValues, value: number) => void;
}

export default function NavbarGlassDebugger({ values, onChange }: NavbarGlassDebuggerProps) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      background: '#0a0a0a',
      color: '#fff',
      padding: '24px',
      border: '1px solid rgba(255,255,255,0.1)',
      width: '280px',
      fontFamily: 'monospace',
      fontSize: '11px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '8px' }}>
        <span style={{ fontWeight: 'bold', color: 'var(--theme-color)' }}>NAVBAR GLASS DEBUG</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Body Opacity</span>
          <span>{values.bodyOpacity.toFixed(2)}</span>
        </div>
        <input 
          type="range" min="0" max="1" step="0.01" 
          value={values.bodyOpacity} 
          onChange={(e) => onChange('bodyOpacity', parseFloat(e.target.value))}
          style={{ width: '100%', cursor: 'pointer' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Border Opacity</span>
          <span>{values.borderOpacity.toFixed(2)}</span>
        </div>
        <input 
          type="range" min="0" max="1" step="0.01" 
          value={values.borderOpacity} 
          onChange={(e) => onChange('borderOpacity', parseFloat(e.target.value))}
          style={{ width: '100%', cursor: 'pointer' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Blur Strength</span>
          <span>{values.blurStrength}px</span>
        </div>
        <input 
          type="range" min="0" max="64" step="1" 
          value={values.blurStrength} 
          onChange={(e) => onChange('blurStrength', parseInt(e.target.value))}
          style={{ width: '100%', cursor: 'pointer' }}
        />
      </div>

      <div style={{ marginTop: '8px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', lineHeight: '1.5' }}>
        <div style={{ color: '#aaa', marginBottom: '4px' }}>COPY VALUES:</div>
        <div>bodyOpacity: {values.bodyOpacity}</div>
        <div>borderOpacity: {values.borderOpacity}</div>
        <div>blurStrength: {values.blurStrength}</div>
      </div>
    </div>
  );
}
