import logo from "@/assets/svg/logo.svg";
import { APP_LINK } from "@/utils";

export const Footer = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <img
          src={logo}
          alt="RSSmarkable logo"
          className="w-4 select-none opacity-70"
        />
        <span className="text-[0.65rem] text-muted-foreground">
          Powered by{" "}
          <a
            href={APP_LINK}
            target="_blank"
            rel="noreferrer"
            className="underline hover:no-underline"
          >
            RSSMarkable
          </a>
        </span>
      </div>
    </div>
  );
};
