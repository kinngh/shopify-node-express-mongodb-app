// This import is crucial for augmenting the 'react' module's types.
// It ensures that your custom declarations are merged with React's built-in ones.
import "react";

/**
 * Defines the possible values for the 'accessibilityVisibility' property.
 */
type AccessibilityVisibility = "visible" | "hidden" | "exclusive";

/**
 * Defines the possible keyword values for colors.
 */
type ColorKeyword = "subdued" | "base";

/**
 * Defines the possible values for text direction.
 */
type TextDirection = "" | "auto" | "ltr" | "rtl";

/**
 * Defines the possible values for font-variant-numeric.
 */
type FontVariantNumeric = "auto" | "normal" | "tabular-nums";

/**
 * Defines the possible keyword values for component tones.
 */
type ComponentTone =
  | "info"
  | "success"
  | "warning"
  | "critical"
  | "auto"
  | "neutral"
  | "caution";

/**
 * Augments the 'react' module to include type definitions for the 's-paragraph'
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
   * Declares the 's-paragraph' custom intrinsic element for JSX.
   * This allows you to use <s-paragraph> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-paragraph' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Displays a block of text, and can contain inline elements.
       */
      "s-paragraph": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * Changes the visibility of the element.
         */
        accessibilityVisibility?: AccessibilityVisibility;

        /**
         * Modify the color to be more or less intense.
         */
        color?: ColorKeyword;

        /**
         * Indicates the directionality of the element’s text.
         */
        dir?: TextDirection;

        /**
         * Set the numeric properties of the font.
         */
        fontVariantNumeric?: FontVariantNumeric;

        /**
         * Truncates the text content to the specified number of lines.
         */
        lineClamp?: number;

        /**
         * Sets the tone of the component, based on the intention of the information being conveyed.
         */
        tone?: ComponentTone;
      };
    }
  }
}
