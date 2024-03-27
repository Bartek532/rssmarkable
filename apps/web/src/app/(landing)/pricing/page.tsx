import { Pricing } from "@/components/landing/pricing/pricing";

import { getMetadata } from "../../../lib/metadata";

export const metadata = getMetadata({
  title: "Pricing",
});

const PricingPage = () => {
  return <Pricing />;
};

export default PricingPage;
