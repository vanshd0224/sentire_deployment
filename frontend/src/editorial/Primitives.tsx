import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  EASE_OUT_EXPO,
  fadeUp,
  imageWipe,
  maskLine,
  viewportOnce,
} from "./motion";

/** Small mono label used above every section heading. */
export function Label({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`ed-label ${className}`}>{children}</p>;
}

/** A rule that draws itself in as it enters the viewport. */
export function Rule({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`h-px w-full origin-left bg-[color:var(--color-rule)] ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1, ease: EASE_OUT_EXPO }}
    />
  );
}

/** Headline that reveals word by word from behind a clip. */
export function MaskedHeading({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="flex flex-wrap"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="overflow-hidden pb-[0.08em] pr-[0.26em]"
          >
            <motion.span
              className="block will-change-transform"
              variants={maskLine}
              custom={i + delay}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function FadeIn({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

/** Image that wipes open. Wrapper keeps layout stable, so CLS stays at zero. */
export function WipeImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  loading = "lazy",
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        sizes={sizes}
        className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
        variants={imageWipe}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      />
    </div>
  );
}

/** Section header: mono label on the left, optional link on the right. */
export function SectionHead({
  label,
  title,
  action,
}: {
  label: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div>
      <Rule />
      <div className="flex flex-wrap items-end justify-between gap-4 pt-5 md:pt-7">
        <div className="max-w-2xl">
          <Label>{label}</Label>
          <MaskedHeading
            text={title}
            className="mt-3 font-serif text-[clamp(2rem,5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink"
          />
        </div>
        {action}
      </div>
    </div>
  );
}
