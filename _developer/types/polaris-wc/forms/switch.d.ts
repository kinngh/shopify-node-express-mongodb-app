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
 * Defines the options for the 'click' method on elements.
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
 * @template TTagName The tag name of the HTML element.
 * @template TEvent The underlying DOM event type.
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
 * Defines the possible values for the 'labelAccessibilityVisibility' property.
 */
type LabelAccessibilityVisibility = "visible" | "exclusive";

/**
 * Augments the 'react' module to include type definitions for the 's-switch'
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
   * Declares the 's-switch' custom intrinsic element for JSX.
   * This allows you to use <s-switch> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-switch' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Give users a clear way to toggle options on or off.
       */
      "s-switch": React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLElement
      > & {
        /**
         * A label used for users using assistive technologies like screen readers.
         * When set, any children or `label` supplied will not be announced.
         * This can also be used to display a control without a visual label,
         * while still providing context to users using screen readers.
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
         * Additional text to provide context or guidance for the field.
         * This text is displayed along with the field and its label to offer more information
         * or instructions to the user. This will also be exposed to screen reader users.
         */
        details?: string;

        /**
         * Disables the field, disallowing any interaction.
         */
        disabled?: boolean;

        /**
         * Indicate an error to the user. The field will be given a specific stylistic treatment
         * to communicate problems that have to be resolved immediately.
         */
        error?: string;

        /**
         * A unique identifier for the element.
         */
        id?: string;

        /**
         * Visual content to use as the control label.
         */
        label?: string;

        /**
         * Changes the visibility of the component's label.
         * - `visible`: the label is visible to all users.
         * - `exclusive`: the label is visually hidden but remains in the accessibility tree.
         */
        labelAccessibilityVisibility?: LabelAccessibilityVisibility;

        /**
         * An identifier for the field that is unique within the nearest containing form.
         */
        name?: string;

        /**
         * Whether the field needs a value. This requirement adds semantic value to the field,
         * but it will not cause an error to appear automatically. If you want to present an error
         * when this field is empty, you can do so with the `error` property.
         */
        required?: boolean;

        /**
         * The value used in form data when the switch is checked.
         */
        value?: string;

        // Event Handlers for the s-switch component.
        // These are mapped to standard React event handler prop names.
        // The `currentTarget` will be the <s-switch> element.

        /**
         * Event handler for the 'change' event.
         */
        onChange?: React.ChangeEventHandler<HTMLElement>;

        /**
         * Event handler for the 'input' event.
         */
        onInput?: React.FormEventHandler<HTMLElement>;

        // Private properties from the documentation are omitted as JSX props:
        // '__@internals$2@4228'

        // Methods (these are typically accessed on the DOM element directly, not as JSX props)
        // adoptedCallback?: () => void;
        // attributeChangedCallback?: (name: string) => void;
        // click?: (options?: ClickOptions) => void;
        // connectedCallback?: () => void;
        // disconnectedCallback?: () => void;
        // formResetCallback?: () => void;
        // queueRender?: () => void;
        // setAttribute?: (name: string, value: string) => void;
      };
    }
  }
}
