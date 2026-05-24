'use client';

import React from 'react';

interface WarpValues {
  outerRMin: number;
  outerRMax: number;
  innerRMin: number;
  innerRMax: number;
  sMin: number;
  sMax: number;
}

interface HeroWarpDebuggerProps {
  values: WarpValues;
  onChange: (key: keyof WarpValues, value: number) => void;
  interpolationFactor: number;
  currentOuterR: number;
  currentInnerR: number;
  currentS: number;
}

export default function HeroWarpDebugger({ 
  values, 
  onChange, 
  interpolationFactor,
  currentOuterR,
  currentInnerR,
  currentS 
}: HeroWarpDebuggerProps) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
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
        <span style={{ fontWeight: 'bold', color: 'var(--theme-color)' }}>HERO WARP DEBUG</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ opacity: 0.4 }}>FACTOR</span>
          <span>{interpolationFactor.toFixed(3)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4px' }}>
          <span style={{ fontWeight: 'bold' }}>OUTER R</span>
          <span style={{ color: 'var(--theme-color)' }}>{currentOuterR.toFixed(2)}px</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 'bold' }}>INNER R</span>
          <span style={{ color: 'var(--theme-color)' }}>{currentInnerR.toFixed(2)}px</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 'bold' }}>SIZE (S)</span>
          <span style={{ color: 'var(--theme-color)' }}>{currentS.toFixed(2)}px</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '400px', paddingRight: '4px' }}>
        {/* Outer Radius Range */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--theme-color)' }}>
            <span>OUTER R MIN</span>
            <span>{values.outerRMin}px</span>
          </div>
          <input 
            type="range" min="0" max="100" step="0.5" 
            value={values.outerRMin} 
            onChange={(e) => onChange('outerRMin', parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--theme-color)' }}>
            <span>OUTER R MAX</span>
            <span>{values.outerRMax}px</span>
          </div>
          <input 
            type="range" min="0" max="100" step="0.5" 
            value={values.outerRMax} 
            onChange={(e) => onChange('outerRMax', parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>

        {/* Inner Radius Range */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid #1e1e1e', paddingTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff00ff' }}>
            <span>INNER R MIN</span>
            <span>{values.innerRMin}px</span>
          </div>
          <input 
            type="range" min="0" max="100" step="0.5" 
            value={values.innerRMin} 
            onChange={(e) => onChange('innerRMin', parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff00ff' }}>
            <span>INNER R MAX</span>
            <span>{values.innerRMax}px</span>
          </div>
          <input 
            type="range" min="0" max="100" step="0.5" 
            value={values.innerRMax} 
            onChange={(e) => onChange('innerRMax', parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>

        {/* Size Range */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid #1e1e1e', paddingTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>SIZE MIN</span>
            <span>{values.sMin}px</span>
          </div>
          <input 
            type="range" min="0" max="200" step="1" 
            value={values.sMin} 
            onChange={(e) => onChange('sMin', parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>SIZE MAX</span>
            <span>{values.sMax}px</span>
          </div>
          <input 
            type="range" min="0" max="200" step="1" 
            value={values.sMax} 
            onChange={(e) => onChange('sMax', parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>
      </div>

      <div style={{ marginTop: '4px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', lineHeight: '1.5' }}>
        <div style={{ color: '#aaa', marginBottom: '4px' }}>COPY VALUES:</div>
        <div>outerRMin: {values.outerRMin}</div>
        <div>outerRMax: {values.outerRMax}</div>
        <div>innerRMin: {values.innerRMin}</div>
        <div>innerRMax: {values.innerRMax}</div>
        <div>sMin: {values.sMin}</div>
        <div>sMax: {values.sMax}</div>
      </div>
    </div>
  );
}
