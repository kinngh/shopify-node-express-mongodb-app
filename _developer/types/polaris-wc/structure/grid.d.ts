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
 * Defines the options for the 'click' method.
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
 * A utility type for responsive properties that can take a base value or a container query string.
 * @template T The base type for the value.
 */
type MakeResponsive<T> = T | `@container${string}`; // The string can contain the query and value e.g. `@container (inline-size > 500px) large-300, small-300`

/**
 * Defines CSS Grid alignment keywords.
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
type JustifyItemsKeyword =
  | "normal"
  | "stretch"
  | BaselinePosition
  | OverflowPosition
  | ContentPosition;

/**
 * Complex type for `placeContent` based on CSS `place-content` property.
 * This is a partial representation due to the vast number of combinations.
 */
type PlaceContentValue =
  | AlignContentKeyword
  | `${AlignContentKeyword} ${JustifyContentKeyword}`
  | `${JustifyContentKeyword} ${AlignContentKeyword}` // CSS allows this order
  | "normal normal"
  | "normal stretch"
  | "normal start"
  | "normal end"
  | "normal center"
  | "normal unsafe start"
  | "normal unsafe end"
  | "normal unsafe center"
  | "normal safe start"
  | "normal safe end"
  | "normal safe center"
  | "stretch normal"
  | "stretch stretch"
  | "stretch start"
  | "stretch end"
  | "stretch center"
  | "stretch unsafe start"
  | "stretch unsafe end"
  | "stretch unsafe center"
  | "stretch safe start"
  | "stretch safe end"
  | "stretch safe center"
  | "baseline normal"
  | "baseline stretch"
  | "baseline start"
  | "baseline end"
  | "baseline center"
  | "baseline unsafe start"
  | "baseline unsafe end"
  | "baseline unsafe center"
  | "baseline safe start"
  | "baseline safe end"
  | "baseline safe center"
  | "first baseline normal"
  | "first baseline stretch"
  | "first baseline start"
  | "first baseline end"
  | "first baseline center"
  | "first baseline unsafe start"
  | "first baseline unsafe end"
  | "first baseline unsafe center"
  | "first baseline safe start"
  | "first baseline safe end"
  | "first baseline safe center"
  | "last baseline normal"
  | "last baseline stretch"
  | "last baseline start"
  | "last baseline end"
  | "last baseline center"
  | "last baseline unsafe start"
  | "last baseline unsafe end"
  | "last baseline unsafe center"
  | "last baseline safe start"
  | "last baseline safe end"
  | "last baseline safe center"
  | "start normal"
  | "start stretch"
  | "start start"
  | "start end"
  | "start center"
  | "start unsafe start"
  | "start unsafe end"
  | "start unsafe center"
  | "start safe start"
  | "start safe end"
  | "start safe center"
  | "end normal"
  | "end stretch"
  | "end start"
  | "end end"
  | "end center"
  | "end unsafe start"
  | "end unsafe end"
  | "end unsafe center"
  | "end safe start"
  | "end safe end"
  | "end safe center"
  | "center normal"
  | "center stretch"
  | "center start"
  | "center end"
  | "center center"
  | "center unsafe start"
  | "center unsafe end"
  | "center unsafe center"
  | "center safe start"
  | "center safe end"
  | "center safe center"
  | "unsafe start normal"
  | "unsafe start stretch"
  | "unsafe start start"
  | "unsafe start end"
  | "unsafe start center"
  | "unsafe start unsafe start"
  | "unsafe start unsafe end"
  | "unsafe start unsafe center"
  | "unsafe start safe start"
  | "unsafe start safe end"
  | "unsafe start safe center"
  | "unsafe end normal"
  | "unsafe end stretch"
  | "unsafe end start"
  | "unsafe end end"
  | "unsafe end center"
  | "unsafe end unsafe start"
  | "unsafe end unsafe end"
  | "unsafe end unsafe center"
  | "unsafe end safe start"
  | "unsafe end safe end"
  | "unsafe end safe center"
  | "unsafe center normal"
  | "unsafe center stretch"
  | "unsafe center start"
  | "unsafe center end"
  | "unsafe center center"
  | "unsafe center unsafe start"
  | "unsafe center unsafe end"
  | "unsafe center unsafe center"
  | "unsafe center safe start"
  | "unsafe center safe end"
  | "unsafe center safe center"
  | "safe start normal"
  | "safe start stretch"
  | "safe start start"
  | "safe start end"
  | "safe start center"
  | "safe start unsafe start"
  | "safe start unsafe end"
  | "safe start unsafe center"
  | "safe start safe start"
  | "safe start safe end"
  | "safe start safe center"
  | "safe end normal"
  | "safe end stretch"
  | "safe end start"
  | "safe end end"
  | "safe end center"
  | "safe end unsafe start"
  | "safe end unsafe end"
  | "safe end unsafe center"
  | "safe end safe start"
  | "safe end safe end"
  | "safe end safe center"
  | "safe center normal"
  | "safe center stretch"
  | "safe center start"
  | "safe center end"
  | "safe center center"
  | "safe center unsafe start"
  | "safe center unsafe end"
  | "safe center unsafe center"
  | "safe center safe start"
  | "safe center safe end"
  | "safe center safe center"
  | "normal space-between"
  | "normal space-around"
  | "normal space-evenly"
  | "baseline space-between"
  | "baseline space-around"
  | "baseline space-evenly"
  | "first baseline space-between"
  | "first baseline space-around"
  | "first baseline space-evenly"
  | "last baseline space-between"
  | "last baseline space-around"
  | "last baseline space-evenly"
  | "start space-between"
  | "start space-around"
  | "start space-evenly"
  | "end space-between"
  | "end space-around"
  | "end space-evenly"
  | "center space-between"
  | "center space-around"
  | "center space-evenly"
  | "unsafe start space-between"
  | "unsafe start space-around"
  | "unsafe start space-evenly"
  | "unsafe end space-between"
  | "unsafe end space-around"
  | "unsafe end space-evenly"
  | "unsafe center space-between"
  | "unsafe center space-around"
  | "unsafe center space-evenly"
  | "safe start space-between"
  | "safe start space-around"
  | "safe start space-evenly"
  | "safe end space-between"
  | "safe end space-around"
  | "safe end space-evenly"
  | "safe center space-between"
  | "safe center space-around"
  | "safe center space-evenly"
  | "stretch space-between"
  | "stretch space-around"
  | "stretch space-evenly"
  | "space-between normal"
  | "space-between start"
  | "space-between end"
  | "space-between center"
  | "space-between unsafe start"
  | "space-between unsafe end"
  | "space-between unsafe center"
  | "space-between safe start"
  | "space-between safe end"
  | "space-between safe center"
  | "space-between stretch"
  | "space-between space-between"
  | "space-between space-around"
  | "space-between space-evenly"
  | "space-around normal"
  | "space-around start"
  | "space-around end"
  | "space-around center"
  | "space-around unsafe start"
  | "space-around unsafe end"
  | "space-around unsafe center"
  | "space-around safe start"
  | "space-around safe end"
  | "space-around safe center"
  | "space-around stretch"
  | "space-around space-between"
  | "space-around space-around"
  | "space-around space-evenly"
  | "space-evenly normal"
  | "space-evenly start"
  | "space-evenly end"
  | "space-evenly center"
  | "space-evenly unsafe start"
  | "space-evenly unsafe end"
  | "space-evenly unsafe center"
  | "space-evenly safe start"
  | "space-evenly safe end"
  | "space-evenly safe center"
  | "space-evenly stretch"
  | "space-evenly space-between"
  | "space-evenly space-around"
  | "space-evenly space-evenly";

/**
 * Complex type for `placeItems` based on CSS `place-items` property.
 * This is a partial representation due to the vast number of combinations.
 */
type PlaceItemsValue =
  | AlignItemsKeyword
  | `${AlignItemsKeyword} ${JustifyItemsKeyword}`
  | `${JustifyItemsKeyword} ${AlignItemsKeyword}` // CSS allows this order
  | "normal normal"
  | "normal stretch"
  | "normal baseline"
  | "normal first baseline"
  | "normal last baseline"
  | "normal start"
  | "normal end"
  | "normal center"
  | "normal unsafe start"
  | "normal unsafe end"
  | "normal unsafe center"
  | "normal safe start"
  | "normal safe end"
  | "normal safe center"
  | "stretch normal"
  | "stretch stretch"
  | "stretch baseline"
  | "stretch first baseline"
  | "stretch last baseline"
  | "stretch start"
  | "stretch end"
  | "stretch center"
  | "stretch unsafe start"
  | "stretch unsafe end"
  | "stretch unsafe center"
  | "stretch safe start"
  | "stretch safe end"
  | "stretch safe center"
  | "baseline normal"
  | "baseline stretch"
  | "baseline baseline"
  | "baseline first baseline"
  | "baseline last baseline"
  | "baseline start"
  | "baseline end"
  | "baseline center"
  | "baseline unsafe start"
  | "baseline unsafe end"
  | "baseline unsafe center"
  | "baseline safe start"
  | "baseline safe end"
  | "baseline safe center"
  | "first baseline normal"
  | "first baseline stretch"
  | "first baseline baseline"
  | "first baseline first baseline"
  | "first baseline last baseline"
  | "first baseline start"
  | "first baseline end"
  | "first baseline center"
  | "first baseline unsafe start"
  | "first baseline unsafe end"
  | "first baseline unsafe center"
  | "first baseline safe start"
  | "first baseline safe end"
  | "first baseline safe center"
  | "last baseline normal"
  | "last baseline stretch"
  | "last baseline baseline"
  | "last baseline first baseline"
  | "last baseline last baseline"
  | "last baseline start"
  | "last baseline end"
  | "last baseline center"
  | "last baseline unsafe start"
  | "last baseline unsafe end"
  | "last baseline unsafe center"
  | "last baseline safe start"
  | "last baseline safe end"
  | "last baseline safe center"
  | "start normal"
  | "start stretch"
  | "start baseline"
  | "start first baseline"
  | "start last baseline"
  | "start start"
  | "start end"
  | "start center"
  | "start unsafe start"
  | "start unsafe end"
  | "start unsafe center"
  | "start safe start"
  | "start safe end"
  | "start safe center"
  | "end normal"
  | "end stretch"
  | "end baseline"
  | "end first baseline"
  | "end last baseline"
  | "end start"
  | "end end"
  | "end center"
  | "end unsafe start"
  | "end unsafe end"
  | "end unsafe center"
  | "end safe start"
  | "end safe end"
  | "end safe center"
  | "center normal"
  | "center stretch"
  | "center baseline"
  | "center first baseline"
  | "center last baseline"
  | "center start"
  | "center end"
  | "center center"
  | "center unsafe start"
  | "center unsafe end"
  | "center unsafe center"
  | "center safe start"
  | "center safe end"
  | "center safe center"
  | "unsafe start normal"
  | "unsafe start stretch"
  | "unsafe start baseline"
  | "unsafe start first baseline"
  | "unsafe start last baseline"
  | "unsafe start start"
  | "unsafe start end"
  | "unsafe start center"
  | "unsafe start unsafe start"
  | "unsafe start unsafe end"
  | "unsafe start unsafe center"
  | "unsafe start safe start"
  | "unsafe start safe end"
  | "unsafe start safe center"
  | "unsafe end normal"
  | "unsafe end stretch"
  | "unsafe end baseline"
  | "unsafe end first baseline"
  | "unsafe end last baseline"
  | "unsafe end start"
  | "unsafe end end"
  | "unsafe end center"
  | "unsafe end unsafe start"
  | "unsafe end unsafe end"
  | "unsafe end unsafe center"
  | "unsafe end safe start"
  | "unsafe end safe end"
  | "unsafe end safe center"
  | "unsafe center normal"
  | "unsafe center stretch"
  | "unsafe center baseline"
  | "unsafe center first baseline"
  | "unsafe center last baseline"
  | "unsafe center start"
  | "unsafe center end"
  | "unsafe center center"
  | "unsafe center unsafe start"
  | "unsafe center unsafe end"
  | "unsafe center unsafe center"
  | "unsafe center safe start"
  | "unsafe center safe end"
  | "unsafe center safe center"
  | "safe start normal"
  | "safe start stretch"
  | "safe start baseline"
  | "safe start first baseline"
  | "safe start last baseline"
  | "safe start start"
  | "safe start end"
  | "safe start center"
  | "safe start unsafe start"
  | "safe start unsafe end"
  | "safe start unsafe center"
  | "safe start safe start"
  | "safe start safe end"
  | "safe start safe center"
  | "safe end normal"
  | "safe end stretch"
  | "safe end baseline"
  | "safe end first baseline"
  | "safe end last baseline"
  | "safe end start"
  | "safe end end"
  | "safe end center"
  | "safe end unsafe start"
  | "safe end unsafe end"
  | "safe end unsafe center"
  | "safe end safe start"
  | "safe end safe end"
  | "safe end safe center"
  | "safe center normal"
  | "safe center stretch"
  | "safe center baseline"
  | "safe center first baseline"
  | "safe center last baseline"
  | "safe center start"
  | "safe center end"
  | "safe center center"
  | "safe center unsafe start"
  | "safe center unsafe end"
  | "safe center unsafe center"
  | "safe center safe start"
  | "safe center safe end"
  | "safe center safe center";

/**
 * Augments the 'react' module to include type definitions for the 's-grid'
 * and 's-grid-item' custom elements and their associated attributes.
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
   * Declares the 's-grid' and 's-grid-item' custom intrinsic elements for JSX.
   * This allows you to use them directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-grid' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Use `s-grid` to organize your content in a matrix of rows and columns
       * and make responsive layouts for pages.
       */
      "s-grid": React.DetailedHTMLProps<
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
         * Aligns the grid along the block (column) axis.
         * This overrides the block value of `placeContent`.
         */
        alignContent?: "" | AlignContentKeyword;

        /**
         * Aligns the grid items along the block (column) axis.
         * This overrides the block value of `placeItems`.
         */
        alignItems?: "" | AlignItemsKeyword;

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
         * This overrides the column value of `gap`.
         */
        columnGap?: MakeResponsive<"" | SpacingKeyword>;

        /**
         * Sets the outer display type of the component.
         */
        display?: MakeResponsive<"auto" | "none">;

        /**
         * Adjust spacing between elements.
         */
        gap?: MakeResponsive<MaybeTwoValuesShorthandProperty<SpacingKeyword>>;

        /**
         * Define columns and specify their size.
         */
        gridTemplateColumns?: string;

        /**
         * Define rows and specify their size.
         */
        gridTemplateRows?: string;

        /**
         * Adjust the inline size.
         */
        inlineSize?: SizeUnitsOrAuto;

        /**
         * Aligns the grid along the inline (row) axis.
         * This overrides the inline value of `placeContent`.
         */
        justifyContent?: "" | JustifyContentKeyword;

        /**
         * Aligns the grid items along the inline (row) axis.
         * This overrides the inline value of `placeItems`.
         */
        justifyItems?: "" | JustifyItemsKeyword;

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
         * A shorthand property for `justify-content` and `align-content`.
         */
        placeContent?: PlaceContentValue;

        /**
         * A shorthand property for `justify-items` and `align-items`.
         */
        placeItems?: PlaceItemsValue;

        /**
         * Adjust spacing between elements in the block axis.
         * This overrides the row value of `gap`.
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

      /**
       * The 's-grid-item' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Display content within a single item of a grid layout.
       */
      "s-grid-item": React.DetailedHTMLProps<
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
         * Defines the grid column position and span for the item.
         * This is a string that follows CSS grid-column syntax (e.g., "span 2", "1 / 3", "auto").
         */
        gridColumn?: string;

        /**
         * Defines the grid row position and span for the item.
         * This is a string that follows CSS grid-row syntax (e.g., "span 2", "1 / 3", "auto").
         */
        gridRow?: string;

        /**
         * Adjust the inline size.
         */
        inlineSize?: SizeUnitsOrAuto;

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
