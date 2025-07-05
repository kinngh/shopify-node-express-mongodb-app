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
 * Defines the possible values for the 'autocomplete' property specific to text fields.
 */
type TextAutocompleteField =
  | "url"
  | "email"
  | "country-name"
  | "country"
  | "current-password"
  | "family-name"
  | "given-name"
  | "honorific-prefix"
  | "honorific-suffix"
  | "name"
  | "new-password"
  | "nickname"
  | "one-time-code"
  | "organization-title"
  | "photo"
  | "postal-code"
  | "sex"
  | "street-address"
  | "transaction-amount"
  | "transaction-currency"
  | "username"
  | "bday-day"
  | "bday-month"
  | "bday-year"
  | "bday"
  | "cc-additional-name"
  | "cc-expiry-month"
  | "cc-expiry-year"
  | "cc-expiry"
  | "cc-family-name"
  | "cc-given-name"
  | "cc-name"
  | "cc-number"
  | "cc-csc"
  | "home email"
  | "mobile email"
  | "fax email"
  | "pager email"
  | "impp"
  | "home impp"
  | "mobile impp"
  | "fax impp"
  | "pager impp"
  | "tel"
  | "tel-area-code"
  | "tel-country-code"
  | "tel-extension"
  | "tel-local-prefix"
  | "tel-local-suffix"
  | "tel-local"
  | "tel-national"
  | "home tel"
  | "mobile tel"
  | "fax tel"
  | "pager tel"
  | "home tel-area-code"
  | "mobile tel-area-code"
  | "fax tel-area-code"
  | "pager tel-area-code"
  | "home tel-country-code"
  | "mobile tel-country-code"
  | "fax tel-country-code"
  | "pager tel-country-code"
  | "home tel-extension"
  | "mobile tel-extension"
  | "fax tel-extension"
  | "pager tel-extension"
  | "home tel-local-prefix"
  | "mobile tel-local-prefix"
  | "fax tel-local-prefix"
  | "pager tel-local-prefix"
  | "home tel-local-suffix"
  | "mobile tel-local-suffix"
  | "fax tel-local-suffix"
  | "pager tel-local-suffix"
  | "home tel-local"
  | "mobile tel-local"
  | "fax tel-local"
  | "pager tel-local"
  | "home tel-national"
  | "mobile tel-national"
  | "fax tel-national"
  | "pager tel-national";

/**
 * Defines the possible values for the 'labelAccessibilityVisibility' property.
 */
type LabelAccessibilityVisibility = "visible" | "exclusive";

/**
 * Augments the 'react' module to include type definitions for the 's-text-area'
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
   * Declares the 's-text-area' custom intrinsic element for JSX.
   * This allows you to use <s-text-area> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-text-area' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Collect longer text content from users with a multi-line input that expands automatically.
       */
      "s-text-area": React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLElement
      > & {
        /**
         * A hint as to the intended content of the field for autofill.
         */
        autocomplete?:
          | "on"
          | "off"
          | TextAutocompleteField
          | `section-${string} one-time-code`
          | "shipping one-time-code"
          | "billing one-time-code"
          | `section-${string} shipping one-time-code`
          | `section-${string} billing one-time-code`
          | `section-${string} language`
          | `section-${string} organization`
          | `section-${string} additional-name`
          | `section-${string} address-level1`
          | `section-${string} address-level2`
          | `section-${string} address-level3`
          | `section-${string} address-level4`
          | `section-${string} address-line1`
          | `section-${string} address-line2`
          | `section-${string} address-line3`
          | `section-${string} country-name`
          | `section-${string} country`
          | `section-${string} family-name`
          | `section-${string} given-name`
          | `section-${string} honorific-prefix`
          | `section-${string} honorific-suffix`
          | `section-${string} name`
          | `section-${string} nickname`
          | `section-${string} organization-title`
          | `section-${string} postal-code`
          | `section-${string} sex`
          | `section-${string} street-address`
          | `section-${string} transaction-currency`
          | `section-${string} username`
          | `section-${string} cc-additional-name`
          | `section-${string} cc-family-name`
          | `section-${string} cc-given-name`
          | `section-${string} cc-name`
          | `section-${string} cc-type`
          | "shipping language"
          | "shipping organization"
          | "shipping additional-name"
          | "shipping address-level1"
          | "shipping address-level2"
          | "shipping address-level3"
          | "shipping address-level4"
          | "shipping address-line1"
          | "shipping address-line2"
          | "shipping address-line3"
          | "shipping country-name"
          | "shipping country"
          | "shipping family-name"
          | "shipping given-name"
          | "shipping honorific-prefix"
          | "shipping honorific-suffix"
          | "shipping name"
          | "shipping nickname"
          | "shipping organization-title"
          | "shipping postal-code"
          | "shipping sex"
          | "shipping street-address"
          | "shipping transaction-currency"
          | "shipping username"
          | "shipping cc-additional-name"
          | "shipping cc-family-name"
          | "shipping cc-given-name"
          | "shipping cc-name"
          | "shipping cc-type"
          | "billing language"
          | "billing organization"
          | "billing additional-name"
          | "billing address-level1"
          | "billing address-level2"
          | "billing address-level3"
          | "billing address-level4"
          | "billing address-line1"
          | "billing address-line2"
          | "billing address-line3"
          | "billing country-name"
          | "billing country"
          | "billing family-name"
          | "billing given-name"
          | "billing honorific-prefix"
          | "billing honorific-suffix"
          | "billing name"
          | "billing nickname"
          | "billing organization-title"
          | "billing postal-code"
          | "billing sex"
          | "billing street-address"
          | "billing transaction-currency"
          | "billing username"
          | "billing cc-additional-name"
          | "billing cc-family-name"
          | "billing cc-given-name"
          | "billing cc-name"
          | "billing cc-type"
          | `section-${string} shipping language`
          | `section-${string} shipping organization`
          | `section-${string} shipping additional-name`
          | `section-${string} shipping address-level1`
          | `section-${string} shipping address-level2`
          | `section-${string} shipping address-level3`
          | `section-${string} shipping address-level4`
          | `section-${string} shipping address-line1`
          | `section-${string} shipping address-line2`
          | `section-${string} shipping address-line3`
          | `section-${string} shipping country-name`
          | `section-${string} shipping country`
          | `section-${string} shipping family-name`
          | `section-${string} shipping given-name`
          | `section-${string} shipping honorific-prefix`
          | `section-${string} shipping honorific-suffix`
          | `section-${string} shipping name`
          | `section-${string} shipping nickname`
          | `section-${string} shipping organization-title`
          | `section-${string} shipping postal-code`
          | `section-${string} shipping sex`
          | `section-${string} shipping street-address`
          | `section-${string} shipping transaction-currency`
          | `section-${string} shipping username`
          | `section-${string} shipping cc-additional-name`
          | `section-${string} shipping cc-family-name`
          | `section-${string} shipping cc-given-name`
          | `section-${string} shipping cc-name`
          | `section-${string} shipping cc-type`
          | `section-${string} billing language`
          | `section-${string} billing organization`
          | `section-${string} billing additional-name`
          | `section-${string} billing address-level1`
          | `section-${string} billing address-level2`
          | `section-${string} billing address-level3`
          | `section-${string} billing address-level4`
          | `section-${string} billing address-line1`
          | `section-${string} billing address-line2`
          | `section-${string} billing address-line3`
          | `section-${string} billing country-name`
          | `section-${string} billing country`
          | `section-${string} billing family-name`
          | `section-${string} billing given-name`
          | `section-${string} billing honorific-prefix`
          | `section-${string} billing honorific-suffix`
          | `section-${string} billing name`
          | `section-${string} billing nickname`
          | `section-${string} billing organization-title`
          | `section-${string} billing postal-code`
          | `section-${string} billing sex`
          | `section-${string} billing street-address`
          | `section-${string} billing transaction-currency`
          | `section-${string} billing username`
          | `section-${string} billing cc-additional-name`
          | `section-${string} billing cc-family-name`
          | `section-${string} billing cc-given-name`
          | `section-${string} billing cc-name`
          | `section-${string} billing cc-type`;

        /**
         * The default value for the field.
         */
        defaultValue?: string;

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
        id?: string;

        /**
         * Checks if the shadow tree contains a focused input.
         * This is a property on the element instance, not a JSX prop.
         */
        // isContentEditable?: boolean;

        /**
         * Content to use as the field label.
         */
        label?: string;

        /**
         * Changes the visibility of the component's label.
         */
        labelAccessibilityVisibility?: LabelAccessibilityVisibility;

        /**
         * Specifies the maximum number of characters allowed.
         */
        maxLength?: number;

        /**
         * Specifies the min number of characters allowed.
         */
        minLength?: number;

        /**
         * An identifier for the field that is unique within the nearest containing form.
         */
        name?: string;

        /**
         * A short hint that describes the expected value of the field.
         */
        placeholder?: string;

        /**
         * The field cannot be edited by the user.
         */
        readOnly?: boolean;

        /**
         * Whether the field needs a value.
         */
        required?: boolean;

        /**
         * A number of visible text lines.
         */
        rows?: number;

        /**
         * The current value for the field. If omitted, the field will be empty.
         */
        value?: string;

        // Event Handlers for the s-text-area component.
        // These are mapped to standard React event handler prop names.
        // The `currentTarget` will be the <s-text-area> element.

        /**
         * Event handler for the 'blur' event.
         */
        onBlur?: React.FocusEventHandler<HTMLElement>;

        /**
         * Event handler for the 'change' event.
         */
        onChange?: React.ChangeEventHandler<HTMLElement>;

        /**
         * Event handler for the 'focus' event.
         */
        onFocus?: React.FocusEventHandler<HTMLElement>;

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
        // getAttribute?: (qualifiedName: string) => string;
        // hasAttribute?: (qualifiedName: string) => boolean;
        // queueRender?: () => void;
        // setAttribute?: (name: string, value: string) => void;
      };
    }
  }
}
