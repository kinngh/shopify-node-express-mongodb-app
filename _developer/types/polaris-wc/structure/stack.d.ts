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
 * Defines the options for the 'click' method on the s-stack element.
 */
interface ClickOptions {
  /**
   * The event you want to influence the synthetic click.
   */
  sourceEvent?: ActivationEventEsque;
}

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
 * Defines the possible values for the 'accessibilityVisibility' property.
 */
type AccessibilityVisibility = "visible" | "hidden" | "exclusive";

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
 * Defines the possible keyword values for spacing.
 */
type SpacingKeyword = SizeKeyword | "none"; // Assuming SizeKeyword is defined elsewhere or is a string literal type like 'small', 'base', 'large' etc.
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
 * A utility type for responsive properties that can take a base value or a container query string.
 * @template T The base type for the value.
 */
type MakeResponsive<T> = T | `@container${string}`; // The string can contain the query and value e.g. `@container (inline-size > 500px) large-300, small-300`

/**
 * Defines CSS Flexbox alignment keywords.
 */
type BaselinePosition = "baseline" | "first baseline" | "last baseline";
type ContentDistribution =
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch";
type OverflowPosition =
  | "unsafe start"
  | "unsafe end"
  | "unsafe center"
  | "safe start"
  | "safe end"
  | "safe center";
type ContentPosition = "start" | "end" | "center";

type AlignContentKeyword =
  | "normal"
  | BaselinePosition
  | ContentDistribution
  | OverflowPosition
  | ContentPosition;
type AlignItemsKeyword =
  | "normal"
  | "stretch"
  | BaselinePosition
  | OverflowPosition
  | ContentPosition;
type JustifyContentKeyword =
  | "normal"
  | ContentDistribution
  | OverflowPosition
  | ContentPosition;

/**
 * Defines the possible values for the 'direction' property of s-stack.
 */
type StackDirection = "inline" | "block";

/**
 * Augments the 'react' module to include type definitions for the 's-stack'
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
   * Declares the 's-stack' custom intrinsic element for JSX.
   * This allows you to use <s-stack> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-stack' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Organizes elements horizontally or vertically along the block or inline axis.
       */
      "s-stack": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * A label that describes the purpose or contents of the element.
         */
        accessibilityLabel?: string;

        /**
         * Sets the semantic meaning of the component’s content.
         */
        accessibilityRole?: AccessibilityRole;

        /**
         * Changes the visibility of the element.
         */
        accessibilityVisibility?: AccessibilityVisibility;

        /**
         * Aligns the Stack along the cross axis.
         */
        alignContent?: AlignContentKeyword;

        /**
         * Aligns the Stack's children along the cross axis.
         */
        alignItems?: AlignItemsKeyword;

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
         * Adjust spacing between elements in the inline axis.
         */
        columnGap?: MakeResponsive<"" | SpacingKeyword>;

        /**
         * Sets how the Stack's children are placed within the Stack.
         */
        direction?: MakeResponsive<StackDirection>;

        /**
         * Sets the outer display type of the component.
         */
        display?: MakeResponsive<"auto" | "none">;

        /**
         * Adjust spacing between elements.
         */
        gap?: MakeResponsive<MaybeTwoValuesShorthandProperty<SpacingKeyword>>;

        /**
         * Adjust the inline size.
         */
        inlineSize?: SizeUnitsOrAuto;

        /**
         * Aligns the Stack along the main axis.
         */
        justifyContent?: JustifyContentKeyword;

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
         * Adjust spacing between elements in the block axis.
         */
        rowGap?: MakeResponsive<"" | SpacingKeyword>;

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
