export const componentContracts = {
  button: {
    factory: "createButton",
    element: "button",
    purpose: "Trigger a clear action with semantic emphasis, intent, state, and accessible label.",
    variants: ["primary", "secondary", "tertiary", "outlined", "ghost"],
    intents: ["default", "danger", "warning"],
    states: ["default", "hover", "focus", "pressed", "disabled", "loading"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "variant", type: "\"primary\" | \"secondary\" | \"tertiary\" | \"outlined\" | \"ghost\"", required: false },
      { name: "intent", type: "\"default\" | \"danger\" | \"warning\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"pressed\" | \"disabled\" | \"loading\"", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "loading", type: "boolean", required: false },
      { name: "fullWidth", type: "boolean", required: false },
      { name: "icon", type: "string", required: false },
      { name: "trailingIcon", type: "string", required: false },
      { name: "type", type: "\"button\" | \"submit\" | \"reset\"", required: false }
    ],
    accessibility: [
      "Use visible text or an equivalent accessible name.",
      "Preserve native button semantics.",
      "Keep disabled actions non-interactive.",
      "Expose loading with aria-busy and block duplicate activation."
    ]
  },
  iconButton: {
    factory: "createIconButton",
    element: "button",
    purpose: "Trigger a compact icon-only utility with a fixed circular hit area, required accessible label, optional badge, and selected state only for true toggles.",
    variants: ["ghost", "tonal", "primary", "accent"],
    intents: ["default"],
    states: ["default", "hover", "pressed", "selected", "badged", "focus", "disabled"],
    props: [
      { name: "ariaLabel", type: "string", required: true },
      { name: "label", type: "string", required: false },
      { name: "icon", type: "string", required: true },
      { name: "variant", type: "\"ghost\" | \"tonal\" | \"primary\" | \"accent\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "selected", type: "boolean", required: false },
      { name: "badge", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "type", type: "\"button\" | \"submit\" | \"reset\"", required: false }
    ],
    accessibility: [
      "Always provide an accessible action name through ariaLabel or label.",
      "Keep the icon hidden from assistive technology.",
      "Expose selected toggle state with aria-pressed only when selected is true.",
      "Keep badge decorative and do not let it replace the accessible name."
    ]
  },
  input: {
    factory: "createInput",
    element: "label",
    purpose: "Capture short free-form input with visible label, helper or recovery text, density, state, optional icon, qualifiers, capture role, and native input semantics.",
    variants: ["text", "email", "password", "number", "currency", "unit", "search"],
    intents: ["default"],
    states: ["default", "focus", "filled", "loading", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "helper", type: "string", required: false },
      { name: "helperText", type: "string", required: false },
      { name: "error", type: "string", required: false },
      { name: "value", type: "string", required: false },
      { name: "name", type: "string", required: false },
      { name: "placeholder", type: "string", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "loading", type: "boolean", required: false },
      { name: "required", type: "boolean", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "state", type: "\"default\" | \"focus\" | \"filled\" | \"loading\" | \"error\" | \"disabled\"", required: false },
      { name: "variant", type: "\"text\" | \"email\" | \"password\" | \"number\" | \"currency\" | \"unit\" | \"search\"", required: false },
      { name: "icon", type: "string", required: false },
      { name: "prefix", type: "string", required: false },
      { name: "suffix", type: "string", required: false },
      { name: "mono", type: "boolean", required: false },
      { name: "type", type: "string", required: false },
      { name: "inputMode", type: "string", required: false },
      { name: "autocomplete", type: "string", required: false },
      { name: "align", type: "\"start\" | \"end\"", required: false },
      { name: "revealable", type: "boolean", required: false }
    ],
    accessibility: [
      "Keep the visible label associated with the input.",
      "Use placeholder as a hint, not as the only label.",
      "Associate helper or error text with aria-describedby.",
      "Expose error through aria-invalid when recovery is required.",
      "Preserve native input keyboard behavior."
    ]
  },
  cardNumberInput: {
    factory: "createCardNumberInput",
    element: "label",
    purpose: "Capture one grouped card number with numeric keyboard, cc-number autocomplete, local Luhn validation, helper/error copy, and Design System field states.",
    variants: ["default"],
    intents: ["default"],
    states: ["default", "filled", "valid", "loading", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "value", type: "string", required: false },
      { name: "helper", type: "string", required: false },
      { name: "error", type: "string", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "loading", type: "boolean", required: false },
      { name: "required", type: "boolean", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "state", type: "\"default\" | \"filled\" | \"valid\" | \"loading\" | \"error\" | \"disabled\"", required: false },
      { name: "name", type: "string", required: false },
      { name: "placeholder", type: "string", required: false },
      { name: "validationMessage", type: "string", required: false },
      { name: "onValueChange", type: "(digits: string, meta: CardNumberMeta) => void", required: false }
    ],
    accessibility: [
      "Keep the visible label associated with the card number input.",
      "Use inputmode numeric and autocomplete cc-number.",
      "Expose invalid local structure through aria-invalid and helper copy.",
      "Do not claim backend approval, tokenization, or card ownership.",
      "Preserve paste, correction, and keyboard behavior."
    ]
  },
  cardExpiryInput: {
    factory: "createCardExpiryInput",
    element: "label",
    purpose: "Capture one card expiry date in MM/YY format with numeric keyboard, cc-exp autocomplete, local month and expiry validation, helper/error copy, and Design System field states.",
    variants: ["default"],
    intents: ["default"],
    states: ["default", "filled", "valid", "loading", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "value", type: "string", required: false },
      { name: "helper", type: "string", required: false },
      { name: "error", type: "string", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "loading", type: "boolean", required: false },
      { name: "required", type: "boolean", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "state", type: "\"default\" | \"filled\" | \"valid\" | \"loading\" | \"error\" | \"disabled\"", required: false },
      { name: "name", type: "string", required: false },
      { name: "placeholder", type: "string", required: false },
      { name: "validationMessage", type: "string", required: false },
      { name: "expiredMessage", type: "string", required: false },
      { name: "onValueChange", type: "(value: string, meta: CardExpiryMeta) => void", required: false }
    ],
    accessibility: [
      "Keep the visible label associated with the expiry input.",
      "Use inputmode numeric and autocomplete cc-exp.",
      "Expose invalid month or expired date through aria-invalid and helper copy.",
      "Do not claim card approval, tokenization, or ownership.",
      "Preserve paste, correction, and keyboard behavior."
    ]
  },
  cardSecurityCodeInput: {
    factory: "createCardSecurityCodeInput",
    element: "label",
    purpose: "Capture one card security code with numeric keyboard, cc-csc autocomplete, local length validation, optional reveal, helper/error copy, and Design System field states.",
    variants: ["default"],
    intents: ["default"],
    states: ["default", "filled", "valid", "loading", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "value", type: "string", required: false },
      { name: "helper", type: "string", required: false },
      { name: "error", type: "string", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "loading", type: "boolean", required: false },
      { name: "required", type: "boolean", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "state", type: "\"default\" | \"filled\" | \"valid\" | \"loading\" | \"error\" | \"disabled\"", required: false },
      { name: "name", type: "string", required: false },
      { name: "placeholder", type: "string", required: false },
      { name: "expectedLength", type: "3 | 4", required: false },
      { name: "validationMessage", type: "string", required: false },
      { name: "revealable", type: "boolean", required: false },
      { name: "revealed", type: "boolean", required: false },
      { name: "onValueChange", type: "(digits: string, meta: CardSecurityCodeMeta) => void", required: false }
    ],
    accessibility: [
      "Keep the visible label associated with the security code input.",
      "Use inputmode numeric and autocomplete cc-csc.",
      "Expose invalid local length through aria-invalid and helper copy.",
      "Use reveal only as a field action; do not expose or store the code outside the component.",
      "Do not claim card approval, tokenization, or ownership."
    ]
  },
  select: {
    factory: "createSelect",
    element: "label",
    purpose: "Let users choose one option from a named operational set.",
    variants: ["default", "inline"],
    intents: ["default"],
    states: ["default", "open", "focus", "filled", "loading", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "helper", type: "string", required: false },
      { name: "icon", type: "string", required: false },
      { name: "options", type: "Array<{ label: string, value?: string, meta?: string, disabled?: boolean }>", required: true },
      { name: "value", type: "string", required: false },
      { name: "name", type: "string", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "variant", type: "\"default\" | \"inline\"", required: false },
      { name: "state", type: "\"default\" | \"open\" | \"focus\" | \"filled\" | \"loading\" | \"error\" | \"disabled\"", required: false },
      { name: "onValueChange", type: "(value: string, meta: { label: string, meta: string }) => void", required: false }
    ],
    accessibility: [
      "Keep the visible label associated with the select.",
      "Use helper text for context, not as the only label.",
      "Represent unavailable choices with disabled options.",
      "Open with Enter, Space, ArrowDown, or ArrowUp and move through enabled options with arrow keys.",
      "Use the inline variant only when Select is embedded inside another field surface."
    ]
  },
  combobox: {
    factory: "createCombobox",
    element: "label",
    purpose: "Let users type to filter and choose one option from a known operational set.",
    variants: ["default"],
    intents: ["default"],
    states: ["default", "open", "focus", "filled", "empty", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "helper", type: "string", required: false },
      { name: "icon", type: "string", required: false },
      { name: "options", type: "Array<{ label: string, value?: string, meta?: string, disabled?: boolean }>", required: true },
      { name: "value", type: "string", required: false },
      { name: "name", type: "string", required: false },
      { name: "placeholder", type: "string", required: false },
      { name: "emptyText", type: "string", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "state", type: "\"default\" | \"open\" | \"focus\" | \"filled\" | \"empty\" | \"error\" | \"disabled\"", required: false },
      { name: "onValueChange", type: "(value: string, meta: { label: string, meta: string, inputValue?: string, cleared?: boolean }) => void", required: false }
    ],
    accessibility: [
      "Keep the visible label associated with the editable combobox input.",
      "Use aria-autocomplete=list with a listbox of filtered options.",
      "Expose active option with aria-activedescendant while the listbox is open.",
      "Provide visible empty-state copy when filtering produces no results.",
      "Do not use Combobox for global search, async command palettes, multi-select, or form submission flows."
    ]
  },
  card: {
    factory: "createCard",
    element: "article",
    purpose: "Group a product summary, state, supporting detail, and optional actions.",
    variants: ["default", "minimal", "elevated", "ghost"],
    intents: ["default"],
    states: ["default", "hover", "focus", "selected", "loading", "error", "disabled", "muted", "interactive"],
    props: [
      { name: "title", type: "string", required: true },
      { name: "value", type: "string", required: false },
      { name: "unit", type: "string", required: false },
      { name: "detail", type: "string", required: false },
      { name: "status", type: "string", required: false },
      { name: "trend", type: "up | down | neutral", required: false },
      { name: "icon", type: "string", required: false },
      { name: "media", type: "string", required: false },
      { name: "mediaAlt", type: "string", required: false },
      { name: "variant", type: "default | minimal | elevated | ghost", required: false },
      { name: "composition", type: "standard | compact | media | stats", required: false },
      { name: "state", type: "default | hover | focus | selected | loading | error | disabled | muted | interactive", required: false },
      { name: "density", type: "sm | md | lg", required: false },
      { name: "fullWidth", type: "boolean", required: false },
      { name: "interactive", type: "boolean", required: false },
      { name: "selected", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "loading", type: "boolean", required: false },
      { name: "actions", type: "(ButtonProps | IconButtonProps & { iconOnly?: boolean })[]", required: false },
      { name: "onAction", type: "event", required: false }
    ],
    accessibility: [
      "Use a meaningful title.",
      "Keep status visible as text, not color alone.",
      "Use real buttons for nested actions.",
      "When the whole Card is interactive, expose role button, keyboard activation, and aria-pressed for selected state."
    ]
  },
  checkbox: {
    factory: "createCheckbox",
    element: "label",
    purpose: "Let users choose one or more independent options with visible label, optional description, and native checkbox semantics.",
    variants: ["default", "descriptive", "select-all", "compact"],
    intents: ["default"],
    states: ["unchecked", "checked", "indeterminate", "focus", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "error", type: "string", required: false },
      { name: "variant", type: "\"default\" | \"descriptive\" | \"select-all\" | \"compact\"", required: false },
      { name: "state", type: "\"unchecked\" | \"checked\" | \"indeterminate\" | \"focus\" | \"error\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "checked", type: "boolean", required: false },
      { name: "indeterminate", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "name", type: "string", required: false },
      { name: "value", type: "string", required: false },
      { name: "required", type: "boolean", required: false }
    ],
    accessibility: [
      "Use native checkbox input semantics.",
      "Keep a visible label connected by label wrapping.",
      "Use indeterminate only for mixed aggregate state."
    ]
  },
  switch: {
    factory: "createSwitch",
    element: "label",
    purpose: "Toggle a persistent on/off setting with visible label, optional description, and switch semantics.",
    variants: ["default"],
    intents: ["default"],
    states: ["off", "on", "focus", "pressed", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "error", type: "string", required: false },
      { name: "state", type: "\"off\" | \"on\" | \"focus\" | \"pressed\" | \"error\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "checked", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "name", type: "string", required: false },
      { name: "required", type: "boolean", required: false }
    ],
    accessibility: [
      "Use role switch on the native checkbox input.",
      "Keep aria-checked aligned with checked.",
      "Use Switch only for persistent settings."
    ]
  },
  radioButton: {
    factory: "createRadioButton",
    element: "label",
    purpose: "Represent one option in a mutually exclusive choice set with visible label and native radio semantics.",
    variants: ["default", "descriptive", "compact", "critical"],
    intents: ["default"],
    states: ["unselected", "selected", "focus", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "error", type: "string", required: false },
      { name: "variant", type: "\"default\" | \"descriptive\" | \"compact\" | \"critical\"", required: false },
      { name: "state", type: "\"unselected\" | \"selected\" | \"focus\" | \"error\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "checked", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "name", type: "string", required: true },
      { name: "value", type: "string", required: false },
      { name: "required", type: "boolean", required: false }
    ],
    accessibility: [
      "Use native radio input semantics.",
      "Keep each option visibly labeled.",
      "Group-level selection logic belongs to a form pattern unless a Radio Group component is explicitly approved."
    ]
  },
  textArea: {
    factory: "createTextArea",
    element: "label",
    purpose: "Capture multi-line text with visible label, optional helper, and native textarea behavior.",
    variants: ["default"],
    intents: ["default"],
    states: ["default", "focus", "filled", "loading", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "helper", type: "string", required: false },
      { name: "helperText", type: "string", required: false },
      { name: "error", type: "string", required: false },
      { name: "value", type: "string", required: false },
      { name: "name", type: "string", required: false },
      { name: "placeholder", type: "string", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "loading", type: "boolean", required: false },
      { name: "required", type: "boolean", required: false },
      { name: "rows", type: "number", required: false },
      { name: "maxLength", type: "number", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "state", type: "\"default\" | \"focus\" | \"filled\" | \"loading\" | \"error\" | \"disabled\"", required: false },
      { name: "onChange", type: "(value: string) => void", required: false }
    ],
    accessibility: [
      "Keep the visible label associated with the textarea.",
      "Use helper text for guidance, not as the only label.",
      "Associate helper, error, and character counter with aria-describedby.",
      "Expose error through aria-invalid when recovery is required.",
      "Preserve native multiline keyboard behavior."
    ]
  },
  badge: {
    factory: "createBadge",
    element: "span",
    purpose: "Show compact status, count, or metadata that remains readable without relying on color alone.",
    variants: ["count", "dot", "status", "icon"],
    intents: ["info", "success", "warning", "danger", "neutral", "accent"],
    states: ["default", "hover", "focus", "overflow", "hidden", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "tone", type: "\"neutral\" | \"info\" | \"success\" | \"warning\" | \"danger\" | \"accent\"", required: false },
      { name: "variant", type: "\"count\" | \"dot\" | \"status\" | \"icon\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"overflow\" | \"hidden\" | \"disabled\"", required: false },
      { name: "hidden", type: "boolean", required: false },
      { name: "live", type: "boolean", required: false },
      { name: "icon", type: "IconName", required: false },
      { name: "ariaLabel", type: "string", required: false }
    ],
    accessibility: [
      "Use readable text inside the badge.",
      "Use aria-label when compact text needs expansion.",
      "Use live region behavior only for meaningful dynamic updates."
    ]
  },
  chip: {
    factory: "createChip",
    element: "span | button",
    purpose: "Show a compact selected filter, token, or removable value with visible label and optional interaction state.",
    variants: ["filter", "input", "suggestion", "assist"],
    intents: ["default", "danger", "warning"],
    states: ["default", "hover", "pressed", "selected", "focus", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "variant", type: "filter | input | suggestion | assist", required: false },
      { name: "tone", type: "default | danger | warning", required: false },
      { name: "state", type: "default | hover | pressed | selected | focus | disabled", required: false },
      { name: "selected", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "removable", type: "boolean", required: false },
      { name: "icon", type: "string", required: false },
      { name: "interactive", type: "boolean", required: false },
      { name: "onRemoveLabel", type: "string", required: false }
    ],
    accessibility: [
      "Expose interactive chips as buttons.",
      "Use aria-pressed when selected.",
      "Provide a remove label when the chip removes a value."
    ]
  },
  tag: {
    factory: "createTag",
    element: "span | button",
    purpose: "Show compact metadata or optional metadata action with stable tone, icon, and label.",
    variants: ["metadata", "status", "platform", "link"],
    intents: ["neutral", "info", "success", "warning", "danger"],
    states: ["default", "hover", "pressed", "focus", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "variant", type: "TagVariant", required: false },
      { name: "tone", type: "\"neutral\" | \"info\" | \"success\" | \"warning\" | \"danger\"", required: false },
      { name: "state", type: "TagState", required: false },
      { name: "icon", type: "string", required: false },
      { name: "interactive", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false }
    ],
    accessibility: [
      "Keep metadata readable as text.",
      "Hide decorative icons from assistive technology.",
      "Use button semantics only when the tag performs an action."
    ]
  },
  tabs: {
    factory: "createTabs",
    element: "div",
    purpose: "Switch between sibling views inside one bounded region with tablist, tab selection, and keyboard-ready semantics.",
    variants: ["default", "underline"],
    intents: ["default"],
    states: ["default", "hover", "selected", "focus", "overflow", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "items", type: "Array<{ key?: string, value?: string, label: string, icon?: string, count?: number, badge?: BadgeProps, disabled?: boolean }>", required: true },
      { name: "selectedKey", type: "string", required: false },
      { name: "onValueChange", type: "(key: string) => void", required: false },
      { name: "variant", type: "\"default\" | \"underline\"", required: false }
    ],
    accessibility: [
      "Use role tablist and role tab.",
      "Expose selected state with aria-selected.",
      "Keep roving tab index aligned with selection."
    ]
  },
  tooltip: {
    factory: "createTooltip",
    element: "span",
    purpose: "Expose short contextual help from a trigger without adding interactive content to the bubble.",
    variants: ["default", "icon-help", "metric", "disabled-help"],
    intents: ["neutral", "info"],
    states: ["default", "hover", "focus", "open", "disabled", "dismissed"],
    props: [
      { name: "triggerLabel", type: "string", required: true },
      { name: "content", type: "string", required: true },
      { name: "id", type: "string", required: false },
      { name: "placement", type: "\"top\" | \"right\" | \"bottom\" | \"left\"", required: false },
      { name: "variant", type: "\"default\" | \"icon-help\" | \"metric\" | \"disabled-help\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"open\" | \"disabled\" | \"dismissed\"", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "onOpenChange", type: "(open: boolean) => void", required: false }
    ],
    accessibility: [
      "Connect trigger and bubble with aria-describedby.",
      "Use role tooltip on the bubble.",
      "Keep tooltip copy short and non-interactive."
    ]
  },
  toast: {
    factory: "createToast",
    element: "article",
    purpose: "Show non-blocking feedback with status or alert semantics, concise copy, and optional single action.",
    variants: ["status", "progress", "warning", "recovery", "undo"],
    intents: ["neutral", "info", "success", "warning", "danger"],
    states: ["default", "visible", "action", "stacked", "exiting"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "tone", type: "\"neutral\" | \"info\" | \"success\" | \"warning\" | \"danger\"", required: false },
      { name: "variant", type: "\"status\" | \"progress\" | \"warning\" | \"recovery\" | \"undo\"", required: false },
      { name: "state", type: "\"default\" | \"visible\" | \"action\" | \"stacked\" | \"exiting\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "icon", type: "string", required: false },
      { name: "actionLabel", type: "string", required: false },
      { name: "dismissible", type: "boolean", required: false }
    ],
    accessibility: [
      "Use status for neutral feedback and alert for warning or danger.",
      "Keep feedback concise.",
      "Expose at most one action inside a toast."
    ]
  },
  progressIndicator: {
    factory: "createProgressIndicator",
    element: "div",
    purpose: "Communicate visible system progress with determinate or indeterminate linear progressbar semantics; compact circular waiting belongs to Spinner.",
    variants: ["linear", "indeterminate"],
    intents: ["accent", "success", "warning", "danger", "ink"],
    states: ["default", "active", "indeterminate", "paused", "complete", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "value", type: "number", required: false },
      { name: "max", type: "number", required: false },
      { name: "indeterminate", type: "boolean", required: false },
      { name: "showValue", type: "boolean", required: false },
      { name: "tone", type: "\"accent\" | \"success\" | \"warning\" | \"danger\" | \"ink\"", required: false },
      { name: "state", type: "\"default\" | \"active\" | \"indeterminate\" | \"paused\" | \"complete\" | \"error\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\"", required: false },
      { name: "fullWidth", type: "boolean", required: false }
    ],
    accessibility: [
      "Use role progressbar.",
      "Expose aria-valuenow only for determinate progress.",
      "Keep visual percentage aligned with value and max.",
      "Do not render circular loading UI; use Spinner for compact unknown waits."
    ]
  },
  spinner: {
    factory: "createSpinner",
    element: "span",
    purpose: "Indicate compact indeterminate loading without implying progress value.",
    variants: ["circular"],
    intents: ["accent", "ink", "success", "warning", "danger"],
    states: ["default", "loading", "decorative", "subtle", "disabled"],
    props: [
      { name: "label", type: "string", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "tone", type: "\"accent\" | \"ink\" | \"success\" | \"warning\" | \"danger\"", required: false },
      { name: "state", type: "\"default\" | \"loading\" | \"decorative\" | \"subtle\" | \"disabled\"", required: false },
      { name: "decorative", type: "boolean", required: false }
    ],
    accessibility: [
      "Use role status when spinner announces loading.",
      "Use aria-hidden when spinner is decorative inside a labeled loading control.",
      "Do not expose progressbar values."
    ]
  },
  accordion: {
    factory: "createAccordion",
    element: "div",
    purpose: "Reveal and hide bounded content sections without owning the surrounding process.",
    variants: ["single", "multiple"],
    intents: ["default"],
    states: ["closed", "open", "disabled"],
    props: [
      { name: "items", type: "Array<{ title: string, content: string | Node, open?: boolean, icon?: string, meta?: string, disabled?: boolean }>", required: true },
      { name: "multiple", type: "boolean", required: false },
      { name: "onExpandedChange", type: "(expandedIds: string[]) => void", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "variant", type: "\"single\" | \"multiple\"", required: false }
    ],
    accessibility: [
      "Use buttons for section triggers.",
      "Connect triggers and panels with aria-controls and aria-labelledby.",
      "Expose open state with aria-expanded."
    ]
  },
  slider: {
    factory: "createSlider",
    element: "label",
    purpose: "Choose a numeric value from a bounded range with visible label, output, and native range semantics.",
    variants: ["continuous", "stepped", "bounded", "threshold", "paired-value"],
    intents: ["default"],
    states: ["default", "focus", "dragging", "disabled", "error", "complete"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "value", type: "number", required: false },
      { name: "min", type: "number", required: false },
      { name: "max", type: "number", required: false },
      { name: "step", type: "number", required: false },
      { name: "variant", type: "\"continuous\" | \"stepped\" | \"bounded\" | \"threshold\" | \"paired-value\"", required: false },
      { name: "state", type: "\"default\" | \"focus\" | \"dragging\" | \"disabled\" | \"error\" | \"complete\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "unit", type: "string", required: false },
      { name: "valueLabel", type: "string", required: false }
    ],
    accessibility: [
      "Use native range input semantics.",
      "Keep a visible label with the control.",
      "Show the current value when precision matters."
    ]
  },
  avatar: {
    factory: "createAvatar",
    element: "span",
    purpose: "Represent a person, actor, or system identity with initials, optional image, and optional presence status.",
    variants: ["initials", "image", "status"],
    intents: ["default"],
    states: ["default", "online", "busy", "offline", "disabled", "unknown"],
    props: [
      { name: "name", type: "string", required: true },
      { name: "src", type: "string", required: false },
      { name: "size", type: "\"sm\" | \"md\" | \"lg\" | \"xl\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\" | \"xl\"", required: false },
      { name: "status", type: "\"none\" | \"online\" | \"busy\" | \"offline\"", required: false },
      { name: "state", type: "\"default\" | \"disabled\" | \"unknown\"", required: false },
      { name: "ariaLabel", type: "string", required: false }
    ],
    accessibility: [
      "Expose a readable identity label.",
      "Use initials only as visual fallback.",
      "Do not rely on presence color without adjacent text when status is critical."
    ]
  },
  skeleton: {
    factory: "createSkeleton",
    element: "div",
    purpose: "Indicate loading structure while content is pending without implying final content values.",
    variants: ["text", "title", "circle", "card", "pill", "row", "media", "chart", "table"],
    intents: ["default"],
    states: ["default", "loading", "stale", "paused", "loaded", "disabled"],
    props: [
      { name: "label", type: "string", required: false },
      { name: "variant", type: "\"text\" | \"title\" | \"circle\" | \"card\" | \"pill\" | \"row\" | \"media\" | \"chart\" | \"table\"", required: false },
      { name: "lines", type: "number", required: false },
      { name: "rows", type: "number", required: false },
      { name: "columns", type: "number", required: false },
      { name: "busy", type: "boolean", required: false },
      { name: "state", type: "\"default\" | \"loading\" | \"stale\" | \"paused\" | \"loaded\" | \"disabled\"", required: false },
      { name: "fullWidth", type: "boolean", required: false },
      { name: "width", type: "string | number", required: false },
      { name: "height", type: "string | number", required: false }
    ],
    accessibility: [
      "Use role status when loading state needs announcement.",
      "Expose aria-busy while content is pending.",
      "Hide decorative bones from assistive technology."
    ]
  },
  dialog: {
    factory: "createDialog",
    element: "div",
    purpose: "Mount one blocking dialog surface with trigger, modal semantics, title, description, and local actions.",
    variants: ["confirmation", "destructive", "form", "review", "success"],
    intents: ["neutral", "info", "success", "danger"],
    states: ["open", "focus", "closing", "default", "closed"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "triggerLabel", type: "string", required: false },
      { name: "actions", type: "ButtonProps[]", required: false },
      { name: "open", type: "boolean", required: false },
      { name: "tone", type: "\"neutral\" | \"info\" | \"success\" | \"danger\"", required: false },
      { name: "variant", type: "\"confirmation\" | \"destructive\" | \"form\" | \"review\" | \"success\"", required: false },
      { name: "state", type: "\"open\" | \"focus\" | \"closing\" | \"default\" | \"closed\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "icon", type: "string", required: false },
      { name: "fields", type: "InputProps[]", required: false },
      { name: "id", type: "string", required: false },
      { name: "onOpenChange", type: "(open: boolean) => void", required: false },
      { name: "onAction", type: "(key: string) => void", required: false }
    ],
    accessibility: [
      "Use role dialog and aria-modal when open.",
      "Connect title through aria-labelledby.",
      "Move focus into the dialog on open and restore it to the trigger on close.",
      "Use patterns for confirmation policy, irreversible actions, and process recovery."
    ]
  },
  menu: {
    factory: "createMenu",
    element: "span",
    purpose: "Expose one compact contextual action list anchored to a trigger.",
    variants: ["actions", "grouped", "selection", "danger", "icon-trigger"],
    intents: ["neutral", "danger"],
    states: ["default", "closed", "open", "focus", "disabled"],
    props: [
      { name: "triggerLabel", type: "string", required: true },
      { name: "items", type: "Array<{ label?: string, icon?: string, key?: string, disabled?: boolean, separator?: boolean, tone?: string, shortcut?: string }>", required: true },
      { name: "open", type: "boolean", required: false },
      { name: "variant", type: "\"actions\" | \"grouped\" | \"selection\" | \"danger\" | \"icon-trigger\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "state", type: "\"default\" | \"closed\" | \"open\" | \"focus\" | \"disabled\"", required: false },
      { name: "align", type: "\"start\" | \"end\"", required: false },
      { name: "label", type: "string", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "onOpenChange", type: "(open: boolean) => void", required: false },
      { name: "onSelect", type: "(item: MenuItem) => void", required: false }
    ],
    accessibility: [
      "Use aria-haspopup menu on the trigger.",
      "Use role menu and menuitem.",
      "Use patterns for command routing, permissions, and high-risk actions."
    ]
  },
  drawer: {
    factory: "createDrawer",
    element: "div",
    purpose: "Mount one side drawer surface with trigger, dialog semantics, header, body, and local actions.",
    variants: ["side-sheet", "filter", "detail", "edit", "review"],
    intents: ["neutral", "info", "danger"],
    states: ["closed", "default", "open", "focus", "closing"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "triggerLabel", type: "string", required: false },
      { name: "variant", type: "\"side-sheet\" | \"filter\" | \"detail\" | \"edit\" | \"review\"", required: false },
      { name: "state", type: "\"closed\" | \"default\" | \"open\" | \"focus\" | \"closing\"", required: false },
      { name: "tone", type: "\"neutral\" | \"info\" | \"danger\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "side", type: "\"left\" | \"right\"", required: false },
      { name: "fields", type: "Array<{ label: string, value?: string }>", required: false },
      { name: "actions", type: "ButtonProps[]", required: false },
      { name: "open", type: "boolean", required: false },
      { name: "id", type: "string", required: false },
      { name: "onOpenChange", type: "(open: boolean) => void", required: false },
      { name: "onAction", type: "(key: string) => void", required: false }
    ],
    accessibility: [
      "Use dialog semantics when the drawer overlays content.",
      "Keep header, body, and footer order predictable.",
      "Use patterns for edit lifecycle, validation, submit, and support handoff."
    ]
  },
  table: {
    factory: "createTable",
    element: "div",
    purpose: "Render comparable records with semantic table structure, columns, rows, row keys, and optional local sort indicators.",
    variants: ["standard", "dense", "sortable", "selectable", "expandable"],
    intents: ["data"],
    states: ["default", "hover", "focus", "selected", "sorted", "expanded"],
    props: [
      { name: "columns", type: "Array<{ key: string, label: string, sortable?: boolean, align?: string, mono?: boolean, sortValue?: Function, render?: Function }>", required: true },
      { name: "rows", type: "Array<Record<string, string | number | object>>", required: true },
      { name: "rowKey", type: "string", required: true },
      { name: "variant", type: "\"standard\" | \"dense\" | \"sortable\" | \"selectable\" | \"expandable\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"selected\" | \"sorted\" | \"expanded\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "dense", type: "boolean", required: false },
      { name: "sortKey", type: "string", required: false },
      { name: "sortDir", type: "\"ascending\" | \"descending\"", required: false },
      { name: "selectedKey", type: "string", required: false },
      { name: "expandedKey", type: "string", required: false },
      { name: "renderDetail", type: "(row: TableRow) => Node | string", required: false },
      { name: "onSortChange", type: "(sort: { key: string, direction: string }) => void", required: false },
      { name: "onRowSelect", type: "(key: string) => void", required: false },
      { name: "onExpandedChange", type: "(key: string) => void", required: false }
    ],
    accessibility: [
      "Use native table semantics.",
      "Expose aria-sort on sortable columns.",
      "Use patterns for remote data, filtering, pagination, expansion, and row processs."
    ]
  },
  biometricPrompt: {
    factory: "createBiometricPrompt",
    element: "section",
    purpose: "Show one local biometric authentication prompt with icon, copy, primary action, fallback text, and explicit state.",
    variants: ["fingerprint", "face", "passcode", "fallback"],
    intents: ["authentication"],
    states: ["default", "authenticating", "success", "warning", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "variant", type: "\"fingerprint\" | \"face\" | \"passcode\" | \"fallback\"", required: false },
      { name: "state", type: "BiometricPromptState", required: false },
      { name: "actionLabel", type: "string", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "fullWidth", type: "boolean", required: false },
      { name: "fallback", type: "string", required: true }
    ],
    accessibility: [
      "Provide visible prompt copy and an accessible group label.",
      "Keep fallback text visible.",
      "Use patterns for authentication recovery, passcode reset, and risk escalation."
    ]
  },
  treeView: {
    factory: "createTreeView",
    element: "ul",
    purpose: "Render one hierarchical navigation or selection tree with tree and treeitem semantics.",
    variants: ["standard"],
    intents: ["navigation", "selection"],
    states: ["collapsed", "expanded", "selected", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "nodes", type: "Array<{ label: string, level?: number, expanded?: boolean, selected?: boolean, disabled?: boolean }>", required: true },
      { name: "state", type: "string", required: false },
      { name: "selectedKey", type: "string", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false }
    ],
    accessibility: [
      "Use role tree and treeitem.",
      "Expose aria-level, aria-expanded, and aria-selected where applicable.",
      "Use patterns for permission editors, drag and drop, and multi-pane tree processs."
    ]
  },
  motionBoundary: {
    factory: "createMotionBoundary",
    element: "div",
    purpose: "Wrap one bounded region with explicit local motion state, variant, and reduced-motion signal.",
    variants: ["fade", "slide", "collapse", "route"],
    intents: ["motion"],
    states: ["idle", "entering", "active", "exiting", "reduced-motion", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "variant", type: "MotionBoundaryVariant", required: false },
      { name: "state", type: "MotionBoundaryState", required: false },
      { name: "reducedMotion", type: "boolean", required: false }
    ],
    accessibility: [
      "Keep a visible label for the bounded region.",
      "Expose reduced-motion state without relying on animation only.",
      "Use foundations or patterns for page choreography, route transitions, and storytelling."
    ]
  },
  animatedMoment: {
    factory: "createAnimatedMoment",
    element: "div",
    purpose: "Render one bounded animation moment with label, state, static fallback text, and no process orchestration.",
    variants: ["success", "empty", "loading", "celebration"],
    intents: ["feedback"],
    states: ["idle", "playing", "paused", "complete", "reduced-motion", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "variant", type: "AnimatedMomentVariant", required: false },
      { name: "state", type: "AnimatedMomentState", required: false },
      { name: "density", type: "sm | md | lg", required: false },
      { name: "fullWidth", type: "boolean", required: false },
      { name: "icon", type: "IconName", required: false },
      { name: "reducedMotionFallback", type: "string", required: false }
    ],
    accessibility: [
      "Provide an accessible label and visible fallback text.",
      "Respect reduced-motion state.",
      "Use patterns for onboarding, education, campaign, or multi-step animation sequences."
    ]
  },
  emptyState: {
    factory: "createEmptyState",
    element: "section",
    purpose: "Explain a bounded empty condition with title, optional description, icon, and one local action.",
    variants: ["first-use", "search-empty", "permission", "error", "maintenance"],
    intents: ["neutral"],
    states: ["default", "action", "search-empty", "permission", "loading", "error"],
    props: [
      { name: "title", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "icon", type: "string", required: false },
      { name: "action", type: "ButtonProps", required: false },
      { name: "variant", type: "\"first-use\" | \"search-empty\" | \"permission\" | \"error\" | \"maintenance\"", required: false },
      { name: "state", type: "\"default\" | \"action\" | \"search-empty\" | \"permission\" | \"loading\" | \"error\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "fullWidth", type: "boolean", required: false },
      { name: "onAction", type: "(key: string) => void", required: false }
    ],
    accessibility: [
      "Keep the empty-state title visible.",
      "Use one local action at most.",
      "Do not turn empty state into a multi-step onboarding pattern."
    ]
  },
  list: {
    factory: "createList",
    element: "ul",
    purpose: "Render a bounded collection of rows with label, metadata, optional icon, and optional value.",
    variants: ["standard", "compact", "action", "status", "media"],
    intents: ["default"],
    states: ["default", "hover", "selected", "loading", "error", "disabled"],
    props: [
      { name: "items", type: "Array<{ key?: string, label: string, meta?: string, value?: string, icon?: string, state?: string, tone?: string }>", required: true },
      { name: "variant", type: "\"standard\" | \"compact\" | \"action\" | \"status\" | \"media\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"selected\" | \"loading\" | \"error\" | \"disabled\"", required: false },
      { name: "interactive", type: "boolean", required: false },
      { name: "label", type: "string", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "onSelect", type: "(key: string) => void", required: false }
    ],
    accessibility: [
      "Use list semantics for bounded collections.",
      "Keep row labels visible.",
      "Use interactive rows only when a parent pattern owns the action."
    ]
  },
  kpiTile: {
    factory: "createKpiTile",
    element: "article",
    purpose: "Show one compact operational metric with label, value, optional delta, trend, threshold tone, sparkline hint, and optional drill-in affordance.",
    variants: ["standard", "delta", "threshold", "sparkline", "drill-in"],
    intents: ["neutral", "info", "success", "warning", "danger"],
    states: ["default", "hover", "focus", "selected", "loading", "risk", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "value", type: "string", required: true },
      { name: "delta", type: "string", required: false },
      { name: "trend", type: "\"up\" | \"down\" | \"flat\"", required: false },
      { name: "tone", type: "\"neutral\" | \"info\" | \"success\" | \"warning\" | \"danger\"", required: false },
      { name: "icon", type: "string", required: false },
      { name: "variant", type: "\"standard\" | \"delta\" | \"threshold\" | \"sparkline\" | \"drill-in\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"selected\" | \"loading\" | \"risk\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "values", type: "number[]", required: false },
      { name: "href", type: "string", required: false },
      { name: "selected", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "loading", type: "boolean", required: false },
      { name: "ariaLabel", type: "string", required: false },
      { name: "onSelect", type: "(metric: KpiTileMeta) => void", required: false }
    ],
    accessibility: [
      "Keep label and value readable as text.",
      "Do not encode trend only in color.",
      "Use button or link semantics when the tile drills in.",
      "Use dashboard patterns for metric grouping, formulas, thresholds, and cross-panel drill-down."
    ]
  },
  floatingActionButton: {
    factory: "createFloatingActionButton",
    element: "button",
    purpose: "Expose a prominent local primary action with icon-only or extended label treatment.",
    variants: ["primary", "accent", "extended", "mini"],
    intents: ["primary"],
    states: ["default", "hover", "focus", "pressed", "loading", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "icon", type: "string", required: false },
      { name: "variant", type: "\"primary\" | \"accent\" | \"extended\" | \"mini\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"pressed\" | \"loading\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "extended", type: "boolean", required: false },
      { name: "loading", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "type", type: "\"button\" | \"submit\" | \"reset\"", required: false }
    ],
    accessibility: [
      "Always expose an accessible action label.",
      "Use extended label when the icon is not universally clear.",
      "Do not use FAB for multiple competing actions."
    ]
  },
  breadcrumbs: {
    factory: "createBreadcrumbs",
    element: "nav",
    purpose: "Show the current location path inside one hierarchy without owning route architecture, side navigation, or page history.",
    variants: ["standard", "compact", "overflow", "mobile"],
    intents: ["navigation"],
    states: ["default", "hover", "focus", "collapsed", "current", "disabled"],
    props: [
      { name: "items", type: "Array<{ label: string, href?: string, current?: boolean, onClick?: Function }>", required: true },
      { name: "label", type: "string", required: false },
      { name: "maxItems", type: "number", required: false },
      { name: "separator", type: "string", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "variant", type: "\"standard\" | \"compact\" | \"overflow\" | \"mobile\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"collapsed\" | \"current\" | \"disabled\"", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "fullWidth", type: "boolean", required: false }
    ],
    accessibility: [
      "Use nav with an accessible label.",
      "Mark the current page with aria-current.",
      "Use links only for navigable ancestors.",
      "Escalate route guards, side navigation, IA, and history behavior to navigation patterns."
    ]
  },
  pagination: {
    factory: "createPagination",
    element: "nav",
    purpose: "Move through discrete pages of one bounded result set with numbered controls and ellipsis collapse.",
    variants: ["numbered"],
    intents: ["navigation"],
    states: ["default", "hover", "focus", "selected", "disabled"],
    props: [
      { name: "page", type: "number", required: true },
      { name: "pageCount", type: "number", required: true },
      { name: "label", type: "string", required: false },
      { name: "variant", type: "numbered", required: false },
      { name: "state", type: "default | hover | focus | selected | disabled", required: false },
      { name: "density", type: "sm | md | lg", required: false },
      { name: "fullWidth", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "onPageChange", type: "(page: number) => void", required: false }
    ],
    accessibility: [
      "Use nav with an accessible label.",
      "Mark the current page with aria-current.",
      "Disable unavailable previous or next actions.",
      "Use ellipsis for long page ranges without owning the data source."
    ]
  },
  auditEvent: {
    factory: "createAuditEvent",
    element: "article",
    purpose: "Represent one audit trail event with actor/action label, description, metadata, and status.",
    variants: ["standard"],
    intents: ["neutral", "info", "success", "warning", "danger", "action"],
    states: ["default", "hover", "focus", "verified", "warning", "critical", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "meta", type: "string", required: false },
      { name: "status", type: "string", required: false },
      { name: "icon", type: "string", required: false },
      { name: "tone", type: "\"neutral\" | \"info\" | \"success\" | \"warning\" | \"danger\" | \"action\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"verified\" | \"warning\" | \"critical\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "timestamp", type: "string", required: false }
    ],
    accessibility: [
      "Keep audit event text explicit.",
      "Do not rely on icon or color alone for status.",
      "Use timeline patterns for event sequencing and filtering."
    ]
  },
  errorPanel: {
    factory: "createErrorPanel",
    element: "section",
    purpose: "Show a bounded error or warning message with recovery copy and optional local action.",
    variants: ["inline", "panel", "blocking", "empty-recovery"],
    intents: ["warning", "error", "critical"],
    states: ["default", "warning", "error", "critical", "loading", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "action", type: "ButtonProps", required: false },
      { name: "tone", type: "\"warning\" | \"error\" | \"critical\"", required: false },
      { name: "variant", type: "\"inline\" | \"panel\" | \"blocking\" | \"empty-recovery\"", required: false },
      { name: "state", type: "\"default\" | \"warning\" | \"error\" | \"critical\" | \"loading\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "fullWidth", type: "boolean", required: false },
      { name: "icon", type: "string", required: false },
      { name: "onAction", type: "(key: string) => void", required: false },
      { name: "role", type: "\"status\" | \"alert\"", required: false }
    ],
    accessibility: [
      "Use alert for errors and status for warnings.",
      "Keep recovery copy visible.",
      "Use patterns for multi-step recovery processs."
    ]
  },
  inlineValidation: {
    factory: "createInlineValidation",
    element: "div",
    purpose: "Pair one field with inline validation copy and state without owning form submission.",
    variants: ["info", "success", "warning", "error"],
    intents: ["info", "success", "warning", "error"],
    states: ["default", "info", "success", "warning", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "value", type: "string", required: false },
      { name: "message", type: "string", required: false },
      { name: "state", type: "\"default\" | \"info\" | \"success\" | \"warning\" | \"error\" | \"disabled\"", required: false },
      { name: "id", type: "string", required: false },
      { name: "fullWidth", type: "boolean", required: false },
      { name: "field", type: "boolean", required: false },
      { name: "live", type: "boolean", required: false }
    ],
    accessibility: [
      "Connect message with aria-describedby.",
      "Use aria-invalid for error state.",
      "Use live=true only when validation appears after user action; error maps to alert and non-error states map to status.",
      "Keep validation copy near the field."
    ]
  },
  stepper: {
    factory: "createStepper",
    element: "ol",
    purpose: "Show local progress across a short ordered sequence without owning wizard routing, validation, recovery, or submission.",
    variants: ["horizontal", "vertical"],
    intents: ["default"],
    states: ["pending", "active", "complete"],
    props: [
      { name: "steps", type: "Array<{ label: string, description?: string }>", required: true },
      { name: "current", type: "number", required: false },
      { name: "label", type: "string", required: false },
      { name: "orientation", type: "\"horizontal\" | \"vertical\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false }
    ],
    accessibility: [
      "Use ordered list semantics.",
      "Mark the current step with aria-current.",
      "Use patterns for branching or route-owned wizards."
    ]
  },
  chartPanel: {
    factory: "createChartPanel",
    element: "article",
    purpose: "Show one compact chart summary by framing the Charts primitive with title, value, caption, ECharts option output, and read-only fallback plot.",
    variants: ["sparkline", "bars", "line", "area", "donut", "pareto", "bullet", "comparison", "compact"],
    intents: ["info"],
    states: ["default", "focus", "hover", "warning", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "value", type: "string", required: false },
      { name: "caption", type: "string", required: false },
      { name: "values", type: "number[]", required: false },
      { name: "valueLabels", type: "string[]", required: false },
      { name: "labels", type: "string[]", required: false },
      { name: "segments", type: "Array<{ label: string, value: number }>", required: false },
      { name: "series", type: "Array<{ label: string, values: number[] }>", required: false },
      { name: "comparisons", type: "Array<{ label: string, values: number[] }>", required: false },
      { name: "variant", type: "\"sparkline\" | \"bars\" | \"line\" | \"area\" | \"donut\" | \"pareto\" | \"bullet\" | \"comparison\" | \"compact\"", required: false },
      { name: "state", type: "\"default\" | \"focus\" | \"hover\" | \"warning\" | \"error\" | \"disabled\"", required: false },
      { name: "tone", type: "\"neutral\" | \"info\" | \"warning\" | \"danger\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "fullWidth", type: "boolean", required: false }
    ],
    accessibility: [
      "Expose a readable chart label through the Charts primitive textSummary.",
      "Treat decorative plot marks as hidden while preserving tableFallback and echartsOption.",
      "Hydrate with Apache ECharts when the runtime provides it; otherwise keep the accessible Flow fallback.",
      "Use chart patterns for legends, filters, and series toggles."
    ]
  },
  stationPin: {
    factory: "createStationPin",
    element: "button",
    purpose: "Represent one map station marker or cluster entry with accessible station label.",
    variants: ["fuel", "ev", "service", "cluster"],
    intents: ["map"],
    states: ["default", "hover", "focus", "selected", "unavailable", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "meta", type: "string", required: false },
      { name: "icon", type: "string", required: false },
      { name: "count", type: "number", required: false },
      { name: "variant", type: "\"fuel\" | \"ev\" | \"service\" | \"cluster\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"selected\" | \"unavailable\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "selected", type: "boolean", required: false },
      { name: "unavailable", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false }
    ],
    accessibility: [
      "Expose station name in aria-label.",
      "Do not rely on marker icon alone.",
      "Use map patterns for clustering, routing, and viewport behavior."
    ]
  },
  routeSummary: {
    factory: "createRouteSummary",
    element: "article",
    purpose: "Summarize one route option with metrics and optional local actions.",
    variants: ["standard", "compact", "compare", "policy"],
    intents: ["info", "warning"],
    states: ["default", "hover", "focus", "selected", "warning", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "metrics", type: "Array<{ label: string, value: string }>", required: false },
      { name: "actions", type: "ButtonProps[]", required: false },
      { name: "variant", type: "\"standard\" | \"compact\" | \"compare\" | \"policy\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"selected\" | \"warning\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "tone", type: "\"neutral\" | \"info\" | \"warning\"", required: false },
      { name: "icon", type: "string", required: false },
      { name: "selected", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "fullWidth", type: "boolean", required: false }
    ],
    accessibility: [
      "Keep route metrics visible as text.",
      "Use actions only for local route decisions.",
      "Use route patterns for comparison, map state, and navigation."
    ]
  },
  codeInput: {
    factory: "createCodeInput",
    element: "label",
    purpose: "Capture SMS, OTP, or approval codes through one logical input with fixed visual slots and helper text.",
    variants: ["sms", "otp", "approval", "masked", "compact"],
    intents: ["security"],
    states: ["default", "hover", "focus", "complete", "warning", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "value", type: "string", required: false },
      { name: "length", type: "number", required: false },
      { name: "variant", type: "\"sms\" | \"otp\" | \"approval\" | \"masked\" | \"compact\"", required: false },
      { name: "masked", type: "boolean", required: false },
      { name: "helper", type: "string", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "state", type: "string", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "error", type: "string", required: false },
      { name: "onValueChange", type: "(value: string) => void", required: false },
      { name: "onComplete", type: "(value: string) => void", required: false }
    ],
    accessibility: [
      "Expose one native input with one-time-code autocomplete.",
      "Keep visual slots aria-hidden so screen readers receive one code field.",
      "Keep expiry or recovery helper visible.",
      "Use auth patterns for resend, fallback, passcode keypad, and verification system."
    ]
  },
  phoneInput: {
    factory: "createPhoneInput",
    element: "label",
    purpose: "Capture a phone number with visible label, compact country selector, calling code, helper, and native tel input.",
    variants: ["country-code", "compact", "otp-handoff", "readonly"],
    intents: ["input"],
    states: ["default", "hover", "focus", "valid", "warning", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "value", type: "string", required: false },
      { name: "prefix", type: "string", required: false },
      { name: "country", type: "string", required: false },
      { name: "countries", type: "Array<{ country: string, label: string, callingCode: string, nationalLength: number }>", required: false },
      { name: "variant", type: "\"country-code\" | \"compact\" | \"otp-handoff\" | \"readonly\"", required: false },
      { name: "helper", type: "string", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "state", type: "string", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "error", type: "string", required: false },
      { name: "onValueChange", type: "(nationalNumber: string, meta: PhoneMeta) => void", required: false }
    ],
    accessibility: [
      "Use native tel input.",
      "Use Country Selector inline variant for country and calling code selection.",
      "Keep flag decorative; the country name and calling code must be available as text.",
      "Use verification patterns for OTP handoff and recovery."
    ]
  },
  countrySelector: {
    factory: "createCountrySelector",
    element: "span",
    purpose: "Choose one country with visible flag, country code, calling code, option layer, and keyboard selection.",
    variants: ["default", "inline"],
    intents: ["selection"],
    states: ["default", "open", "focus", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: false },
      { name: "value", type: "string", required: false },
      { name: "country", type: "string", required: false },
      { name: "countries", type: "Array<{ country: string, label: string, callingCode: string, nationalLength: number }>", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "invalid", type: "boolean", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "inline", type: "boolean", required: false },
      { name: "searchable", type: "boolean", required: false },
      { name: "searchPlaceholder", type: "string", required: false },
      { name: "onValueChange", type: "(countryCode: string, country: CountryMeta) => void", required: false }
    ],
    accessibility: [
      "Expose combobox/listbox semantics with aria-expanded, aria-controls, and aria-activedescendant.",
      "Keep country label and calling code available as text in every option.",
      "Treat the flag as decorative support, not the only country signal.",
      "Use inline variant only when composed inside another field such as Phone Input."
    ]
  },
  datePicker: {
    factory: "createDatePicker",
    element: "div",
    purpose: "Capture one operational date with visible label, readable selected value, calendar affordance, locale rules, disabled dates, and validation states.",
    variants: ["calendar"],
    intents: ["input"],
    states: ["default", "hover", "focus", "selected", "warning", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "value", type: "string", required: false },
      { name: "placeholder", type: "string", required: false },
      { name: "helper", type: "string", required: false },
      { name: "error", type: "string", required: false },
      { name: "min", type: "string", required: false },
      { name: "max", type: "string", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"selected\" | \"warning\" | \"error\" | \"disabled\"", required: false },
      { name: "invalid", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "onValueChange", type: "(value: string) => void", required: false },
      { name: "onOpenChange", type: "(open: boolean) => void", required: false }
    ],
    accessibility: [
      "Expose label, selected date, dialog state, and disabled dates.",
      "Keep the selected date visible as text.",
      "Support keyboard entry, keyboard day selection, month navigation, and native date input fallback.",
      "Use date range and scheduling patterns for composed calendar processes."
    ]
  },
  dateRangePicker: {
    factory: "createDateRangePicker",
    element: "div",
    purpose: "Capture one bounded start/end date range with visible label, readable range value, local presets, calendar surface, and keyboard selection.",
    variants: ["calendar-range"],
    intents: ["input"],
    states: ["default", "hover", "focus", "selected", "warning", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "value", type: "{ from?: string; to?: string }", required: false },
      { name: "from", type: "string", required: false },
      { name: "to", type: "string", required: false },
      { name: "placeholder", type: "string", required: false },
      { name: "helper", type: "string", required: false },
      { name: "error", type: "string", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"selected\" | \"warning\" | \"error\" | \"disabled\"", required: false },
      { name: "invalid", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "presets", type: "boolean", required: false },
      { name: "presetItems", type: "Array<{ label: string; days: number }>", required: false },
      { name: "onValueChange", type: "(range: { from?: string; to?: string }) => void", required: false },
      { name: "onOpenChange", type: "(open: boolean) => void", required: false }
    ],
    accessibility: [
      "Expose label, selected start/end dates, dialog state, and grid day semantics.",
      "Keep the selected range visible as text.",
      "Support keyboard opening, day selection, month navigation, and Escape close.",
      "Escalate reporting sync, comparison windows, URL persistence, and data refresh to patterns."
    ]
  },
  segmentedControl: {
    factory: "createSegmentedControl",
    element: "div",
    purpose: "Switch between a small set of local mutually exclusive modes.",
    variants: ["outlined", "toolbar", "compact", "icon-only"],
    intents: ["selection"],
    states: ["default", "hover", "focus", "selected", "warning", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "items", type: "Array<{ key?: string, value?: string, label: string, icon?: string }>", required: true },
      { name: "selectedKey", type: "string", required: false },
      { name: "onValueChange", type: "(key: string) => void", required: false },
      { name: "variant", type: "\"outlined\" | \"toolbar\" | \"compact\" | \"icon-only\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false }
    ],
    accessibility: [
      "Use tablist semantics for mode selection.",
      "Expose selected state with aria-selected.",
      "Keep the option count small and local."
    ]
  },
  popover: {
    factory: "createPopover",
    element: "span",
    purpose: "Attach a small contextual dialog to one trigger without owning broader process state.",
    variants: ["information", "action", "form", "metric"],
    intents: ["contextual"],
    states: ["closed", "open", "hover", "focus", "warning", "disabled"],
    props: [
      { name: "triggerLabel", type: "string", required: true },
      { name: "title", type: "string", required: true },
      { name: "description", type: "string", required: false },
      { name: "id", type: "string", required: false },
      { name: "variant", type: "\"information\" | \"action\" | \"form\" | \"metric\"", required: false },
      { name: "state", type: "\"closed\" | \"open\" | \"hover\" | \"focus\" | \"warning\" | \"disabled\"", required: false },
      { name: "placement", type: "\"top\" | \"right\" | \"bottom\" | \"left\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "fullWidth", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "actions", type: "Array<{ label: string, variant?: string, key?: string }>", required: false },
      { name: "field", type: "{ label?: string, value?: string, placeholder?: string, helper?: string }", required: false },
      { name: "onOpenChange", type: "(open: boolean) => void", required: false },
      { name: "onAction", type: "(key: string) => void", required: false }
    ],
    accessibility: [
      "Expose dialog relationship with aria-haspopup and aria-controls.",
      "Keep panel content short and contextual.",
      "Use patterns for multi-step decisions inside a popover."
    ]
  },
  cardSummary: {
    factory: "createCardSummary",
    element: "article",
    purpose: "Summarize one card with identity metadata, masked number, status, and compact metrics.",
    variants: ["physical", "virtual", "compact", "limit"],
    intents: ["summary"],
    states: ["default", "hover", "focus", "active", "warning", "frozen", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "meta", type: "string", required: false },
      { name: "number", type: "string", required: false },
      { name: "expires", type: "string", required: false },
      { name: "status", type: "string", required: false },
      { name: "metrics", type: "Array<{ label: string, value: string }>", required: false },
      { name: "variant", type: "\"physical\" | \"virtual\" | \"compact\" | \"limit\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"active\" | \"warning\" | \"frozen\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "icon", type: "string", required: false },
      { name: "fullWidth", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false }
    ],
    accessibility: [
      "Keep card identity and status visible.",
      "Use masked values for card numbers.",
      "Use card management patterns for lifecycle actions."
    ]
  },
  movementRow: {
    factory: "createMovementRow",
    element: "button",
    purpose: "Represent one movement row with label, metadata, amount, and status.",
    variants: ["standard", "refund", "declined", "compact"],
    intents: ["row-action"],
    states: ["default", "hover", "focus", "pending", "error", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "meta", type: "string", required: false },
      { name: "amount", type: "string", required: false },
      { name: "status", type: "string", required: false },
      { name: "category", type: "\"fuel\" | \"charge\" | \"toll\" | \"food\" | \"transfer\" | \"income\"", required: false },
      { name: "variant", type: "\"standard\" | \"refund\" | \"declined\" | \"compact\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"pending\" | \"error\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "fullWidth", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false }
    ],
    accessibility: [
      "Expose the row as a button only when it opens local detail.",
      "Keep amount and status visible as text.",
      "Use movement detail patterns for receipts, disputes, and support."
    ]
  },
  quickAction: {
    factory: "createQuickAction",
    element: "div",
    purpose: "Expose one compact local action with optional icon, badge, variant, state, and density without becoming a grouped actions pattern.",
    variants: ["standard", "destructive", "compact", "wide"],
    intents: ["action"],
    states: ["default", "hover", "focus", "pressed", "loading", "warning", "disabled"],
    props: [
      { name: "label", type: "string", required: true },
      { name: "icon", type: "string", required: false },
      { name: "badge", type: "string", required: false },
      { name: "variant", type: "\"standard\" | \"destructive\" | \"compact\" | \"wide\"", required: false },
      { name: "state", type: "\"default\" | \"hover\" | \"focus\" | \"pressed\" | \"loading\" | \"warning\" | \"disabled\"", required: false },
      { name: "density", type: "\"sm\" | \"md\" | \"lg\"", required: false },
      { name: "loading", type: "boolean", required: false },
      { name: "disabled", type: "boolean", required: false },
      { name: "tone", type: "\"neutral\" | \"danger\"", required: false }
    ],
    accessibility: [
      "Keep the action label visible.",
      "Hide decorative icons from assistive technology.",
      "Expose loading with aria-busy.",
      "Use confirmation patterns for destructive or high-risk actions."
    ]
  }
};

export const componentContractVersion = "0.1.0";
