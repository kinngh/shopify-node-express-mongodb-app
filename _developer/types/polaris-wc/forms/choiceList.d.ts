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
 * Augments the 'react' module to include type definitions for the 's-choice-list'
 * and 's-choice' custom elements and their associated attributes.
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
   * Declares the 's-choice-list' and 's-choice' custom intrinsic elements for JSX.
   * This allows you to use them directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-choice-list' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Present multiple options to users, allowing either single selections
       * with radio buttons or multiple selections with checkboxes.
       */
      "s-choice-list": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * Additional text to provide context or guidance for the field.
         */
        details?: string;

        /**
         * Disables the field, disallowing any interaction.
         * `disabled` on any child choices is ignored when this is true.
         */
        disabled?: boolean;

        /**
         * Indicate an error to the user.
         */
        error?: string;

        /**
         * Content to use as the field label.
         */
        label?: string;

        /**
         * Changes the visibility of the component's label.
         */
        labelAccessibilityVisibility?: LabelAccessibilityVisibility;

        /**
         * Whether multiple choices can be selected.
         */
        multiple?: boolean;

        /**
         * An identifier for the field that is unique within the nearest containing form.
         */
        name?: string;

        /**
         * An array of the `value`s of the selected options.
         * This is a convenience prop for setting the `selected` prop on child options.
         */
        values?: string[];

        // Event Handlers for the s-choice-list component.
        // These are mapped to standard React event handler prop names.
        // The `currentTarget` will be the <s-choice-list> element.

        /**
         * Event handler for the 'change' event.
         */
        onChange?: (event: Event & { currentTarget: HTMLElement }) => void;

        /**
         * Event handler for the 'input' event.
         */
        onInput?: (event: Event & { currentTarget: HTMLElement }) => void;

        // Private properties from the documentation are omitted as JSX props:
        // '__@internals$1@4273'

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

      /**
       * The 's-choice' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Create options that let users select one or multiple items from a list of choices.
       */
      "s-choice": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * A label used for users using assistive technologies like screen readers.
         */
        accessibilityLabel?: string;

        /**
         * Whether the control is active by default.
         */
        defaultSelected?: boolean;

        /**
         * Additional text to provide context or guidance for the input.
         */
        details?: string;

        /**
         * Disables the control, disallowing any interaction.
         */
        disabled?: boolean;

        /**
         * Content to use as the choice label.
         */
        label?: string;

        /**
         * Whether the control is active.
         */
        selected?: boolean;

        /**
         * The value used in form data when the control is checked.
         */
        value?: string;

        // Methods (these are typically accessed on the DOM element directly, not as JSX props)
        // click?: (options?: ClickOptions) => void;
        // adoptedCallback?: () => void;
        // attributeChangedCallback?: (name: string) => void;
        // connectedCallback?: () => void;
        // disconnectedCallback?: () => void;
        // queueRender?: () => void;
        // setAttribute?: (name: string, value: string) => void;
      };
    }
  }
}
