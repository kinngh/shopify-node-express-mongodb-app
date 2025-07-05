// This import is crucial for augmenting the 'react' module's types.
// It ensures that your custom declarations are merged with React's built-in ones.
import "react";

/**
 * Augments the 'react' module to include type definitions for the 's-spinner'
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
   * Declares the 's-spinner' custom intrinsic element for JSX.
   * This allows you to use <s-spinner> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-spinner' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Displays an animated indicator showing users that content or actions are loading.
       * Use to communicate ongoing processes, such as fetching data from a server.
       * For loading states on buttons, use the “loading” property on the Button component instead.
       */
      "s-spinner": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * A label that describes the purpose of the progress. When set, it will be announced
         * to users using assistive technologies and will provide them with more context.
         * Providing an `accessibilityLabel` is recommended if there is no accompanying text
         * describing that something is loading.
         */
        accessibilityLabel?: string;

        /**
         * Adjusts the size of the spinner.
         */
        size?: "base" | "large" | "large-100";
      };
    }
  }
}
