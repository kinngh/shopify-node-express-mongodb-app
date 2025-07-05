// This import is crucial for augmenting the 'react' module's types.
// It ensures that your custom declarations are merged with React's built-in ones.
import "react";

/**
 * Defines the possible values for the 'accessibilityRole' property for s-heading.
 */
type HeadingAccessibilityRole = "none" | "presentation" | "heading";

/**
 * Defines the possible values for the 'accessibilityVisibility' property.
 */
type AccessibilityVisibility = "visible" | "hidden" | "exclusive";

/**
 * Augments the 'react' module to include type definitions for the 's-heading'
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
   * Declares the 's-heading' custom intrinsic element for JSX.
   * This allows you to use <s-heading> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-heading' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Renders hierarchical titles to communicate the structure and organization of page content.
       */
      "s-heading": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * Sets the semantic meaning of the component’s content.
         */
        accessibilityRole?: HeadingAccessibilityRole;

        /**
         * Changes the visibility of the element.
         */
        accessibilityVisibility?: AccessibilityVisibility;

        /**
         * Truncates the text content to the specified number of lines.
         */
        lineClamp?: number;
      };
    }
  }
}
