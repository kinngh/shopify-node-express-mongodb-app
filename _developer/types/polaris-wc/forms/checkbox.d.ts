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
 * Defines the options for the 'click' method on the s-checkbox element.
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
 * It assumes `TEvent` is a standard DOM event type (e.g., Event, InputEvent, ChangeEvent).
 *
 * @template TTagName The tag name of the HTML element (e.g., 's-checkbox').
 * @template TEvent The underlying DOM event type (e.g., Event, InputEvent).
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
 * Augments the 'react' module to include type definitions for the 's-checkbox'
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
   * Declares the 's-checkbox' custom intrinsic element for JSX.
   * This allows you to use <s-checkbox> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-checkbox' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Give users a clear way to make selections, such as agreeing to terms
       * or choosing multiple items from a list.
       */
      "s-checkbox": React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLElement
      > & {
        /**
         * A label used for users using assistive technologies like screen readers.
         */
        accessibilityLabel?: string;

        /**
         * Whether the control is active.
         */
        checked?: boolean;

        /**
         * Whether the control is active by default.
         */
        defaultChecked?: boolean;

        /**
         * Whether the checkbox is indeterminate by default.
         */
        defaultIndeterminate?: boolean;

        /**
         * Additional text to provide context or guidance for the field.
         */
        details?: string;

        /**
         * Disables the field, disallowing any interaction.
         */
        disabled?: boolean;

        /**
         * Indicate an error to the user.
         */
        error?: string;

        /**
         * A unique identifier for the element.
         */
        id?: string; // Made optional as it's often auto-generated or not strictly required for every instance

        /**
         * Whether the checkbox is in an indeterminate state.
         */
        indeterminate?: boolean;

        /**
         * Visual content to use as the control label.
         */
        label?: string;

        /**
         * An identifier for the field that is unique within the nearest containing form.
         */
        name?: string;

        /**
         * Whether the field needs a value.
         */
        required?: boolean;

        /**
         * The value used in form data when the checkbox is checked.
         */
        value?: string;

        // Event Handlers for the s-checkbox component.
        // These are mapped to standard React event handler prop names.
        // The `currentTarget` will be the <s-checkbox> element.

        /**
         * Event handler for the 'change' event, fired when the checkbox's state changes.
         */
        onChange?: React.ChangeEventHandler<HTMLElement>; // Use React's ChangeEventHandler for input-like elements

        /**
         * Event handler for the 'input' event, fired when the value of an <input> or <textarea> element has been changed.
         */
        onInput?: React.FormEventHandler<HTMLElement>; // Use React's FormEventHandler for input-like elements

        // Private properties from the documentation are omitted as JSX props:
        // '__@internals$2@4228'

        // Methods (these are typically accessed on the DOM element directly, not as JSX props)
        // click?: (options?: ClickOptions) => void;
        // adoptedCallback?: () => void;
        // attributeChangedCallback?: (name: string) => void;
        // connectedCallback?: () => void;
        // disconnectedCallback?: () => void;
        // formResetCallback?: () => void;
        // queueRender?: () => void;
        // setAttribute?: (name: string, value: string) => void;
      };
    }
  }
}
