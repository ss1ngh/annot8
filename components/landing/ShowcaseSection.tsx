"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Columns2, LineSquiggle, NotebookPen } from "lucide-react";
import Image from "next/image";

const ShowcaseSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Mockup scale & flatten out
  const rotateX = useTransform(scrollYProgress, [0, 0.20], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.20], [0.95, 1]);

  // Card sequences synchronized to the 400vh scroll
  // Card 1: Dual-Pane (bottom center)
  const card1Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const card1Y = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [40, 0, 0, -40]);

  // Card 2: Freehand Precision (top left)
  const card2Opacity = useTransform(scrollYProgress, [0.40, 0.50, 0.60, 0.70], [0, 1, 1, 0]);
  const card2Y = useTransform(scrollYProgress, [0.40, 0.50, 0.60, 0.70], [40, 0, 0, -40]);

  // Card 3: Pro Note-taking (bottom right)
  const card3Opacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0]);
  const card3Y = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [40, 0, 0, -40]);

  return (
    <section ref={containerRef} className="h-[400vh] w-full relative z-20">
      {/* overflow-visible so cards can escape the mockup frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
        <div style={{ perspective: "1000px" }} className="w-full flex items-center justify-center px-4 md:px-8">

          {/* Sticky Mockup — cards are siblings to the image div, not inside it */}
          <motion.div
            style={{ rotateX, scale }}
            className="w-full max-w-6xl aspect-[16/10] md:aspect-video border border-[#444444] p-1.5 md:p-3 bg-[#111111] rounded-[24px] relative z-10 shadow-2xl origin-center"
          >
            {/* Screenshot — overflow-hidden only on the image container */}
            <div className="h-full w-full overflow-hidden rounded-[16px] bg-gray-100 dark:bg-zinc-900 relative">
              <Image
                src="/annot8-banner.png"
                alt="Annot8 - PDF Annotation Workspace"
                fill
                className="object-cover object-top"
                priority
                draggable={false}
              />
            </div>

            {/* Feature cards are outside the overflow-hidden image div,
                still inside the motion.div frame so they position relative to it,
                and can visually overflow on top of / outside the frame */}

            {/* Feature 1: Dual-Pane Workspace */}
            <motion.div
              style={{ opacity: card1Opacity, y: card1Y, x: '-50%' }}
              className="absolute bottom-[70%] left-1/2 z-50 w-[90%] sm:w-[340px]"
            >
              <div className="relative bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl p-4 shadow-2xl flex items-center gap-4">
                {/* Arrow Pointing Down */}
                <svg className="absolute -bottom-[50px] left-1/2 -translate-x-1/2 w-8 h-[50px] overflow-visible hidden md:block" viewBox="0 0 24 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0 L12 46 M12 46 L4 38 M12 46 L20 38" stroke="#f08a6b" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Mobile Arrow */}
                <svg className="absolute -bottom-[30px] left-1/2 -translate-x-1/2 w-6 h-[30px] overflow-visible md:hidden" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0 L12 26 M12 26 L4 18 M12 26 L20 18" stroke="#f08a6b" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div className="bg-orange-50 text-[#f08a6b] p-3 rounded-2xl shrink-0">
                  <Columns2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base mb-0.5 tracking-tight">Dual-View Workflow</h4>
                  <p className="text-[11px] md:text-xs text-gray-500 leading-tight">PDF on left, Markdown on right. Side-by-side efficiency.</p>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Freehand Precision */}
            <motion.div
              style={{ opacity: card2Opacity, y: card2Y }}
              className="absolute top-[15%] -left-[20%] z-50 w-[85%] sm:w-[320px]"
            >
              <div className="relative bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl p-4 shadow-2xl flex items-center gap-4">
                {/* Arrow Pointing Down-Right to the PDF */}
                <svg className="absolute -bottom-16 left-[80%] w-16 h-16 overflow-visible hidden md:block" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0 L60 60 M60 60 L40 60 M60 60 L60 40" stroke="#eab308" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Mobile Arrow */}
                <svg className="absolute -bottom-10 left-[70%] w-10 h-10 overflow-visible md:hidden" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0 L40 40 M40 40 L20 40 M40 40 L40 20" stroke="#eab308" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div className="bg-yellow-50 text-yellow-500 p-3 rounded-2xl shrink-0">
                  <LineSquiggle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base mb-0.5 tracking-tight">Freehand Precision</h4>
                  <p className="text-[11px] md:text-xs text-gray-500 leading-tight">Doodle or sketch directly on the PDF anywhere you need.</p>
                </div>
              </div>
            </motion.div>

            {/* Feature 3: Pro Note-Taking */}
            <motion.div
              style={{ opacity: card3Opacity, y: card3Y }}
              className="absolute bottom-[20%] -right-[15%] z-50 w-[85%] sm:w-[320px]"
            >
              <div className="relative bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl p-4 shadow-2xl flex items-center gap-4">
                {/* Arrow Pointing Up-Left to Markdown side */}
                <svg className="absolute -top-16 right-[80%] w-16 h-16 overflow-visible hidden md:block" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M64 64 L4 4 M4 4 L24 4 M4 4 L4 24" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Mobile Arrow */}
                <svg className="absolute -top-10 right-[70%] w-10 h-10 overflow-visible md:hidden" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 40 L0 0 M0 0 L20 0 M0 0 L0 20" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div className="bg-blue-50 text-blue-500 p-3 rounded-2xl shrink-0">
                  <NotebookPen size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base mb-0.5 tracking-tight">Pro Note-Taking</h4>
                  <p className="text-[11px] md:text-xs text-gray-500 leading-tight">Write clean formatting in Markdown and export instantly.</p>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
