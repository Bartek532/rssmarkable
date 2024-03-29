"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ThemedImage } from "@/components/ui/themed-image";

import {
  REPOSITORY_URL,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_TITLE_APPENDIX,
} from "../../../../config";
import { buttonVariants } from "../../../ui/button";

export const Hero = () => {
  return (
    <section
      className="flex w-full !scroll-mt-36 flex-col items-center justify-center gap-4 pb-10 md:gap-6 md:pb-16 lg:pb-32"
      id="hero"
    >
      <motion.a
        className="group mb-3 flex items-center gap-2 rounded-full border-2 border-muted-foreground/10 px-5 py-1 text-xs text-muted-foreground sm:mb-4 sm:text-sm"
        initial={{ opacity: 0, y: -35 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        viewport={{ once: true }}
        href={REPOSITORY_URL}
        target="_blank"
        rel="noreferrer"
      >
        AI coming soon!
        <ArrowRight className="w-4 transition-transform group-hover:translate-x-1" />
      </motion.a>
      <motion.h1
        className="lg:leading-tighter max-w-4xl animate-gradient bg-gradient-to-r from-primary via-muted-foreground via-20% to-primary bg-[length:200%_auto] bg-clip-text text-center text-4xl font-bold tracking-tighter text-transparent md:text-5xl xl:text-6xl 2xl:text-7xl"
        initial={{ opacity: 0, y: -55 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 },
        }}
        viewport={{ once: true }}
      >
        {SITE_TITLE_APPENDIX}
      </motion.h1>
      <motion.p
        className="max-w-2xl text-center text-muted-foreground md:text-xl"
        initial={{ opacity: 0, y: -45 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 },
        }}
        viewport={{ once: true }}
      >
        {SITE_DESCRIPTION}
      </motion.p>
      <motion.div
        className="mt-2 flex gap-4 sm:mt-4"
        initial={{ opacity: 0, y: -45 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeInOut", delay: 0.3 },
        }}
        viewport={{ once: true }}
      >
        <Link href="/auth/login" className={buttonVariants()}>
          Get started
        </Link>
        <Link href="#about" className={buttonVariants({ variant: "outline" })}>
          Learn more
        </Link>
      </motion.div>

      <motion.div
        className="mt-6 flex justify-center"
        initial={{ opacity: 0, rotateX: 35, y: -20 }}
        whileInView={{
          opacity: 1,
          rotateX: 0,
          y: 0,
          transition: { duration: 0.5, ease: "easeInOut", delay: 0.5 },
        }}
        viewport={{ once: true }}
      >
        <ThemedImage
          className="relative w-full rounded-lg sm:mt-10"
          src={SITE_IMAGE}
          defaultVariant="light"
          alt=""
          sizes="(max-width: 1023px) 100vw, 80rem"
          width={2717}
          height={2038}
          priority
        />
      </motion.div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm sm:mt-20 md:text-lg lg:mt-28">
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-14 lg:gap-20"
          initial={{ opacity: 0, y: -45 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold md:text-4xl">1,000+</span>
            <p className="text-muted-foreground">Daily syncs</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-center text-3xl font-bold md:text-4xl">
              120+ hours
            </span>
            <p className="text-muted-foreground">Average saved time</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold md:text-4xl">99.9%</span>
            <p className="text-muted-foreground">Uptime</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
