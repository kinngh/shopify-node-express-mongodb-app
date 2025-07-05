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
 * Defines the possible values for the 'icon' property (copied from previous definitions).
 */
type IconType =
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
  | "x"
  | AnyString;

/**
 * Defines the possible values for the 'labelAccessibilityVisibility' property.
 */
type LabelAccessibilityVisibility = "visible" | "exclusive";

/**
 * Augments the 'react' module to include type definitions for the 's-select'
 * and 's-option' custom elements and their associated attributes.
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
   * Declares the 's-select' and 's-option' custom intrinsic elements for JSX.
   * This allows you to use them directly in your JSX code with type safety.
   */
  namespace JSX {
    interface IntrinsicElements {
      /**
       * The 's-select' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Allow users to pick one option from a menu.
       */
      "s-select": React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLElement
      > & {
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
         * The type of icon to be displayed in the field.
         */
        icon?: IconType;

        /**
         * A unique identifier for the element.
         */
        id?: string;

        /**
         * Content to use as the field label.
         */
        label?: string;

        /**
         * Changes the visibility of the component's label.
         */
        labelAccessibilityVisibility?: LabelAccessibilityVisibility;

        /**
         * An identifier for the field that is unique within the nearest containing form.
         */
        name?: string;

        /**
         * A short hint that describes the expected value of the field.
         */
        placeholder?: string;

        /**
         * Whether the field needs a value.
         */
        required?: boolean;

        /**
         * The current value for the field. If omitted, the field will be empty.
         */
        value?: string;

        // Event Handlers for the s-select component.
        // These are mapped to standard React event handler prop names.
        // The `currentTarget` will be the <s-select> element.

        /**
         * Event handler for the 'change' event.
         */
        onChange?: React.ChangeEventHandler<HTMLElement>;

        /**
         * Event handler for the 'input' event.
         */
        onInput?: React.FormEventHandler<HTMLElement>;

        // Private properties from the documentation are omitted as JSX props:
        // '__@hasInitialValueSymbol@4640'
        // '__@internals$2@4228'
        // '__@usedFirstOptionSymbol@4639'

        // Methods (these are typically accessed on the DOM element directly, not as JSX props)
        // adoptedCallback?: () => void;
        // attributeChangedCallback?: (name: string) => void;
        // click?: (options?: ClickOptions) => void;
        // connectedCallback?: () => void;
        // disconnectedCallback?: () => void;
        // formResetCallback?: () => void;
        // queueRender?: () => void;
        // setAttribute?: (name: string, value: string) => void;
      };

      /**
       * The 's-option' custom element.
       * It extends standard HTML attributes and adds its specific properties.
       *
       * Represents a single option within an `s-select` component.
       */
      "s-option": React.DetailedHTMLProps<
        React.OptionHTMLAttributes<HTMLOptionElement>,
        HTMLElement
      > & {
        /**
         * Whether the option is disabled.
         */
        disabled?: boolean;

        /**
         * The value of the option when selected.
         */
        value?: string;

        // No other specific properties or events listed in the provided documentation for s-option
        // Methods (these are typically accessed on the DOM element directly, not as JSX props)
        // adoptedCallback?: () => void;
        // attributeChangedCallback?: (name: string) => void;
        // click?: (options?: ClickOptions) => void;
        // connectedCallback?: () => void;
        // disconnectedCallback?: () => void;
        // queueRender?: () => void;
        // setAttribute?: (name: string, value: string) => void;
      };
    }
  }
}
