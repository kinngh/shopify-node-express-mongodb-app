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
 * Defines the options for the 'click' method on the s-banner element.
 */
interface ClickOptions {
  /**
   * The event you want to influence the synthetic click.
   */
  sourceEvent?: ActivationEventEsque;
}

/**
 * Defines the type for a generic callback event listener.
 * This is derived from the documentation's `CallbackEventListener` and `CallbackEvent`.
 * It assumes `TEvent` is a standard DOM event type (e.g., Event).
 *
 * @template TTagName The tag name of the HTML element (e.g., 's-banner').
 * @template TEvent The underlying DOM event type (e.g., Event).
 */
type CustomCallbackEventListener<
  TTagName extends keyof HTMLElementTagNameMap,
  TEvent extends Event,
> =
  | ((
      event: TEvent & { currentTarget: HTMLElementTagNameMap[TTagName] }
    ) => void)
  | null;

/**
 * Augments the 'react' module to include type definitions for the 's-banner'
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
   * Declares the 's-banner' custom intrinsic element for JSX.
   * This allows you to use <s-banner> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-banner' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       */
      "s-banner": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * Determines whether the close button of the banner is present.
         */
        dismissible?: boolean;

        /**
         * The title of the banner.
         */
        heading?: string;

        /**
         * Determines whether the banner is hidden.
         */
        hidden?: boolean;

        /**
         * Sets the tone of the Banner, based on the intention of the information being conveyed.
         */
        tone?: "info" | "success" | "warning" | "critical" | "auto";

        // Slots are typically represented by children or specific props in React,
        // but for Web Components, they are actual <slot> elements.
        // If you want to type the content that goes into the slot:
        /**
         * The secondary actions to display at the bottom of the banner.
         * A maximum of two `s-button` components are allowed, and only buttons with the `variant` of "secondary" are permitted.
         */
        "secondary-actions"?: React.ReactNode; // Represents the content for the named slot

        // Event Handlers for the s-banner component.
        // These are mapped to standard React event handler prop names or custom ones.
        // The `currentTarget` will be the <s-banner> element.

        /**
         * Event handler for the 'afterhide' event, which fires after the banner has completed its hiding animation.
         */
        onAfterhide?: (event: Event & { currentTarget: HTMLElement }) => void;

        /**
         * Event handler for the 'dismiss' event, which fires when the dismiss button is pressed.
         */
        onDismiss?: (event: Event & { currentTarget: HTMLElement }) => void;

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
