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
 * Defines the format for a single date string (YYYY-MM-DD).
 */
type DateString = `${number}-${number}-${number}`;

/**
 * Defines the format for a month string (YYYY-MM).
 */
type MonthString = `${number}-${number}`;

/**
 * Defines the format for a year string (YYYY).
 */
type YearString = `${number}`;

/**
 * Defines a date range string (start--end).
 */
type DateRangeString =
  `${DateString | MonthString | YearString | ""}--${DateString | MonthString | YearString | ""}`;

/**
 * Defines the string format for `allow` and `disallow` properties.
 * It can be a single date, month, year, or a comma-separated list of these or ranges.
 */
type DatePickerAllowDisallowString =
  | DateString
  | MonthString
  | YearString
  | DateRangeString
  | (string & {}); // Allows for comma-separated lists and other valid strings

/**
 * Defines the string format for `allowDays` and `disallowDays` properties.
 */
type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";
type DatePickerDaysString = DayOfWeek | (string & {}); // Allows for comma-separated lists

/**
 * Defines the possible types of date selection for the picker.
 */
type DatePickerType = "single" | "multiple" | "range";

/**
 * Defines the format for the `value` property based on `type`.
 */
type DatePickerValue =
  | DateString // For type="single"
  | `${DateString},${string}` // For type="multiple" (comma-separated list)
  | `${DateString}--${DateString}` // For type="range"
  | ""; // No date selected

/**
 * Augments the 'react' module to include type definitions for the 's-date-picker'
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
   * Declares the 's-date-picker' custom intrinsic element for JSX.
   * This allows you to use <s-date-picker> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-date-picker' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Allow users to select a specific date or date range.
       */
      "s-date-picker": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * Dates that can be selected. A comma-separated list of dates, date ranges.
         * The default `''` allows all dates.
         */
        allow?: DatePickerAllowDisallowString;

        /**
         * Days of the week that can be selected. These intersect with the result of `allowDates` and `disallowDates`.
         */
        allowDays?: DatePickerDaysString;

        /**
         * Default selected value.
         * If `type="single"`, this is a date in `YYYY-MM-DD` format.
         * If `type="multiple"`, this is a comma-separated list of dates in `YYYY-MM-DD` format.
         * If `type="range"`, this is a range in `YYYY-MM-DD--YYYY-MM-DD` format. The range is inclusive.
         */
        defaultValue?: DatePickerValue;

        /**
         * Default month to display in `YYYY-MM` format.
         */
        defaultView?: MonthString;

        /**
         * Dates that cannot be selected. These subtract from `allowDates`.
         */
        disallow?: DatePickerAllowDisallowString;

        /**
         * Days of the week that cannot be selected. This subtracts from `allowDays`,
         * and intersects with the result of `allowDates` and `disallowDates`.
         */
        disallowDays?: DatePickerDaysString;

        /**
         * An identifier for the field that is unique within the nearest containing form.
         */
        name?: string;

        /**
         * The type of date selection for the picker.
         */
        type?: DatePickerType;

        /**
         * Current selected value.
         * If `type="single"`, this is a date in `YYYY-MM-DD` format.
         * If `type="multiple"`, this is a comma-separated list of dates in `YYYY-MM-DD` format.
         * If `type="range"`, this is a range in `YYYY-MM-DD--YYYY-MM-DD` format. The range is inclusive.
         */
        value?: DatePickerValue;

        /**
         * Displayed month in `YYYY-MM` format.
         */
        view?: MonthString;

        // Event Handlers for the s-date-picker component.
        // These are mapped to standard React event handler prop names or custom ones.
        // The `currentTarget` will be the <s-date-picker> element.

        /**
         * Event handler for the 'blur' event.
         */
        onBlur?: React.FocusEventHandler<HTMLElement>;

        /**
         * Event handler for the 'change' event. Invoked when the `value` is changed.
         * For `type="single"` and `type="multiple"`, this is the same as `onInput`.
         * For `type="range"`, this is only called when the range is completed by selecting the end date of the range.
         */
        onChange?: (event: Event & { currentTarget: HTMLElement }) => void;

        /**
         * Event handler for the 'focus' event.
         */
        onFocus?: React.FocusEventHandler<HTMLElement>;

        /**
         * Event handler for the 'input' event. Invoked when any date is selected. Will fire before `onChange`.
         */
        onInput?: (event: Event & { currentTarget: HTMLElement }) => void;

        /**
         * Event handler for the 'viewchange' event, called when the displayed month changes.
         */
        onViewchange?: (event: Event & { currentTarget: HTMLElement }) => void;

        // Private properties from the documentation are omitted as JSX props:
        // '__@dirtyStateSymbol@4347'
        // '__@internals@4346'

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
