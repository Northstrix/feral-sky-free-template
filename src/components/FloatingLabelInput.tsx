'use client';
import React, { useState, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export interface FloatingLabelInputProps {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  textarea?: boolean;
  accentColor?: string;
  textareaHeight?: string;
  parentBackground?: string;
  inputBackground?: string;
  inputOutlineColor?: string;
  inputFocusOutlineColor?: string;
  outlineWidth?: string;
  foregroundColor?: string;
  mutedForegroundColor?: string;
  rounding?: string;
  inputPadding?: string;
  inputFontSize?: string;
  labelFontSize?: string;
  labelActiveFontSize?: string;
  labelPadding?: string;
  labelActivePadding?: string;
  inputHeight?: string;
  className?: string;
  inputClassName?: string;
  isCombobox?: boolean;
  focused?: boolean;
  readOnly?: boolean;
}

function detectLabelDir(text: string): 'rtl' | 'ltr' {
  return /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(text) ? 'rtl' : 'ltr';
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onValueChange,
  type = 'text',
  autoComplete = 'off',
  required = false,
  disabled = false,
  textarea = false,
  accentColor = 'var(--theme-color)',
  textareaHeight = '152px',
  parentBackground = '#050505',
  inputBackground = '#111',
  inputOutlineColor = '#1e1e1e',
  inputFocusOutlineColor = '#ffffff',
  outlineWidth = '1px',
  foregroundColor = '#ffffff',
  mutedForegroundColor = '#707070',
  rounding = '0px',
  inputPadding = '17px',
  inputFontSize = '0.875rem',
  labelFontSize = '0.75rem',
  labelActiveFontSize = '12px',
  labelPadding = '0 7px',
  labelActivePadding = '0 6px',
  inputHeight = '46px',
  className,
  inputClassName,
  isCombobox = false,
  focused: focusedProp,
  readOnly = false,
}) => {
  const [internalFocused, setInternalFocused] = useState(false);
  const { isRTL } = useApp();
  const focused = focusedProp !== undefined ? focusedProp : internalFocused;

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (readOnly) return;
    onValueChange(e.target.value);
  }, [onValueChange, readOnly]);

  const handleFocus = useCallback(() => setInternalFocused(true), []);
  const handleBlur = useCallback(() => setInternalFocused(false), []);

  const hasValue = value.length > 0;
  const labelDir = detectLabelDir(label);

  const style: React.CSSProperties = {
    '--sa-accent-color': accentColor,
    '--sa-input-bg': inputBackground,
    '--sa-input-outline': inputOutlineColor,
    '--sa-input-outline-focus': inputFocusOutlineColor,
    '--sa-input-outline-width': outlineWidth,
    '--sa-foreground': foregroundColor,
    '--sa-muted-foreground': mutedForegroundColor,
    '--sa-parent-background': parentBackground,
    '--sa-general-rounding': rounding,
    '--sa-textarea-height': textareaHeight,
    '--sa-input-padding': inputPadding,
    '--sa-input-font-size': inputFontSize,
    '--sa-label-font-size': labelFontSize,
    '--sa-label-active-font-size': labelActiveFontSize,
    '--sa-label-padding': labelPadding,
    '--sa-label-active-padding': labelActivePadding,
    '--sa-input-height': inputHeight,
  } as React.CSSProperties;

  const inputStyle: React.CSSProperties = {
    textAlign: isRTL ? 'right' : 'left',
    direction: isRTL ? 'rtl' : 'ltr',
    caretColor: isCombobox || readOnly ? 'transparent' : undefined,
    fontWeight: 400,
  };

  return (
    <div
      className={[
        'mobile-form-group',
        isRTL ? 'rtl' : '',
        focused ? 'active' : '',
        hasValue ? 'has-value' : '',
        textarea ? 'textarea' : '',
        className,
      ].join(' ')}
      style={style}
    >
      {textarea ? (
        <textarea
          className={cn("mobile-form-input", inputClassName)}
          required={required}
          value={value}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete={autoComplete}
          disabled={disabled}
          readOnly={readOnly}
          style={inputStyle}
          spellCheck={false}
        />
      ) : (
        <input
          className={cn("mobile-form-input", inputClassName)}
          type={type}
          required={required}
          value={value}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete={autoComplete}
          disabled={disabled}
          readOnly={readOnly}
          style={inputStyle}
          spellCheck={false}
        />
      )}
      <label className={'mobile-form-label' + (textarea ? ' label-textarea' : '')} dir={labelDir}>
        {label}
      </label>
      <style jsx>{`
        .mobile-form-group {
          position: relative;
          width: 100%;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .mobile-form-input {
          width: 100%;
          height: var(--sa-input-height);
          padding: var(--sa-input-padding);
          font-size: var(--sa-input-font-size);
          font-weight: 400;
          color: var(--sa-foreground);
          background: var(--sa-input-bg);
          border: var(--sa-input-outline-width) solid var(--sa-input-outline);
          border-radius: var(--sa-general-rounding);
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.3s, color 0.3s, background 0.3s;
          resize: none;
          line-height: 1.4;
          cursor: ${isCombobox || readOnly ? 'pointer' : 'text'};
        }
        .mobile-form-group.active .mobile-form-input {
          border-color: var(--sa-input-outline-focus);
        }
        .mobile-form-input:disabled {
          opacity: 0.5;
          pointer-events: none;
        }
        .mobile-form-group.textarea .mobile-form-input {
          height: var(--sa-textarea-height);
          overflow-y: auto;
        }
        .mobile-form-label {
          position: absolute;
          left: 11px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 0;
          color: var(--sa-muted-foreground);
          font-size: var(--sa-label-font-size);
          font-weight: 400;
          letter-spacing: 0.1em;
          pointer-events: none;
          background: var(--sa-parent-background);
          padding: var(--sa-label-padding);
          transition: color 0.3s, background 0.3s, font-size 0.3s, top 0.3s, transform 0.3s;
          z-index: 2;
          max-width: calc(100% - 26px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mobile-form-group.rtl .mobile-form-label {
          right: 12px;
          left: auto;
        }
        .mobile-form-group.active .mobile-form-label,
        .mobile-form-group.has-value .mobile-form-label {
          top: 0;
          font-size: var(--sa-label-active-font-size);
          padding: var(--sa-label-active-padding);
          z-index: 2;
        }
        .mobile-form-group.active .mobile-form-label {
          color: var(--sa-accent-color);
        }
        .mobile-form-group.has-value:not(.active) .mobile-form-label {
          color: var(--sa-muted-foreground);
        }
        .mobile-form-group.textarea:not(.active):not(.has-value) .mobile-form-label {
          top: 12px;
          transform: none;
        }
      `}</style>
    </div>
  );
};
