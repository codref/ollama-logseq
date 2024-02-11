import "@logseq/libs";

import React, { useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { logseq as PL } from "../package.json";
import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";
import { ollamaUI } from "./ollama";

// @ts-expect-error
const css = (t, ...args) => String.raw(t, ...args);

const pluginId = PL.id;

let settings: SettingSchemaDesc[] = [
  {
    key: "host",
    type: "string",
    title: "Host",
    description: "Set the URI of your ollama server",
    default: "http://localhost:11434"
  },
  {
    key: "username",
    type: "string",
    title: "Username",
    description: "Basic HTTP auth username",
    default: ""
  },
  {
    key: "password",
    type: "string",
    title: "Password",
    description: "Basic HTTP auth password",
    default: ""
  },  
  {
    key: "model",
    type: "string",
    title: "LLM Model",
    description: "Set your desired model to use ollama",
    default: "mistral:instruct"
  },
  {
    key: "options",
    type: "object",
    title: "LLM Model Options",
    description: "Set model options https://github.com/ollama/ollama/blob/main/docs/modelfile.md#valid-parameters-and-values",
    default: {}
  },  
  {
    key: "shortcut",
    type: "string",
    title: "Shortcut",
    description: "Shortcut to open plugin command pallete",
    default: "mod+shift+o"
  },
]


function main() {
  console.info(`#${pluginId}: MAIN`);
  logseq.useSettingsSchema(settings)
  const root = ReactDOM.createRoot(document.getElementById("app")!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  function createModel() {
    return {
      show() {
        ollamaUI()
      },
    };
  }

  logseq.provideModel(createModel());
  logseq.setMainUIInlineStyle({
    zIndex: 11,
  });

  const openIconName = "ollama-ui-open";


  logseq.provideStyle(css`
    .${openIconName} {
      opacity: 1;
      font-size: 20px;
      margin-top: 4px;
    }

    .${openIconName}:hover {
      color: red;
    }
  `);

  logseq.App.registerUIItem("toolbar", {
    key: openIconName,
    template: `
      <a data-on-click="show"
         class="button">
        <i class="ti ti-wand"></i>
      </a>
    `,
  });
}
logseq.ready(main).catch(console.error);


