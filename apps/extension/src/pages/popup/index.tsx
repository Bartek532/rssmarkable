import "@rssmarkable/config/ui/css/globals.css";
import { createRoot } from "react-dom/client";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

import { Popup } from "@/components/popup/popup";
import "@/pages/popup/index.css";

refreshOnUpdate("pages/popup");

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Cannot find #app-container!");
  }
  const root = createRoot(appContainer);
  root.render(<Popup />);
}

init();
