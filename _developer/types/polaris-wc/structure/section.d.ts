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
 * Defines the options for the 'click' method on the s-section element.
 */
interface ClickOptions {
  /**
   * The event you want to influence the synthetic click.
   */
  sourceEvent?: ActivationEventEsque;
}

/**
 * Defines the possible values for the 'padding' property of s-section.
 */
type SectionPadding = "base" | "none";

/**
 * Augments the 'react' module to include type definitions for the 's-section'
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
   * Declares the 's-section' custom intrinsic element for JSX.
   * This allows you to use <s-section> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-section' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Groups related content into clearly-defined thematic areas.
       */
      "s-section": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * A label used to describe the section that will be announced by assistive technologies.
         * When no `heading` property is provided or included as a children of the Section,
         * you **must** provide an `accessibilityLabel` to describe the Section.
         */
        accessibilityLabel?: string;

        /**
         * A title that describes the content of the section.
         */
        heading?: string;

        /**
         * Adjust the padding of all edges.
         * - `base`: applies padding that is appropriate for the element.
         * - `none`: removes all padding from the element.
         */
        padding?: SectionPadding;

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
