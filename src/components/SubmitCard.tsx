"use client";

import {
  motion,
  Variants,
  useAnimation,
  useReducedMotion,
} from "framer-motion";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  useId,
  CSSProperties,
} from "react";
import { cn } from "@/lib/utils";
import RefinedChronicleButton from "./RefinedChronicleButton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

const mainVariant: Variants = {
  initial: { x: 0, y: 0, boxShadow: "0px 10px 50px rgba(0,0,0,0.1)" },
  animate: { x: 20, y: -20, boxShadow: "0px 10px 50px rgba(0,0,0,0.2)" },
};

const mainVariantRTL: Variants = {
  initial: { x: 0, y: 0, boxShadow: "0px 10px 50px rgba(0,0,0,0.1)" },
  animate: { x: -20, y: -20, boxShadow: "0px 10px 50px rgba(0,0,0,0.2)" },
};

const secondaryVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export interface PlusIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}
interface PlusIconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
}
const PlusIconDraw = forwardRef<PlusIconHandle, PlusIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, color = "var(--theme-color)", ...props }, ref) => {
    const controls = useAnimation();
    const reduced = useReducedMotion();
    const isControlled = useRef(false);
    useImperativeHandle(ref, () => {
      isControlled.current = true;
      return {
        startAnimation: () =>
          reduced ? controls.start("normal") : controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });
    const handleEnter = useCallback(() => {
      if (reduced) return;
      if (!isControlled.current) controls.start("animate");
      else onMouseEnter?.(undefined as any);
    }, [controls, reduced, onMouseEnter]);
    const handleLeave = useCallback(() => {
      if (!isControlled.current) controls.start("normal");
      else onMouseLeave?.(undefined as any);
    }, [controls, onMouseLeave]);
    const plusVariants: Variants = {
      normal: { scale: 1, rotate: 0 },
      animate: {
        scale: [1, 1.2, 0.85, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 1, ease: "easeInOut", repeat: 0 },
      },
    };
    const lineVariants: Variants = {
      normal: { pathLength: 1, opacity: 1 },
      animate: {
        pathLength: [0, 1],
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: "easeInOut",
          repeat: 0,
          repeatDelay: 0.4,
        },
      },
    };
    return (
      <motion.div
        className={cn("inline-flex items-center justify-center", className)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 21"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          initial="normal"
          variants={plusVariants}
        >
          <motion.path d="M5 12h14" variants={lineVariants} />
          <motion.path d="M12 5v14" variants={lineVariants} />
        </motion.svg>
      </motion.div>
    );
  }
);
PlusIconDraw.displayName = "PlusIconDraw";

interface PlusIconRotateProps {
  size?: number;
  color?: string;
  durationMs?: number;
  isSpinningCW?: boolean;
}
const PlusIconRotate: React.FC<PlusIconRotateProps> = ({
  size = 42,
  color = "var(--theme-color)",
  durationMs = 400,
  isSpinningCW = false,
}) => {
  const spin: CSSProperties = {
    animation: `${isSpinningCW ? "spinCW" : "spinCCW"} ${
      durationMs / 1000
    }s ease-in-out 1`,
    transformOrigin: "center",
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={spin}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
      <style>
        {`
          @keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        `}
      </style>
    </svg>
  );
};

export interface SubmitCardProps {
  id?: string;
  isRTL?: boolean;
  link?: string;
  title: string;
  location: string;
  description: string;
  imageSrc?: string;
  useDrawIcon?: boolean;
  centerContent?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  innerAreaBgColor?: string;
  innerBorderColor?: string;
  squareBgColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  plusIconColor?: string;
  dashedBorderColor?: string;
  textHoverShift?: number;
  borderRadius?: string;
  className?: string;
  isExpanded?: boolean;
}

export default function SubmitCard({
  id,
  isRTL = false,
  link = "#",
  title,
  location,
  description,
  imageSrc,
  useDrawIcon = false,
  centerContent = false,
  backgroundColor = "#0a0a0a",
  borderColor = "#1e1e1e",
  innerAreaBgColor = "#111111",
  innerBorderColor = "#333333",
  squareBgColor = "#ffffff",
  titleColor = "#ffffff",
  descriptionColor = "#aaaaaa",
  plusIconColor = "var(--theme-color)",
  dashedBorderColor = "var(--theme-color)",
  textHoverShift = 6,
  borderRadius = "var(--radius)",
  className,
  isExpanded = false,
}: SubmitCardProps) {
  const componentId = id ?? useId();
  const plusIconRef = useRef<PlusIconHandle>(null);
  const [hover, setHover] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { t } = useApp();

  const textDirection = isRTL ? "rtl" : "ltr";
  // Mobile uses one card per row -> center content
  const isOneCol = typeof window !== 'undefined' && window.innerWidth < 960;
  const baseTextAlign = isOneCol ? "center" : isRTL ? "right" : "left";
  const showImage = imageSrc && !imageError;

  return (
    <motion.div
      dir={textDirection}
      className={cn(
        "group block p-6 border transition-all duration-200",
        className
      )}
      style={{
        borderRadius,
        borderColor,
        backgroundColor,
        textAlign: baseTextAlign,
      }}
      initial="initial"
      whileHover="animate"
      onHoverStart={() => {
        setHover(true);
        plusIconRef.current?.startAnimation();
      }}
      onHoverEnd={() => {
        setHover(false);
        plusIconRef.current?.stopAnimation();
      }}
    >
      <div className={cn("flex flex-col h-full gap-6", isOneCol && "items-center")}>
        {/* Image Container */}
        <div 
          className="relative w-full overflow-hidden" 
          style={{ 
            aspectRatio: isExpanded ? "32/10" : "16/10",
            borderRadius
          }}
        >
          <div
            className="w-full h-full relative grid place-items-center border"
            style={{
              borderRadius,
              borderColor: innerBorderColor,
              backgroundColor: innerAreaBgColor,
            }}
          >
            {showImage ? (
              <div
                className="w-full h-full"
                style={{
                  backgroundColor: innerAreaBgColor,
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  borderRadius,
                }}
              />
            ) : (
              <div className="relative w-auto h-1/2 aspect-square">
                <motion.div
                  variants={secondaryVariant}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="absolute inset-0 border border-dashed"
                  style={{
                    borderColor: dashedBorderColor,
                    borderRadius: borderRadius,
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />
                <motion.div
                  layoutId={"file-upload-" + componentId}
                  variants={isRTL ? mainVariantRTL : mainVariant}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative z-10 flex items-center justify-center h-full w-full mx-auto shadow-lg"
                  style={{ backgroundColor: squareBgColor, borderRadius: borderRadius, }}
                >
                  <div
                    style={{
                      transform: !showImage && isRTL ? "scaleX(-1)" : "none",
                    }}
                  >
                    {useDrawIcon ? (
                      <PlusIconDraw
                        ref={plusIconRef}
                        size={42}
                        color={plusIconColor}
                      />
                    ) : (
                      <PlusIconRotate
                        size={42}
                        color={plusIconColor}
                        isSpinningCW={hover}
                      />
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className={cn("flex-1 flex flex-col gap-4", isOneCol && "items-center")}>
          <div className="font-headline relative">
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter leading-none relative z-10 mix-blend-difference" style={{ color: titleColor }}>
               <span className="relative inline-block px-1">
                 {title}
                 <span 
                    className={cn(
                        "absolute inset-y-0 bg-[var(--theme-color)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 -z-10",
                        isOneCol ? "inset-x-[-1px] origin-center" : (isRTL ? "right-0 -left-[1px] origin-right" : "left-0 -right-[1px] origin-left")
                    )} 
                 />
               </span>
            </h3>
            <span className="font-mono text-[10px] uppercase opacity-40 block mt-2">
              {location}
            </span>
          </div>

          <p className={cn("text-sm md:text-base leading-relaxed opacity-60 max-w-xl", isOneCol && "text-center")}>
            {description}
          </p>

          <div className={cn(
              "mt-auto pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full",
              isOneCol && "items-center"
          )}>
            <div className={cn("font-mono text-xs relative", isOneCol && "text-center")}>
              <span className="opacity-40 block mb-1">{t('fee_pp')}</span>
              <span className="text-xl font-black text-white italic relative z-10 px-1 inline-block">
                <span className="relative -left-[2px]">$2,850.00</span>
                <span 
                    className={cn(
                        "absolute inset-y-0 bg-[var(--theme-color)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 -z-10",
                        isOneCol ? "inset-x-[-1px] origin-center" : (isRTL ? "right-0 -left-[1px] origin-right" : "left-0 -right-[1px] origin-left")
                    )} 
                />
              </span>
            </div>

            <RefinedChronicleButton
              isRTL={isRTL}
              backgroundColor="#fff"
              textColor="#000"
              hoverBackgroundColor="var(--theme-color)"
              hoverTextColor="#fff"
              className="font-black uppercase tracking-tighter scale-110"
              borderRadius="var(--radius)"
              fontSize="1.125rem"
              padding="0.875rem 2.5rem"
            >
              {isRTL ? (
                <>
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  הזמן
                </>
              ) : (
                <>
                  Book
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </RefinedChronicleButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
