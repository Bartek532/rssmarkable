import { DeviceType } from "@rssmarkable/database";
import { NODE_ENV } from "@rssmarkable/shared";

import { env } from "../lib/env/client";

import type { DefaultToastOptions } from "react-hot-toast";

export const ORIGIN =
  env.NEXT_PUBLIC_HOST ??
  env.NEXT_PUBLIC_VERCEL_URL ??
  ("rssmarkable.com" as const);
export const PROTOCOL = env.NODE_ENV === NODE_ENV.PRODUCTION ? "https" : "http";
export const HOST = `${PROTOCOL}://${ORIGIN}` as const;
export const SITE_TITLE = "RSSmarkable";
export const SITE_TITLE_APPENDIX =
  "Seamlessly sync articles and feeds from the web.";
export const SITE_DESCRIPTION =
  "Say goodbye to your RSS reader. Sync your favorite content to selected device and read without distractions with just a few clicks.";
export const SEPARATOR = " | ";
export const SITE_TITLE_TEMPLATE = `%s${SEPARATOR}${SITE_TITLE}`;

export const SITE_IMAGE = {
  light: "/images/banner/light.png",
  dark: "/images/banner/dark.png",
};

export const REPOSITORY_URL = "https://github.com/Bartek532/rssmarkable";
export const TWITTER_URL = "https://twitter.com/bzagrodzki";

export const LANDING_HEADER_NAVIGATION = [
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
];

export const LANDING_FEATURES = {
  title: {
    base: "See the",
    sparkling: "magic",
  },
  description: `Enjoy the features which make RSSmarkable great.`,
  list: [
    {
      title: "Simple",
      description: `You need only 5 clicks to do full setup and sync your first article. Configure once, use forever.`,
      image: {
        light: "/images/landing/features/light/simple.png",
        dark: "/images/landing/features/dark/simple.png",
      },
    },
    {
      title: "Fast",
      description: `Average sync time is less than 5 seconds. We use the latest technologies to ensure your data is always up to date.`,
      image: {
        light: "/images/landing/features/light/fast.png",
        dark: "/images/landing/features/dark/fast.png",
      },
    },
    {
      title: "Reliable",
      description: `Downtime is not an option. It's our top priority to provide you the best possible experience.`,
      image: {
        light: "/images/landing/features/light/reliable.png",
        dark: "/images/landing/features/dark/reliable.png",
      },
    },
  ],
};

export const LANDING_REVIEWS = {
  title: "What our users say",
  description: `We are proud to have such a great community.`,
  quote: {
    content: `I love RSSmarkable. It's so easy to use and it works flawlessly. I can finally read my favorite articles without any fluff.`,
    author: {
      name: "Philipp",
      position: "Software Engineer",
      avatar: "/images/landing/reviews/philipp.avif",
    },
  },
};

export const LANDING_OPEN_SOURCE = {
  title: "Create the future together!",
  description: `We believe in transparency and the power of the community, so if you have any ideas or suggestions, feel free to give us a signal. We're open to any feedback!`,
  cta: {
    href: REPOSITORY_URL,
    text: "See on Github",
  },
};

export const LANDING_FAQ = {
  title: "Frequently asked questions",
  questions: [
    {
      question: "What is RSSmarkable?",
      answer: `RSSmarkable is a service that allows you to sync content from the web to your favorite device.`,
    },
    {
      question: "How much does it cost?",
      answer: `It's completely free! We're thinking about adding a premium plan in the future with some extra features.`,
    },
    {
      question: "What can I sync?",
      answer: `You can sync almost any content from the web. We support also RSS feeds, which allows you to follow your favorites blogs and websites. Just drop a link and we'll do the rest.`,
    },
    {
      question: "How do I get started?",
      answer: `Create an account and connect your device. That's it!`,
    },
    {
      question: "Can I contribute?",
      answer: `Always! We're open to any feedback and ideas, just give us a shout and we'll figure something out.`,
    },
  ],
};

export const LANDING_CTA = {
  title: "Experience the workflow the users love.",
  button: "Register for free",
};

export const LANDING_CONTACT = {
  title: "Contact",
  description: `If you have any questions or suggestions, please don't hesitate to drop us a message.`,
};

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: {
      month: 0,
      year: 0,
    },
    popular: true,
    trial: false,
    description: "Start consuming now. No credit card required",
    features: [
      {
        available: true,
        new: false,
        title: "Seamless sync",
      },
      {
        available: true,
        new: false,
        title: "reMarkable support",
      },
      {
        available: true,
        new: true,
        title: "Kindle support",
      },
      {
        available: true,
        new: false,
        title: "Multiple formats (pdf, epub)",
      },
      {
        available: true,
        new: false,
        title: "Feeds management",
      },
      {
        available: true,
        new: false,
        title: "Realtime tracking (logs, history)",
      },
      {
        available: true,
        new: false,
        title: "Simple analytics",
      },
    ],
    cta: {
      title: "Get started",
      link: "/auth/register",
    },
  },
  // {
  //   name: "Pro",
  //   price: {
  //     month: 15,
  //     year: 109,
  //   },
  //   popular: true,
  //   trial: true,
  //   description: "For small teams and personal projects",
  //   features: [
  //     "Everything in Starter",
  //     "Custom Domain",
  //     "Advanced Functions",
  //     "Advanced Database",
  //     "Advanced Analytics",
  //     "Priority Support",
  //   ],
  // },
  // {
  //   name: "Enterprise",
  //   price: {
  //     month: 29,
  //     year: 309,
  //   },
  //   popular: false,
  //   trial: false,
  //   description: "For large teams and businesses",
  //   features: [
  //     "Everything in Pro",
  //     "Enterprise Functions",
  //     "Enterprise Database",
  //     "Enterprise Analytics",
  //     "SLA",
  //     "Dedicated Support",
  //   ],
  // },
];

export const TOASTER_CONFIG: DefaultToastOptions = {
  className: "!bg-background !text-primary",
  style: {
    padding: "14px 25px",
    minWidth: "250px",
    gap: "10px",
    maxWidth: "400px",
  },
};

export const DEVICE_LABEL: Record<DeviceType, string> = {
  [DeviceType.KINDLE]: "Kindle",
  [DeviceType.REMARKABLE]: "reMarkable 2",
};
