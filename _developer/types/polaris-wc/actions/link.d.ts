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
 * Defines the options for the 'click' method on the s-link element.
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
 * It assumes `TEvent` is a standard DOM event type (e.g., MouseEvent, FocusEvent).
 *
 * @template TTagName The tag name of the HTML element (e.g., 's-link').
 * @template TEvent The underlying DOM event type (e.g., MouseEvent, FocusEvent).
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
 * Augments the 'react' module to include type definitions for the 's-link'
 * custom element and its associated attributes.
 */
declare module "react" {
  /**
   * Extends the standard HTMLAttributes interface to include
   * your custom global attributes that can be applied to any HTML element.
   * (Assuming these are still relevant from previous contexts, if not, remove them.)
   */
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    fooAttr?: string;
    xattr?: "xval";
  }

  /**
   * Declares the 's-link' custom intrinsic element for JSX.
   * This allows you to use <s-link> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-link' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       */
      "s-link": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * A label that describes the purpose or contents of the Link.
         * It will be read to users using assistive technologies such as screen readers.
         */
        accessibilityLabel?: string;

        /**
         * Sets the action the `commandFor` should take when this clickable is activated.
         */
        command?: "--auto" | "--show" | "--hide" | "--toggle";

        /**
         * ID of a component that should respond to activations (e.g. clicks) on this component.
         */
        commandFor?: string;

        /**
         * Causes the browser to treat the linked URL as a download with the string being the file name.
         */
        download?: string;

        /**
         * The URL to link to.
         */
        href?: string;

        /**
         * Indicate the text language. Useful when the text is in a different language than the rest of the page.
         */
        lang?: string;

        /**
         * Specifies where to display the linked URL.
         */
        target?:
          | "auto"
          | (string & {})
          | "_blank"
          | "_self"
          | "_parent"
          | "_top";

        /**
         * Sets the tone of the Link, based on the intention of the information being conveyed.
         */
        tone?: "critical" | "auto" | "neutral";

        // Methods (these are typically accessed on the DOM element directly, not as JSX props)
        // click?: (options?: ClickOptions) => void;
        // queueRender?: () => void;
        // setAttribute?: (name: string, value: string) => void;
        // adoptedCallback?: () => void;
        // attributeChangedCallback?: (name: string) => void;
        // connectedCallback?: () => void;
        // disconnectedCallback?: () => void;

        // Event Handlers for the s-link component.
        // These are mapped to standard React event handler prop names.
        // The `currentTarget` will be the <s-link> element.

        /**
         * Event handler for the 'click' event.
         */
        onClick?: React.MouseEventHandler<HTMLElement>;
      };
    }
  }
}
