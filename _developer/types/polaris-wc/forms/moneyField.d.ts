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
 * Defines a type for any string, used when a string is expected but could be anything.
 */
type AnyString = string & {};

/**
 * Defines the possible values for the 'autocomplete' property.
 * This is a comprehensive list, including specific autofill hints.
 */
type AutocompleteField =
  | "url"
  | "language"
  | "organization"
  | "additional-name"
  | "address-level1"
  | "address-level2"
  | "address-level3"
  | "address-level4"
  | "address-line1"
  | "address-line2"
  | "address-line3"
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
  | "cc-type"
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
 * Defines the supported currency codes.
 */
type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "CAD"
  | "AFN"
  | "ALL"
  | "DZD"
  | "AOA"
  | "ARS"
  | "AMD"
  | "AWG"
  | "AUD"
  | "BBD"
  | "AZN"
  | "BDT"
  | "BSD"
  | "BHD"
  | "BIF"
  | "BZD"
  | "BMD"
  | "BTN"
  | "BAM"
  | "BRL"
  | "BOB"
  | "BWP"
  | "BND"
  | "BGN"
  | "MMK"
  | "KHR"
  | "CVE"
  | "KYD"
  | "XAF"
  | "CLP"
  | "CNY"
  | "COP"
  | "KMF"
  | "CDF"
  | "CRC"
  | "HRK"
  | "CZK"
  | "DKK"
  | "DOP"
  | "XCD"
  | "EGP"
  | "ETB"
  | "XPF"
  | "FJD"
  | "GMD"
  | "GHS"
  | "GTQ"
  | "GYD"
  | "GEL"
  | "HTG"
  | "HNL"
  | "HKD"
  | "HUF"
  | "ISK"
  | "INR"
  | "IDR"
  | "ILS"
  | "IQD"
  | "JMD"
  | "JPY"
  | "JEP"
  | "JOD"
  | "KZT"
  | "KES"
  | "KWD"
  | "KGS"
  | "LAK"
  | "LVL"
  | "LBP"
  | "LSL"
  | "LRD"
  | "LTL"
  | "MGA"
  | "MKD"
  | "MOP"
  | "MWK"
  | "MVR"
  | "MXN"
  | "MYR"
  | "MUR"
  | "MDL"
  | "MAD"
  | "MNT"
  | "MZN"
  | "NAD"
  | "NPR"
  | "ANG"
  | "NZD"
  | "NIO"
  | "NGN"
  | "NOK"
  | "OMR"
  | "PAB"
  | "PKR"
  | "PGK"
  | "PYG"
  | "PEN"
  | "PHP"
  | "PLN"
  | "QAR"
  | "RON"
  | "RUB"
  | "RWF"
  | "WST"
  | "SAR"
  | "RSD"
  | "SCR"
  | "SGD"
  | "SDG"
  | "SYP"
  | "ZAR"
  | "KRW"
  | "SSP"
  | "SBD"
  | "LKR"
  | "SRD"
  | "SZL"
  | "SEK"
  | "CHF"
  | "TWD"
  | "THB"
  | "TZS"
  | "TTD"
  | "TND"
  | "TRY"
  | "TMT"
  | "UGX"
  | "UAH"
  | "AED"
  | "UYU"
  | "UZS"
  | "VUV"
  | "VND"
  | "XOF"
  | "YER"
  | "ZMW"
  | "BYN"
  | "BYR"
  | "DJF"
  | "ERN"
  | "FKP"
  | "GIP"
  | "GNF"
  | "IRR"
  | "KID"
  | "LYD"
  | "MRU"
  | "SLL"
  | "SHP"
  | "SOS"
  | "STD"
  | "STN"
  | "TJS"
  | "TOP"
  | "VED"
  | "VEF"
  | "VES"
  | "XXX";

/**
 * Augments the 'react' module to include type definitions for the 's-money-field'
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
   * Declares the 's-money-field' custom intrinsic element for JSX.
   * This allows you to use <s-money-field> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-money-field' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Collect monetary values from users with built-in currency formatting and validation.
       */
      "s-money-field": React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLElement
      > & {
        /**
         * A hint as to the intended content of the field for autofill.
         */
        autocomplete?:
          | "on"
          | "off"
          | AutocompleteField
          | `section-${string} email`
          | `section-${string} home email`
          | `section-${string} mobile email`
          | `section-${string} fax email`
          | `section-${string} pager email`
          | "shipping email"
          | "shipping home email"
          | "shipping mobile email"
          | "shipping fax email"
          | "shipping pager email"
          | "billing email"
          | "billing home email"
          | "billing mobile email"
          | "billing fax email"
          | "billing pager email"
          | `section-${string} shipping email`
          | `section-${string} shipping home email`
          | `section-${string} shipping mobile email`
          | `section-${string} shipping fax email`
          | `section-${string} shipping pager email`
          | `section-${string} billing email`
          | `section-${string} billing home email`
          | `section-${string} billing mobile email`
          | `section-${string} billing fax email`
          | `section-${string} billing pager email`;

        /**
         * Specifies the currency code that will be displayed.
         */
        currencyCode?: AnyString | CurrencyCode;

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
         * The highest decimal or integer to be accepted for the field.
         */
        max?: number;

        /**
         * The lowest decimal or integer to be accepted for the field.
         */
        min?: number;

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
         * The amount the value can increase or decrease by.
         */
        step?: number;

        /**
         * The current value for the field. If omitted, the field will be empty.
         */
        value?: string;

        // Event Handlers for the s-money-field component.
        // These are mapped to standard React event handler prop names.
        // The `currentTarget` will be the <s-money-field> element.

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
