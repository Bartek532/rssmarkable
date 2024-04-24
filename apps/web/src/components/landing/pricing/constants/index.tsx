import { PricingPlanType } from "@syncreads/database";

import type { PriceType, RecurringPriceInterval } from "@/types/payment.types";

export * from "./features";

export const PRICING_MODEL: PriceType = "one_time";
export const DEFAULT_SUBSCRIPTION_INTERVAL: RecurringPriceInterval = "month";
export const TRIAL_DURATION_DAYS = 3;
export const TRIAL_ON_PLANS: string[] = [PricingPlanType.PREMIUM];
export const MOST_POPULAR_PLANS: string[] = [
  PricingPlanType.STARTER,
  PricingPlanType.PREMIUM,
];
