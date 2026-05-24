"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCheckbox from "@/components/CustomCheckbox";
import ChronicleButton from "@/components/RefinedChronicleButton";

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const FICTIONAL_PURPOSES_TEXT =
  "All content — including names, services, descriptions, categories, prices, guide profiles, testimonials, expedition titles, expedition details, business information, contact data, addresses, and prices — is entirely fictional and used solely for demonstration purposes.";

const COINCIDENCE_TEXT_GENERAL =
  "Any resemblance to actual persons, businesses, expeditions, brands, prices, services, testimonials, locations, or other entities is entirely coincidental and unintentional.";

const COINCIDENCE_TEXT_SPECIFIC = (value: string) =>
  `Any resemblance to any existing ${value} is entirely coincidental and unintentional.`;

export default function DisclaimerModal({
  isOpen,
  onClose,
  onAccept,
}: DisclaimerModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isBlocked, setIsBlocked] = useState(true);

  useEffect(() => {
    setIsBlocked(!isChecked);
  }, [isChecked]);

  const supportsBackdropFilter = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.CSS?.supports?.("backdrop-filter", "blur(24px)") || 
           window.CSS?.supports?.("-webkit-backdrop-filter", "blur(24px)");
  }, []);

  const backdropStyle: React.CSSProperties = {
    background: supportsBackdropFilter ? 'rgba(0, 0, 0, 0.65)' : 'rgba(0, 0, 0, 0.8)',
    backdropFilter: supportsBackdropFilter ? 'blur(24px)' : 'none',
    WebkitBackdropFilter: supportsBackdropFilter ? 'blur(24px)' : 'none',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          dir="ltr"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[5000] flex items-center justify-center px-4"
          style={backdropStyle}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="disclaimer-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 100 }}
            transition={{ duration: 0.35, ease: "easeInOut", delay: 0.1 }}
            style={{
              width: "min(540px, 90vw)",
              maxWidth: 540,
              borderRadius: 'var(--radius)',
              backgroundColor: "#0a0a0a",
              border: "1px solid #1e1e1e",
              display: "flex",
              flexDirection: "column",
              maxHeight: "80vh",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <section
              className="px-6 py-6 text-[var(--foreground)] text-sm"
              style={{
                lineHeight: 1.7,
                overflowY: "auto",
                borderRadius: 'var(--radius)',
                scrollbarWidth: "thin",
                scrollbarColor: "var(--accent) var(--scrolbar-track-color)",
              }}
            >
              <h2
                id="disclaimer-modal-title"
                className="text-[24px] font-semibold mb-5 text-center select-none font-headline uppercase tracking-tighter"
                style={{ userSelect: "none" }}
              >
                Disclaimer
              </h2>

              <p className="mb-4">{FICTIONAL_PURPOSES_TEXT}</p>
              <p className="mb-4">
                All service names and descriptions are fictional examples created
                to simulate a natural habitat adventures website. Prices, expeditions, expedition fee per person (Fee / P.P.) and
                guide profiles are fabricated for layout demonstration and have no
                real validity.
              </p>
              <p className="mb-4">
                All guide profiles, including names, specializations,
                portraits, and biographies, are fabricated. They do not represent
                real individuals, and no qualifications or professional affiliations
                are implied.
              </p>
              <p className="mb-4">
                All expedition listings, images, names, categories, descriptions,
                and prices are placeholders used to illustrate a
                natural habitat adventures website section. None correspond to tours, expeditions, or services
                available for purchase.
              </p>
              <p className="mb-4">
                All textual narrative sections — including "About Us" — are entirely
                fabricated and do not describe real events, establishments, or
                people.
              </p>
              <p className="mb-4">
                All customer testimonials, ratings, identities, and quotes are
                fictional and were created to demonstrate testimonial and feedback
                interface elements.
              </p>
              <p className="mb-4">
                All design assets, icons, layouts, and textual content are presented
                for conceptual and demonstrational use by developers, UI designers,
                and students. They do not constitute contractual terms or
                solicitations.
              </p>

              <p className="mb-4">{COINCIDENCE_TEXT_GENERAL}</p>
              <p className="mb-4">{COINCIDENCE_TEXT_SPECIFIC("natural habitat adventures website")}</p>
              <p className="mb-4">
                {COINCIDENCE_TEXT_SPECIFIC("guides, expeditions, and customer testimonials")}
              </p>

              <p className="mb-4">
                All contact details — including phone numbers, email addresses,
                locations, and business hours — are fictional placeholders and not
                linked to any real-world company or venue. The address shown is used
                solely for design demonstration
              </p>

              <p className="mb-4">
                This template is an independent creative work. It is not affiliated with,
                authorized, maintained, sponsored, or endorsed by any of the third-party
                brand owners or product manufacturers whose names, identifiers, or assets
                are visible. All intellectual property, trademarks, and registered marks
                remain the exclusive property of their respective owners.
                These assets are used for design presentation only
                and does not imply any commercial relationship, endorsement, or liability.
              </p>
              <div className="flex items-center space-x-3 mb-6 select-none cursor-pointer">
                <CustomCheckbox
                  accentColor="var(--accent)"
                  borderWidth={1.5}
                  labelFontSize={15}
                  labelSpacing={10}
                  checked={isChecked}
                  onChange={setIsChecked}
                  label="I acknowledge I have read and understood this disclaimer."
                  direction="ltr"
                />
              </div>

              <ChronicleButton
                onClick={onAccept}
                disabled={isBlocked}
                className="w-full"
                variant="default"
                backgroundColor="var(--foreground)"
                hoverBackgroundColor="var(--accent)"
                textColor="var(--background)"
                hoverTextColor="var(--foreground)"
                borderVisible={false}
                borderRadius="var(--button-border-radius)"
                fontWeight={700}
                buttonHeight="2.75rem"
                width="100%"
                type="button"
              >
                Continue
              </ChronicleButton>
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
