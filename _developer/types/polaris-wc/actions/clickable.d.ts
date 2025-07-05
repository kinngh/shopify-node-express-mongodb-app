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
 * Defines the options for the 'click' method on the s-clickable element.
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
 * @template TTagName The tag name of the HTML element (e.g., 's-clickable').
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
 * Defines the possible values for the 'accessibilityRole' property.
 */
type AccessibilityRole =
  | "main"
  | "header"
  | "footer"
  | "section"
  | "aside"
  | "navigation"
  | "ordered-list"
  | "list-item"
  | "list-item-separator"
  | "unordered-list"
  | "separator"
  | "status"
  | "alert"
  | "generic"
  | "presentation"
  | "none";

/**
 * Defines the possible keyword values for colors.
 */
type ColorKeyword = "subdued" | "base" | "strong";

/**
 * Defines the possible keyword values for background colors.
 */
type BackgroundColorKeyword = "transparent" | ColorKeyword;

/**
 * Defines the possible unit values for sizes (e.g., '10px', '50%').
 */
type SizeUnits = `${number}px` | `${number}%` | "0";

/**
 * Defines size units or 'auto'.
 */
type SizeUnitsOrAuto = SizeUnits | "auto";

/**
 * Defines size units or 'none'.
 */
type SizeUnitsOrNone = SizeUnits | "none";

/**
 * Defines the possible keyword values for border sizes.
 */
type BorderSizeKeyword =
  | "small"
  | "base"
  | "small-100"
  | "large"
  | "large-100"
  | "none";

/**
 * Defines the possible keyword values for border styles.
 */
type BorderStyleKeyword = "auto" | "none" | "solid" | "dashed";

/**
 * Defines the shorthand for border properties.
 */
type BorderShorthand =
  | BorderSizeKeyword
  | `${BorderSizeKeyword} ${ColorKeyword}`
  | `${BorderSizeKeyword} ${ColorKeyword} ${BorderStyleKeyword}`;

/**
 * Defines the possible keyword values for border radii.
 */
type BoxBorderRadii =
  | "small"
  | "base"
  | "small-200"
  | "small-100"
  | "large"
  | "large-100"
  | "large-200"
  | "none";

/**
 * A utility type for shorthand properties that can take 1 to 4 values.
 * @template T The base type for the values.
 */
type MaybeAllValuesShorthandProperty<T> =
  | T
  | `${T} ${T}`
  | `${T} ${T} ${T}`
  | `${T} ${T} ${T} ${T}`;

/**
 * A utility type for shorthand properties that can take 1 or 2 values.
 * @template T The base type for the values.
 */
type MaybeTwoValuesShorthandProperty<T> = T | `${T} ${T}`;

/**
 * Defines the possible keyword values for padding sizes.
 */
type PaddingKeyword = SizeKeyword | "none"; // Assuming SizeKeyword is defined elsewhere or is a string literal type like 'small', 'base', 'large' etc.
// For now, let's define SizeKeyword as a string for simplicity, or you can integrate it from other docs.
type SizeKeyword =
  | "small"
  | "base"
  | "large"
  | "small-100"
  | "small-200"
  | "small-300"
  | "large-100"
  | "large-200"
  | "large-300";

/**
 * A utility type for responsive properties that can take a base value or a container query string.
 * @template T The base type for the value.
 */
type MakeResponsive<T> = T | `@container${string}`; // The string can contain the query and value e.g. `@container (inline-size > 500px) large-300, small-300`

/**
 * Augments the 'react' module to include type definitions for the 's-clickable'
 * custom element and its associated attributes.
 */
declare module "react" {
  /**
   * Extends the standard HTMLAttributes interface to include
   * your custom global attributes that can be applied to any HTML element.
   */
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    /**
     * Corresponds to the global attribute "fooAttr".
     * A label that describes the purpose or contents.
     */
    fooAttr?: string;

    /**
     * Corresponds to the global attribute "xattr".
     * Its value is restricted to 'xval' as defined in your JSON's 'x' valueSet.
     */
    xattr?: "xval";
  }

  /**
   * Declares the 's-clickable' custom intrinsic element for JSX.
   * This allows you to use <s-clickable> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-clickable' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       */
      "s-clickable": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * A label that describes the purpose or contents of the element.
         * When set, it will be announced to users using assistive technologies.
         */
        accessibilityLabel?: string;

        /**
         * Sets the semantic meaning of the component’s content.
         */
        accessibilityRole?: AccessibilityRole;

        /**
         * Changes the visibility of the element.
         */
        accessibilityVisibility?: "visible" | "hidden" | "exclusive";

        /**
         * Adjust the background of the element.
         */
        background?: BackgroundColorKeyword;

        /**
         * Adjust the block size.
         */
        blockSize?: SizeUnitsOrAuto;

        /**
         * Set the border via the shorthand property.
         */
        border?: BorderShorthand;

        /**
         * Set the color of the border.
         */
        borderColor?: "" | ColorKeyword;

        /**
         * Set the radius of the border.
         */
        borderRadius?: MaybeAllValuesShorthandProperty<BoxBorderRadii>;

        /**
         * Set the style of the border.
         */
        borderStyle?: "" | MaybeAllValuesShorthandProperty<BorderStyleKeyword>;

        /**
         * Set the width of the border.
         */
        borderWidth?:
          | ""
          | MaybeAllValuesShorthandProperty<
              "small" | "base" | "small-100" | "large" | "large-100" | "none"
            >;

        /**
         * Sets the action the `commandFor` should take when this clickable is activated.
         */
        command?: "--auto" | "--show" | "--hide" | "--toggle";

        /**
         * ID of a component that should respond to activations (e.g. clicks) on this component.
         */
        commandFor?: string;

        /**
         * Disables the clickable, meaning it cannot be clicked or receive focus.
         */
        disabled?: boolean;

        /**
         * Sets the outer display type of the component.
         */
        display?: MakeResponsive<"auto" | "none">;

        /**
         * Causes the browser to treat the linked URL as a download with the string being the file name.
         */
        download?: string;

        /**
         * The URL to link to.
         */
        href?: string;

        /**
         * Adjust the inline size.
         */
        inlineSize?: SizeUnitsOrAuto;

        /**
         * Disables the clickable, and indicates to assistive technology that the loading is in progress.
         */
        loading?: boolean;

        /**
         * Adjust the maximum block size.
         */
        maxBlockSize?: SizeUnitsOrNone;

        /**
         * Adjust the maximum inline size.
         */
        maxInlineSize?: SizeUnitsOrNone;

        /**
         * Adjust the minimum block size.
         */
        minBlockSize?: SizeUnits;

        /**
         * Adjust the minimum inline size.
         */
        minInlineSize?: SizeUnits;

        /**
         * Sets the overflow behavior of the element.
         */
        overflow?: "visible" | "hidden";

        /**
         * Adjust the padding of all edges.
         */
        padding?: MakeResponsive<
          MaybeAllValuesShorthandProperty<PaddingKeyword>
        >;

        /**
         * Adjust the block-padding.
         */
        paddingBlock?: MakeResponsive<
          "" | MaybeTwoValuesShorthandProperty<PaddingKeyword>
        >;

        /**
         * Adjust the block-end padding.
         */
        paddingBlockEnd?: MakeResponsive<"" | PaddingKeyword>;

        /**
         * Adjust the block-start padding.
         */
        paddingBlockStart?: MakeResponsive<"" | PaddingKeyword>;

        /**
         * Adjust the inline padding.
         */
        paddingInline?: MakeResponsive<
          "" | MaybeTwoValuesShorthandProperty<PaddingKeyword>
        >;

        /**
         * Adjust the inline-end padding.
         */
        paddingInlineEnd?: MakeResponsive<"" | PaddingKeyword>;

        /**
         * Adjust the inline-start padding.
         */
        paddingInlineStart?: MakeResponsive<"" | PaddingKeyword>;

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
         * The behavior of the button.
         */
        type?: "button" | "reset" | "submit";

        // Event Handlers for the s-clickable component.
        // These are mapped to standard React event handler prop names.
        // The `currentTarget` will be the <s-clickable> element.

        /**
         * Event handler for the 'blur' event.
         */
        onBlur?: React.FocusEventHandler<HTMLElement>;

        /**
         * Event handler for the 'click' event.
         */
        onClick?: React.MouseEventHandler<HTMLElement>;

        /**
         * Event handler for the 'focus' event.
         */
        onFocus?: React.FocusEventHandler<HTMLElement>;

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
