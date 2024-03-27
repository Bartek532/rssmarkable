import { WebSocket } from "ws";

import { LOCAL_RELOAD_SOCKET_URL } from "../reload/constant";
import MessageInterpreter from "../reload/interpreter";

import type { PluginOption } from "vite";

export default function watchRebuild(config: {
  afterWriteBundle: () => void;
}): PluginOption {
  const ws = new WebSocket(LOCAL_RELOAD_SOCKET_URL);
  return {
    name: "watch-rebuild",
    writeBundle() {
      /**
       * When the build is complete, send a message to the reload server.
       * The reload server will send a message to the client to reload or refresh the extension.
       */
      ws.send(MessageInterpreter.send({ type: "build_complete" }));

      sendNextQueue(() => {
        config.afterWriteBundle();
      });
    },
  };
}

function sendNextQueue(callback: () => void) {
  setTimeout(() => {
    callback();
  }, 0);
}
