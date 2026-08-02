#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const docsDir = path.join(root, "apps/docs");

class TestElement {
  constructor(selector = "") {
    this.selector = selector;
    this.attributes = new Map();
    this.dataset = {};
    this.hidden = false;
    this.innerHTML = "";
    this.textContent = "";
    this.value = "";
    this.style = { setProperty() {} };
    this.classList = {
      add() {},
      remove() {},
      contains() {
        return false;
      },
    };
  }

  addEventListener() {}
  append() {}
  closest() {
    return null;
  }
  focus() {}
  getAttribute(name) {
    return this.attributes.get(name) ?? "";
  }
  getBoundingClientRect() {
    return { bottom: 0, left: 0, right: 1024, width: 1024 };
  }
  querySelector() {
    return null;
  }
  querySelectorAll() {
    return [];
  }
  remove() {}
  removeAttribute(name) {
    this.attributes.delete(name);
  }
  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }
}

const app = new TestElement("#app");
const body = new TestElement("body");
const documentElement = new TestElement("html");
const listeners = new Map();

globalThis.window = {
  innerWidth: 1024,
  location: { hash: "#/home" },
  addEventListener(type, listener) {
    listeners.set(type, [...(listeners.get(type) ?? []), listener]);
  },
  dispatchEvent(event) {
    for (const listener of listeners.get(event.type) ?? []) listener(event);
  },
};

globalThis.document = {
  body,
  documentElement,
  createElement(selector) {
    return new TestElement(selector);
  },
  addEventListener() {},
  querySelector(selector) {
    if (selector === "#app") return app;
    if (selector === "body") return body;
    if (selector === "html") return documentElement;
    return null;
  },
  querySelectorAll() {
    return [];
  },
};

globalThis.localStorage = {
  getItem() {
    return null;
  },
  setItem() {},
};
globalThis.requestAnimationFrame = (callback) => setTimeout(callback, 0);
globalThis.getComputedStyle = () => ({
  getPropertyValue() {
    return "0px";
  },
  inlineSize: "0px",
});
globalThis.Event = class Event {
  constructor(type) {
    this.type = type;
  }
};

globalThis.fetch = async (sourcePath) => {
  const absolute = path.normalize(path.join(docsDir, sourcePath));
  try {
    const text = await fs.readFile(absolute, "utf8");
    return {
      ok: true,
      status: 200,
      async json() {
        return JSON.parse(text);
      },
    };
  } catch {
    return {
      ok: false,
      status: 404,
      async json() {
        return {};
      },
    };
  }
};

const appUrl = `${pathToFileURL(path.join(docsDir, "app.js")).href}?runtime=${Date.now()}`;
await import(appUrl);

async function waitForBoot() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (window.__systemBoot?.status === "ready" || window.__systemBoot?.status === "failed") return;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}

await waitForBoot();

if (window.__systemBoot?.status !== "ready") {
  throw new Error(`Docs boot failed: ${window.__systemBoot?.message ?? "unknown"}`);
}

const routes = [
  "#/foundations/energy",
  "#/components/button",
  "#/components/select",
  "#/components/card",
  "#/primitives/density",
  "#/patterns/select-option-layer",
  "#/templates/driver-card-wallet",
];

for (const route of routes) {
  window.location.hash = route;
  window.dispatchEvent(new Event("hashchange"));
  if (window.__systemBoot?.status === "failed") {
    throw new Error(`Docs route failed ${route}: ${window.__systemBoot.message}`);
  }
  if (!app.innerHTML || app.innerHTML.length < 100) {
    throw new Error(`Docs route rendered empty content: ${route}`);
  }
  if (app.innerHTML.includes("shell.bootFailedTitle") || app.innerHTML.includes("Design System docs failed")) {
    throw new Error(`Docs route rendered boot failure fallback: ${route}`);
  }
}

console.log("docs runtime routes passed");
