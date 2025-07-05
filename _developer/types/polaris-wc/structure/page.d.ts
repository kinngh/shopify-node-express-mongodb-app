// This import is crucial for augmenting the 'react' module's types.
// It ensures that your custom declarations are merged with React's built-in ones.
import "react";

/**
 * Defines the structure for the 'ActivationEventEsque' object,
 * used to influence synthetic click behavior.
 */
interface ActivationEventEsque {
  shiftKey: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
  button: number;
}

/**
 * Defines the options for the 'click' method on the s-page element.
 */
interface ClickOptions {
  /**
   * The event you want to influence the synthetic click.
   */
  sourceEvent?: ActivationEventEsque;
}

/**
 * Defines the possible values for the 'inlineSize' property of s-page.
 */
type PageInlineSize = "small" | "base" | "large";

/**
 * Augments the 'react' module to include type definitions for the 's-page'
 * custom element and its associated attributes.
 */
declare module "react" {
  /**
   * Extends the standard HTMLAttributes interface to include
   * your custom global attributes that can be applied to any HTML element.
   * (Keeping these from previous contexts for consistency, remove if not needed globally).
   */
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    fooAttr?: string;
    xattr?: "xval";
  }

  /**
   * Declares the 's-page' custom intrinsic element for JSX.
   * This allows you to use <s-page> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-page' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Use `s-page` as the main container for placing content in your app.
       */
      "s-page": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * The inline size of the page.
         * - `base` corresponds to a set default inline size.
         * - `large` full width with whitespace.
         */
        inlineSize?: PageInlineSize;

        // Slots are typically represented by children or specific props in React,
        // but for Web Components, they are actual <slot> elements.
        /**
         * The content to display in the aside section of the page.
         * This slot is only rendered when `inlineSize` is "base".
         */
        aside?: React.ReactNode; // Represents the content for the named slot 'aside'

        // Methods (these are typically accessed on the DOM element directly, not as JSX props)
        // click?: (options?: ClickOptions) => void;
        // queueRender?: () => void;
        // setAttribute?: (name: string, value: string) => void;
        // adoptedCallback?: () => void;
        // attributeChangedCallback?: (name: string) => void;
        // connectedCallback?: () => void;
        // disconnectedCallback?: () => void;
      };
    }
  }
}
