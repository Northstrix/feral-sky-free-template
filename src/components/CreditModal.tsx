"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ModalOverlay } from "@/components/ModalOverlay";
import { useApp } from "@/context/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import RefinedChronicleButton from "@/components/RefinedChronicleButton";
import HighlightHover from "@/components/HighlightHover";

const creditsMarkdown = `
[Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) by [Aceternity UI](https://ui.aceternity.com/)

[Chronicle Button](https://codepen.io/Haaguitos/pen/OJrVZdJ) by [Haaguitos](https://codepen.io/Haaguitos)

[Wheel Picker](https://21st.dev/ncdai/wheel-picker/default) by [Chánh Đại](https://21st.dev/ncdai)

[React Wheel Picker](https://www.npmjs.com/package/@ncdai/react-wheel-picker) by [Chánh Đại](https://github.com/ncdai)

[すりガラスなプロフィールカード](https://codepen.io/ash_creator/pen/zYaPZLB) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[GSAP (GreenSock Animation Platform)](https://www.npmjs.com/package/gsap)

[framer-motion](https://www.npmjs.com/package/framer-motion)

[Lucide React](https://www.npmjs.com/package/lucide-react)

[Agency Layout - cpc-landing-page](https://codepen.io/fchaussin/pen/PwbPEVV) by [Freask'O](https://codepen.io/fchaussin)

[gsap/component ❍ Interactive Table with Image Hover & Idle Animation](https://codepen.io/filipz/pen/EaVNXmb) by [Filip Zrnzevic](https://codepen.io/filipz)

[Animated Testimonials](https://ui.aceternity.com/components/animated-testimonials) by [Aceternity UI](https://ui.aceternity.com/)

[Custom Checkbox](https://21st.dev/Edil-ozi/custom-checkbox/default) by [Edil Ozi](https://21st.dev/Edil-ozi)

[チェックしないと押せないボタン](https://codepen.io/ash_creator/pen/JjZReNm) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[Input Floating Label animation](https://codepen.io/Mahe76/pen/qBQgXyK) by [Elpeeda](https://codepen.io/Mahe76)

[Landing page with swiper #css #swiper.js](https://codepen.io/kristen17/pen/GRXgqaB) by [Kristen](https://codepen.io/kristen17)

[Inverted border-radius using CSS mask II](https://codepen.io/t_afif/pen/LEPBYvK) by [Temani Afif](https://codepen.io/t_afif)

[shimmer accordion 💫](https://codepen.io/jh3y/pen/gbLOajZ) by [Jhey](https://codepen.io/jh3y)

[Multi Colored Text with CSS](https://codepen.io/TajShireen/pen/YzZmbep) by [Shireen Taj](https://codepen.io/TajShireen)

[JTB studios - Link](https://codepen.io/zzznicob/pen/GRPgKLM) by [Nico](https://codepen.io/zzznicob)

[Hover Link Animation](https://21st.dev/community/components/rubenerik/hover-link-animation/default) by [Ruben](https://21st.dev/rubenerik)

Photo by [Emily Karakis](https://unsplash.com/@iemyoung?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/trees-near-body-of-water-during-daytime-HlJSzoWNhPY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Photo by [Matt Artz](https://unsplash.com/@mattartz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/pine-trees-nTRDnDdDYk8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Photo by [Griffin Wooldridge](https://unsplash.com/@dzngriffin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/green-trees-on-green-grass-field-during-daytime-AlfcpJS7OLw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Photo by [Philipp](https://unsplash.com/@picture_scape?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-lake-surrounded-by-mountains-4hZPYyaXOH4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Photo by [Cristina Gottardi](https://unsplash.com/@cristina_gottardi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/birds-eye-view-photography-of-mountain-range-Of1jWtdnQCY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Photo by [Kendall Wooldridge](https://unsplash.com/@kenwoo19?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/green-trees-beside-river-during-daytime-IxFF1c2vELM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Photo by [Spencer DeMera](https://unsplash.com/@spencer_demera?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-river-flows-between-lush-green-mountains-Xk5scnUMV9w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Photo by [Marek Piwnicki](https://unsplash.com/@marekpiwnicki?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-lush-green-hillside-covered-in-lots-of-trees-OXKmcihJgEE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Photo by [Stefan Kostić](https://unsplash.com/@thestefankostic?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/green-trees-under-blue-sky-and-white-clouds-during-daytime-Eptb7X_NUvU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Photo by [Vitaly Gorbachev](https://www.pexels.com/@vitalyagorbachev/) from [Pexels](https://www.pexels.com/photo/low-angle-shot-of-woman-wearing-jacket-15587225/)

Photo by [Matthew Lockhart](https://unsplash.com/@lockhart82?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/man-standing-near-leafless-tree-6mMdq3ZRAhc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Photo by [Reginaldo Lustosa](https://www.pexels.com/@r3gin4ldo/) from [Pexels](https://www.pexels.com/photo/photograph-of-a-woman-in-a-pink-off-shoulder-dress-smiling-7700533/)

Photo by [Gift Habeshaw](https://unsplash.com/@gift_habeshaw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/man-standing-between-rice-paddy-during-daytime-zgayb8anYJ4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Photo by [Tnarg](https://www.pexels.com/@tnarg/) from [Pexels](https://www.pexels.com/photo/redhead-woman-posing-with-hand-in-hair-5131658/)

Photo by [Jonas Svidras](https://www.pexels.com/@jonas-svidras/) from [Pexels](https://www.pexels.com/photo/woman-wearing-black-spaghetti-strap-top-555787/)

Photo by [DAVID NIETO](https://unsplash.com/@nietramos_d?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/man-in-black-jacket-standing-in-forest-during-daytime-lqHp2DGg_ZA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
`;

function renderEntry(entry: string) {
  const EXCEPTIONS: { key: string; replacement: string }[] = [
    { key: "gsap/component", replacement: "[gsap/component]" },
  ];

  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const applyExceptions = (text: string) => {
    for (const ex of EXCEPTIONS) {
      const idx = text.indexOf(ex.key);
      if (idx !== -1) {
        return text.slice(0, idx) + ex.replacement + text.slice(idx + ex.key.length);
      }
    }
    return text;
  };

  while ((match = regex.exec(entry)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++} style={{
          color: "var(--sub-foreground)",
          transform: "translateY(-8px)",
          display: "inline-block",
          marginLeft: "5px",
          marginRight: "5px",
        }}>
          {applyExceptions(entry.slice(lastIndex, match.index))}
        </span>
      );
    }

    let label = match[1];
    label = applyExceptions(label);

    parts.push(
      <HighlightHover
        key={key++}
        as="a"
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        isRTL={false}
        className="cursor-pointer"
        style={{
          color: "var(--sub-foreground)",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </HighlightHover>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < entry.length) {
    parts.push(
      <span key={key++} style={{ color: "var(--foreground)" }}>
        {entry.slice(lastIndex)}
      </span>
    );
  }

  return parts;
}

export default function CreditModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useApp();
  const isMobile = useIsMobile();
  const baseBorderRadius = 0;

  if (!isOpen) return null;

  const creditEntries = creditsMarkdown
    .trim()
    .split(/\n{2,}/)
    .map((e) => e.trim())
    .filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay onClose={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: isMobile ? 100 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: isMobile ? 100 : 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ overflow: "visible" }}
            onClick={onClose}
          >
            <motion.div
              layout
              transition={{ duration: 0.35, ease: "easeInOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="credit-modal-title"
              className="bg-[var(--background)] flex flex-col relative border text-[var(--foreground)]"
              style={{
                width: "min(480px, 90vw)",
                height: "min(720px, 86vh)",
                borderColor: "#1e1e1e",
                borderRadius: baseBorderRadius,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 border-b border-[#1e1e1e]"
                style={{
                  minHeight: 72,
                  borderTopLeftRadius: baseBorderRadius,
                  borderTopRightRadius: baseBorderRadius,
                  userSelect: "none",
                }}
              >
                <div style={{ width: "36px" }} />
                <span
                  id="credit-modal-title"
                  className="font-headline font-black text-xl select-none mx-auto uppercase tracking-tighter"
                  style={{ userSelect: "none" }}
                >
                  <span style={{ display: "block" }}>{t("credit_inscription")}</span>
                </span>
                <button
                  onClick={onClose}
                  className="p-2 text-white/40 hover:text-white transition-colors"
                  aria-label={t("close")}
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div
                className="flex-grow overflow-y-auto px-6 py-4 custom-scrollbar"
                style={{ borderTop: "1px solid #1e1e1e", textAlign: "center" }}
              >
                <div className="h-5"/>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    lineHeight: 1.75,
                    textAlign: "center",
                  }}
                >
                  {creditEntries.map((entry, idx) => (
                    <li
                      key={idx}
                      style={{
                        marginBottom: idx === creditEntries.length - 1 ? 0 : 20,
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        fontSize: "0.875rem",
                        direction: "ltr"
                      }}
                    >
                      {renderEntry(entry)}
                    </li>
                  ))}
                </ul>
                <div className="h-5"/>
              </div>

              {/* Footer */}
              <div
                className="flex-shrink-0 p-6 border-t border-[#1e1e1e] bg-[var(--background)]"
                style={{
                  borderBottomLeftRadius: baseBorderRadius,
                  borderBottomRightRadius: baseBorderRadius,
                }}
              >
                <RefinedChronicleButton
                  onClick={onClose}
                  className="w-full"
                  variant="default"
                  backgroundColor="#fff"
                  hoverBackgroundColor="var(--theme-color)"
                  textColor="#000"
                  hoverTextColor="#fff"
                  borderRadius={0}
                  fontWeight={900}
                  buttonHeight={isMobile ? "2.75rem" : "2.875rem"}
                  width="100%"
                  type="button"
                >
                  {t("ok_inscription")}
                </RefinedChronicleButton>
              </div>
            </motion.div>
          </motion.div>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}
