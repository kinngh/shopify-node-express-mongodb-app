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
 * Defines the options for the 'click' method on the s-button element.
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
 * @template TTagName The tag name of the HTML element (e.g., 's-button').
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
 * Augments the 'react' module to include type definitions for the 's-button'
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
   * Declares the 's-button' custom intrinsic element for JSX.
   * This allows you to use <s-button> directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-button' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       */
      "s-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        /**
         * A label that describes the purpose or contents of the Button.
         * It will be read to users using assistive technologies such as screen readers.
         */
        accessibilityLabel?: string;

        /**
         * Corresponds to the 'bar' attribute of the 'foo' element (from your JSON).
         * Type inferred as string | boolean, as no specific type was given beyond its presence.
         */
        bar?: string | boolean;

        /**
         * Corresponds to the 'baz' attribute of the 'foo' element (from your JSON).
         * Its value is restricted to 'baz-val-1'.
         */
        baz?: "baz-val-1";

        /**
         * Sets the action the `commandFor` should take when this clickable is activated.
         */
        command?: "--auto" | "--show" | "--hide" | "--toggle";

        /**
         * ID of a component that should respond to activations (e.g. clicks) on this component.
         */
        commandFor?: string;

        /**
         * Disables the button, meaning it cannot be clicked or receive focus.
         */
        disabled?: boolean;

        /**
         * Causes the browser to treat the linked URL as a download with the string being the file name.
         */
        download?: string;

        /**
         * The URL to link to.
         */
        href?: string;

        /**
         * Sets the icon to display within the button.
         * This is a very long union of string literals representing available icons.
         */
        icon?:
          | ""
          | "replace"
          | "search"
          | "link"
          | "product"
          | "variant"
          | "collection"
          | "select"
          | "info"
          | "incomplete"
          | "complete"
          | "color"
          | "money"
          | "adjust"
          | "affiliate"
          | "airplane"
          | "alert-bubble"
          | "alert-circle"
          | "alert-diamond"
          | "alert-location"
          | "alert-octagon-filled"
          | "alert-octagon"
          | "alert-triangle"
          | "alert-triangle-filled"
          | "app-extension"
          | "apps"
          | "archive"
          | "arrow-down-circle"
          | "arrow-down-right"
          | "arrow-down"
          | "arrow-left-circle"
          | "arrow-left"
          | "arrow-right-circle"
          | "arrow-right"
          | "arrow-up-circle"
          | "arrow-up-right"
          | "arrow-up"
          | "arrows-in-horizontal"
          | "arrows-out-horizontal"
          | "attachment"
          | "automation"
          | "backspace"
          | "bag"
          | "bank"
          | "barcode"
          | "bill"
          | "blank"
          | "blog"
          | "bolt-filled"
          | "bolt"
          | "book-open"
          | "book"
          | "bug"
          | "bullet"
          | "business-entity"
          | "button-press"
          | "button"
          | "calculator"
          | "calendar-check"
          | "calendar-compare"
          | "calendar-list"
          | "calendar-time"
          | "calendar"
          | "camera-flip"
          | "camera"
          | "caret-down"
          | "caret-up"
          | "caret-left"
          | "caret-right"
          | "cart-abandoned"
          | "cart-discount"
          | "cart-down"
          | "cart-sale"
          | "cart-up"
          | "cart"
          | "cash-dollar"
          | "cash-euro"
          | "cash-pound"
          | "cash-rupee"
          | "cash-yen"
          | "catalog-product"
          | "categories"
          | "channels"
          | "chart-cohort"
          | "chart-donut"
          | "chart-funnel"
          | "chart-histogram-first-last"
          | "chart-histogram-first"
          | "chart-histogram-flat"
          | "chart-histogram-full"
          | "chart-histogram-growth"
          | "chart-histogram-last"
          | "chart-histogram-second-last"
          | "chart-horizontal"
          | "chart-line"
          | "chart-popular"
          | "chart-stacked"
          | "chart-vertical"
          | "chat-new"
          | "chat-referral"
          | "chat"
          | "check-circle-filled"
          | "check-circle"
          | "check"
          | "checkbox"
          | "chevron-down-circle"
          | "chevron-down"
          | "chevron-left-circle"
          | "chevron-left"
          | "chevron-right-circle"
          | "chevron-right"
          | "chevron-up-circle"
          | "chevron-up"
          | "circle-dashed"
          | "circle"
          | "clipboard-check"
          | "clipboard-checklist"
          | "clipboard"
          | "clock-revert"
          | "clock"
          | "code-add"
          | "code"
          | "collection-featured"
          | "collection-list"
          | "collection-reference"
          | "color-none"
          | "compass"
          | "compose"
          | "confetti"
          | "connect"
          | "content"
          | "contract"
          | "corner-pill"
          | "corner-round"
          | "corner-square"
          | "credit-card-cancel"
          | "credit-card-percent"
          | "credit-card-reader-chip"
          | "credit-card-reader-tap"
          | "credit-card-reader"
          | "credit-card-secure"
          | "credit-card-tap-chip"
          | "credit-card"
          | "crop"
          | "currency-convert"
          | "cursor-banner"
          | "cursor-option"
          | "cursor"
          | "data-presentation"
          | "data-table"
          | "database-add"
          | "database-connect"
          | "database"
          | "delete"
          | "delivered"
          | "delivery"
          | "desktop"
          | "disabled"
          | "discount-add"
          | "discount-code"
          | "discount"
          | "dns-settings"
          | "dock-floating"
          | "dock-side"
          | "domain-landing-page"
          | "domain-new"
          | "domain-redirect"
          | "domain"
          | "download"
          | "drag-drop"
          | "drag-handle"
          | "duplicate"
          | "edit"
          | "email-follow-up"
          | "email-newsletter"
          | "email"
          | "empty"
          | "enabled"
          | "enter"
          | "envelope-soft-pack"
          | "envelope"
          | "eraser"
          | "exchange"
          | "exit"
          | "export"
          | "external"
          | "eye-check-mark"
          | "eye-dropper-list"
          | "eye-dropper"
          | "eye-first"
          | "eyeglasses"
          | "fav"
          | "favicon"
          | "file-list"
          | "file"
          | "filter"
          | "flag"
          | "flip-horizontal"
          | "flip-vertical"
          | "flower"
          | "folder-add"
          | "folder-down"
          | "folder-remove"
          | "folder-up"
          | "folder"
          | "food"
          | "foreground"
          | "forklift"
          | "forms"
          | "games"
          | "gauge"
          | "geolocation"
          | "gift-card"
          | "gift"
          | "git-branch"
          | "git-commit"
          | "git-repository"
          | "globe-asia"
          | "globe-europe"
          | "globe-lines"
          | "globe-list"
          | "globe"
          | "grid"
          | "hashtag-decimal"
          | "hashtag-list"
          | "hashtag"
          | "heart"
          | "hide-filled"
          | "hide"
          | "home"
          | "icons"
          | "identity-card"
          | "image-add"
          | "image-alt"
          | "image-explore"
          | "image-magic"
          | "image-none"
          | "image-with-text-overlay"
          | "image"
          | "images"
          | "import"
          | "in-progress"
          | "incentive"
          | "incoming"
          | "info-filled"
          | "inventory-updated"
          | "inventory"
          | "iq"
          | "key"
          | "keyboard-filled"
          | "keyboard-hide"
          | "keyboard"
          | "label-printer"
          | "language-translate"
          | "language"
          | "layout-block"
          | "layout-buy-button-horizontal"
          | "layout-buy-button-vertical"
          | "layout-buy-button"
          | "layout-column-1"
          | "layout-columns-2"
          | "layout-columns-3"
          | "layout-footer"
          | "layout-header"
          | "layout-logo-block"
          | "layout-popup"
          | "layout-rows-2"
          | "layout-section"
          | "layout-sidebar-left"
          | "layout-sidebar-right"
          | "lightbulb"
          | "link-list"
          | "list-bulleted"
          | "list-numbered"
          | "live"
          | "location-none"
          | "location"
          | "lock"
          | "map"
          | "markets-euro"
          | "markets-rupee"
          | "markets-yen"
          | "markets"
          | "maximize"
          | "measurement-size-list"
          | "measurement-size"
          | "measurement-volume-list"
          | "measurement-volume"
          | "measurement-weight-list"
          | "measurement-weight"
          | "media-receiver"
          | "megaphone"
          | "mention"
          | "menu-horizontal"
          | "menu-vertical"
          | "menu"
          | "merge"
          | "metafields"
          | "metaobject-list"
          | "metaobject-reference"
          | "metaobject"
          | "microphone"
          | "minimize"
          | "minus-circle"
          | "minus"
          | "mobile"
          | "money-none"
          | "moon"
          | "nature"
          | "note-add"
          | "note"
          | "notification"
          | "order-batches"
          | "order-draft"
          | "order-first"
          | "order-fulfilled"
          | "order-repeat"
          | "order-unfulfilled"
          | "order"
          | "orders-status"
          | "organization"
          | "outdent"
          | "outgoing"
          | "package-fulfilled"
          | "package-on-hold"
          | "package-returned"
          | "package"
          | "page-add"
          | "page-attachment"
          | "page-clock"
          | "page-down"
          | "page-heart"
          | "page-list"
          | "page-reference"
          | "page-remove"
          | "page-report"
          | "page-up"
          | "page"
          | "pagination-end"
          | "pagination-start"
          | "paint-brush-flat"
          | "paint-brush-round"
          | "paper-check"
          | "partially-complete"
          | "passkey"
          | "paste"
          | "pause-circle"
          | "payment-capture"
          | "payment"
          | "payout-dollar"
          | "payout-euro"
          | "payout-pound"
          | "payout-rupee"
          | "payout-yen"
          | "payout"
          | "person-add"
          | "person-exit"
          | "person-list"
          | "person-lock"
          | "person-remove"
          | "person-segment"
          | "person"
          | "personalized-text"
          | "phone-in"
          | "phone-out"
          | "phone"
          | "pin"
          | "pin-remove"
          | "plan"
          | "play-circle"
          | "play"
          | "plus-circle"
          | "plus-circle-down"
          | "plus-circle-up"
          | "plus"
          | "point-of-sale"
          | "price-list"
          | "print"
          | "product-add"
          | "product-cost"
          | "product-list"
          | "product-reference"
          | "product-remove"
          | "product-return"
          | "product-unavailable"
          | "profile-filled"
          | "profile"
          | "question-circle-filled"
          | "question-circle"
          | "receipt-dollar"
          | "receipt-euro"
          | "receipt-folded"
          | "receipt-paid"
          | "receipt-pound"
          | "receipt-refund"
          | "receipt-rupee"
          | "receipt-yen"
          | "receipt"
          | "receivables"
          | "redo"
          | "referral-code"
          | "refresh"
          | "remove-background"
          | "reorder"
          | "replay"
          | "reset"
          | "return"
          | "reward"
          | "rocket"
          | "rotate-left"
          | "rotate-right"
          | "sandbox"
          | "save"
          | "savings"
          | "search-list"
          | "search-recent"
          | "search-resource"
          | "send"
          | "settings"
          | "share"
          | "shield-check-mark"
          | "shield-none"
          | "shield-pending"
          | "shield-person"
          | "shipping-label"
          | "shopcodes"
          | "slideshow"
          | "smiley-happy"
          | "smiley-joy"
          | "smiley-neutral"
          | "smiley-sad"
          | "social-ad"
          | "social-post"
          | "sort-ascending"
          | "sort-descending"
          | "sort"
          | "sound"
          | "sports"
          | "star-filled"
          | "star-half"
          | "star-list"
          | "star"
          | "status-active"
          | "status"
          | "stop-circle"
          | "store-import"
          | "store-managed"
          | "store-online"
          | "store"
          | "sun"
          | "table-masonry"
          | "table"
          | "tablet"
          | "target"
          | "tax"
          | "team"
          | "text-align-center"
          | "text-align-left"
          | "text-align-right"
          | "text-block"
          | "text-bold"
          | "text-color"
          | "text-font-list"
          | "text-font"
          | "text-grammar"
          | "text-in-columns"
          | "text-in-rows"
          | "text-indent-remove"
          | "text-indent"
          | "text-italic"
          | "text-quote"
          | "text-title"
          | "text-underline"
          | "text-with-image"
          | "text"
          | "theme-edit"
          | "theme-store"
          | "theme-template"
          | "theme"
          | "three-d-environment"
          | "thumbs-down"
          | "thumbs-up"
          | "tip-jar"
          | "toggle-off"
          | "toggle-on"
          | "transaction-fee-dollar"
          | "transaction-fee-euro"
          | "transaction-fee-pound"
          | "transaction-fee-rupee"
          | "transaction-fee-yen"
          | "transaction"
          | "transfer-in"
          | "transfer-internal"
          | "transfer-out"
          | "transfer"
          | "truck"
          | "undo"
          | "unknown-device"
          | "unlock"
          | "upload"
          | "view"
          | "viewport-narrow"
          | "viewport-short"
          | "viewport-tall"
          | "viewport-wide"
          | "wallet"
          | "wand"
          | "watch"
          | "wifi"
          | "work-list"
          | "work"
          | "wrench"
          | "x-circle-filled"
          | "x-circle"
          | "x";

        /**
         * Replaces content with a loading indicator while a background action is being performed.
         * This also disables the button.
         */
        loading?: boolean;

        /**
         * Specifies where to display the linked URL.
         */
        target?:
          | "_blank"
          | "_self"
          | "_parent"
          | "_top"
          | "auto"
          | (string & {}); // 'AnyString' from doc is represented as (string & {})

        /**
         * Sets the tone of the Button, based on the intention of the information being conveyed.
         */
        tone?: "critical" | "auto" | "neutral";

        /**
         * The behavior of the button.
         */
        type?: "button" | "reset" | "submit";

        /**
         * Changes the visual appearance of the Button.
         */
        variant?: "auto" | "primary" | "secondary" | "tertiary";

        // Methods (these are typically accessed on the DOM element directly, not as JSX props)
        // However, if you're using refs to access the component instance,
        // these types would be useful for the ref's current value.
        // For JSX props, you'd typically have `onClick`, etc.

        /**
         * Like the standard `element.click()`, but you can influence the behavior with a `sourceEvent`.
         * This is a method on the component instance, not a JSX prop.
         */
        // click?: (options?: ClickOptions) => void;

        /**
         * Queue a run of the render function. You shouldn't need to call this manually.
         * This is a method on the component instance, not a JSX prop.
         */
        // queueRender?: () => void;

        /**
         * Sets an attribute on the element.
         * This is a method on the component instance, not a JSX prop.
         */
        // setAttribute?: (name: string, value: string) => void;

        // Lifecycle Callbacks (these are also methods on the custom element, not JSX props)
        // adoptedCallback?: () => void;
        // attributeChangedCallback?: (name: string) => void;
        // connectedCallback?: () => void;
        // disconnectedCallback?: () => void;

        // Event Handlers for the s-button component.
        // These are mapped to standard React event handler prop names.
        // The `currentTarget` will be the <s-button> element.

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
      };
    }
  }
}
