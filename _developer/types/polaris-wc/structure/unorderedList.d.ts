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
 * Defines the options for the 'click' method.
 */
interface ClickOptions {
  /**
   * The event you want to influence the synthetic click.
   */
  sourceEvent?: ActivationEventEsque;
}

/**
 * Augments the 'react' module to include type definitions for the 's-unordered-list'
 * and 's-list-item' custom elements and their associated attributes.
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
   * Declares the 's-unordered-list' and 's-list-item' custom intrinsic elements for JSX.
   * This allows you to use them directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-unordered-list' custom element.
       * It extends standard HTML attributes.
       *
       * Displays a bulleted list of related items.
       */
      "s-unordered-list": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        // No specific properties listed for s-unordered-list itself in the provided documentation
      };

      /**
       * The 's-list-item' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Represents a single item within an unordered or ordered list.
       * Use only as a child of `s-unordered-list` or `s-ordered-list` components.
       */
      "s-list-item": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
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
