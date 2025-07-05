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
 * Defines the options for the 'click' method on various elements.
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
 * It assumes `TEvent` is a standard DOM event type (e.g., Event).
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
 * Defines the actual table variant, which is either 'table' or 'list'.
 */
type ActualTableVariant = "table" | "list";

/**
 * Defines the content designation for the table's `list` variant.
 */
type ListSlotType = "primary" | "secondary" | "kicker" | "inline" | "labeled";

/**
 * A simplified representation of `AddedContext` for type compatibility.
 * In a real scenario, you might have a more detailed definition if interacting
 * with this context directly from JavaScript. For JSX props, we typically
 * don't expose these internal context symbols.
 */
interface AddedContext<T> extends EventTarget {
  value: T;
  // addEventListener(type: string, callback: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  // dispatchEvent(event: Event): boolean;
  // removeEventListener(type: string, callback: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

/**
 * Augments the 'react' module to include type definitions for the 's-table'
 * and its nested custom elements.
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
   * Declares the 's-table' and its related custom intrinsic elements for JSX.
   * This allows you to use them directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-table' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Displays data clearly in rows and columns, helping users view, analyze,
       * and compare information. Automatically renders as a list on small screens
       * and a table on large ones.
       */
      "s-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * Whether there's an additional page of data.
         */
        hasNextPage?: boolean;

        /**
         * Whether there's a previous page of data.
         */
        hasPreviousPage?: boolean;

        /**
         * Whether the table is in a loading state, such as initial page load
         * or loading the next page in a paginated table.
         */
        loading?: boolean;

        /**
         * Whether to use pagination controls.
         */
        paginate?: boolean;

        /**
         * Sets the layout of the Table.
         * - `list`: The Table is always displayed as a list.
         * - `table`: The Table is always displayed as a table.
         * - `auto`: The Table is displayed as a table on wide devices and as a list on narrow devices.
         */
        variant?: "auto" | "list" | "table";

        // Slots
        /**
         * Additional filters to display in the table. For example, the `s-search-field`
         * component can be used to filter the table data.
         */
        filters?: React.ReactNode;

        // Event Handlers for the s-table component.
        /**
         * Event handler for the 'nextpage' event.
         */
        onNextpage?: (event: Event & { currentTarget: HTMLElement }) => void;

        /**
         * Event handler for the 'previouspage' event.
         */
        onPreviouspage?: (
          event: Event & { currentTarget: HTMLElement }
        ) => void;

        // Private properties from the documentation are omitted as JSX props:
        // '__@actualTableVariantSymbol@5001'
        // '__@tableHeadersSharedDataSymbol@5002'
      };

      /**
       * The 's-table-header-row' custom element.
       * It extends standard HTML attributes.
       *
       * Define a header row in a table, displaying column names and enabling sorting.
       */
      "s-table-header-row": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        // No specific properties listed for s-table-header-row itself in the provided documentation
      };

      /**
       * The 's-table-header' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Display column names at the top of a table.
       */
      "s-table-header": React.DetailedHTMLProps<
        React.ThHTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * Content designation for the table's `list` variant.
         */
        listSlot?: ListSlotType;
      };

      /**
       * The 's-table-body' custom element.
       * It extends standard HTML attributes.
       *
       * Define the main content area of a table, containing rows and cells that display data.
       */
      "s-table-body": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        // No specific properties listed for s-table-body itself in the provided documentation
      };

      /**
       * The 's-table-row' custom element.
       * It extends standard HTML attributes.
       *
       * Display a row of data within the body of a table.
       */
      "s-table-row": React.DetailedHTMLProps<
        React.TrHTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        // No specific properties listed for s-table-row itself in the provided documentation
      };

      /**
       * The 's-table-cell' custom element.
       * It extends standard HTML attributes.
       *
       * Display data within a cell in a table row.
       */
      "s-table-cell": React.DetailedHTMLProps<
        React.TdHTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        // No specific properties listed for s-table-cell itself in the provided documentation
      };
    }
  }
}
