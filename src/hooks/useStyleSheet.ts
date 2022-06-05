/* eslint-disable no-extra-boolean-cast */
import { RefObject } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { getShadowRoot } from "../utils/shadowRoot";
import { getNonce } from "../utils/nonce";

// Bundler is configured to load this as a processed minified CSS-string
import styles from "../css/styles.css";

const styleElementMap: Map<Document | ShadowRoot, HTMLStyleElement> = new Map();

/**
 * Injects CSS code into the document's <head>
 */
export const useStyleSheet = (nodeRef: RefObject<HTMLDivElement>): void => {
  useIsomorphicLayoutEffect(() => {
    const parentDocument = nodeRef.current
      ? !!getShadowRoot(nodeRef.current)
        ? getShadowRoot(nodeRef.current)
        : nodeRef.current.ownerDocument
      : document;

    if (parentDocument && !styleElementMap.has(parentDocument)) {
      const styleElement = document.createElement("style");
      styleElement.innerHTML = styles;
      styleElementMap.set(parentDocument, styleElement);

      // Conform to CSP rules by setting `nonce` attribute to the inline styles
      const nonce = getNonce();
      if (nonce) styleElement.setAttribute("nonce", nonce);
      !!getShadowRoot(nodeRef.current)
        ? parentDocument.appendChild(styleElement)
        : parentDocument.head.appendChild(styleElement);
    }
  }, []);
};
