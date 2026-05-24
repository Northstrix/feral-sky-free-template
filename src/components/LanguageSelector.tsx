'use client';

import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as WheelPickerPrimitive from "@ncdai/react-wheel-picker";
import "@ncdai/react-wheel-picker/style.css";
import RefinedChronicleButton from "@/components/RefinedChronicleButton";
import { AnimatePresence, motion } from "framer-motion";
import { ModalOverlay } from "./ModalOverlay";
import { useApp } from "@/context/AppContext";
import { useResponsive } from "@/hooks/use-responsive";

export interface LanguageSelectorHandle {
  open: () => void;
  close: () => void;
}

interface LanguageSelectorProps {
  onClose?: () => void;
}

const ANIMATION_DURATION = 0.3;

const LANGUAGES = [
  { code: "en", label: "English", applyText: "Apply" },
  { code: "he", label: "עברית", applyText: "החל" },
  { code: "it", label: "Italiano", applyText: "Applica" },
];

function WheelPicker({
  classNames,
  ...props
}: React.ComponentProps<typeof WheelPickerPrimitive.WheelPicker>) {
  return (
    <WheelPickerPrimitive.WheelPicker
      classNames={{
        optionItem: "text-white/60",
        highlightWrapper:
          "bg-[var(--theme-color)] text-white border border-white/10",
        ...classNames,
      }}
      {...props}
    />
  );
}

export const LanguageSelector = React.forwardRef<
  LanguageSelectorHandle,
  LanguageSelectorProps
>(function LanguageSelector({ onClose }, ref) {
  const { lang, setLang, isRTL } = useApp();
  const { width: windowWidth } = useResponsive();
  const [open, setOpen] = useState(false);
  const [tempSelectedValue, setTempSelectedValue] = useState(lang);

  React.useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  useEffect(() => {
    setTempSelectedValue(lang);
  }, [lang]);

  const handleValueChange = useCallback((value: string) => {
    setTempSelectedValue(value);
  }, []);

  const handleApply = async () => {
    if (tempSelectedValue !== lang) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      setLang(tempSelectedValue);
    }
    setOpen(false);
    onClose?.();
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const applyButtonText =
    LANGUAGES.find((l) => l.code === tempSelectedValue)?.applyText || "Apply";

  const options = LANGUAGES.map((l) => ({
    label: l.label,
    value: l.code,
  }));

  const modalWidth = useMemo(() => {
    if (windowWidth < 640) return 'calc(100vw - 24px)'; 
    return '288px'; 
  }, [windowWidth]);

  return (
    <AnimatePresence>
      {open && (
        <ModalOverlay onClose={handleClose}>
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: ANIMATION_DURATION, ease: "easeInOut" }}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="relative p-6 border border-[#1e1e1e] flex flex-col items-center outline-none"
            style={{
              backgroundColor: `#0a0a0a`,
              borderRadius: '0px',
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              width: modalWidth,
              maxWidth: 'calc(100vw - 24px)'
            }}
          >
            <span className="mb-6 font-headline font-black text-xl text-white">Language</span>
            
            <div
              className="w-full mb-6 overflow-hidden flex justify-center bg-white/5 border border-[#1e1e1e]"
              style={{
                borderRadius: '0px',
              }}
            >
              <WheelPicker
                options={options}
                value={tempSelectedValue}
                onValueChange={handleValueChange}
              />
            </div>

            <RefinedChronicleButton
              isRTL={isRTL}
              onClick={handleApply}
              className="w-full"
              variant="default"
              backgroundColor="var(--foreground)"
              hoverBackgroundColor="var(--accent)"
              textColor="var(--background)"
              hoverTextColor="var(--foreground)"
              borderVisible={false}
              borderRadius="0px"
              fontWeight={700}
              fontSize="1.125rem"
              buttonHeight="2.5rem"
              width="100%"
            >
              {applyButtonText}
            </RefinedChronicleButton>
          </motion.div>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
});
