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
 * Defines the options for the 'click' method on the s-image element.
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
 * It assumes `TEvent` is a standard DOM event type (e.g., Event, UIEvent).
 *
 * @template TTagName The tag name of the HTML element (e.g., 's-image').
 * @template TEvent The underlying DOM event type (e.g., Event, UIEvent).
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
 * Defines the possible keyword values for colors.
 */
type ColorKeyword = "subdued" | "base" | "strong";

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
 * Augments the 'react' module to include type definitions for the 's-image'
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
   * Declares the 's-image' custom intrinsic element for JSX.
   * This allows you to use <s-image> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-image' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       */
      "s-image": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * Sets the semantic meaning of the component’s content.
         */
        accessibilityRole?: "none" | "presentation" | "img";

        /**
         * An alternative text description that describes the image.
         */
        alt?: string;

        /**
         * The aspect ratio of the image.
         * Format: `${number}` or `${number}/${number}` (with or without spaces).
         */
        aspectRatio?:
          | `${number}`
          | `${number}/${number}`
          | `${number}/ ${number}`
          | `${number} /${number}`
          | `${number} / ${number}`;

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
         * The displayed inline width of the image.
         */
        inlineSize?: "auto" | "fill";

        /**
         * Determines the loading behavior of the image.
         */
        loading?: "eager" | "lazy";

        /**
         * Determines how the content of the image is resized to fit its container.
         */
        objectFit?: "contain" | "cover";

        /**
         * A set of media conditions and their corresponding sizes.
         */
        sizes?: string;

        /**
         * The image source (either a remote URL or a local file resource).
         */
        src?: string;

        /**
         * A set of image sources and their width or pixel density descriptors.
         * This overrides the `src` property.
         */
        srcSet?: string;

        // Event Handlers for the s-image component.
        // These are mapped to standard React event handler prop names.
        // The `currentTarget` will be the <s-image> element.

        /**
         * Event handler for the 'error' event, when the image fails to load.
         */
        onError?: React.ReactEventHandler<HTMLElement>; // OnErrorEventHandler is a generic type, React uses ReactEventHandler

        /**
         * Event handler for the 'load' event, when the image has successfully loaded.
         */
        onLoad?: React.ReactEventHandler<HTMLElement>;

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
