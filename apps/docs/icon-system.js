let collectionIcons = {};

export function configureIconSystem(options = {}) {
  collectionIcons = options.collectionIcons ?? {};
}

export function icon(name, options = {}) {
  const symbol = iconGlyph(name);
  const tone = options.tone ?? "default";
  const size = options.size ?? "md";
  const fill = options.fill ? "true" : "false";
  const label = options.label ? ` role="img" aria-label="${escapeAttribute(options.label)}"` : ` aria-hidden="true"`;
  return `<span class="material-symbol" data-icon="${escapeAttribute(name)}" data-icon-tone="${tone}" data-icon-size="${size}" data-icon-fill="${fill}"${label}>${symbol}</span>`;
}

export function iconGlyph(name) {
  return materialSymbolName(name);
}

function escapeAttribute(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function materialSymbolName(name) {
  const aliases = {
    dialogs: "dialogs",
    popover: "select_window",
    passkey: "passkey",
    foundation: "foundation",
    token: "token",
    widgets: "widgets",
    conversion_path: "conversion_path",
    record_voice_over: "record_voice_over",
    emoji_symbols: "interests",
    animation: "animation",
    moving: "moving",
    responsive_layout: "responsive_layout",
    density_medium: "density_medium",
    center_focus_strong: "center_focus_strong",
    bottom_panel_open: "bottom_panel_open",
    transition_slide: "transition_slide",
    notification_important: "notification_important",
    admin_panel_settings: "admin_panel_settings",
    local_shipping: "local_shipping",
    manage_history: "manage_history",
    dashboard_customize: "dashboard_customize",
    deployed_code: "deployed_code",
    account_balance_wallet: "account_balance_wallet",
    local_gas_station: "local_gas_station",
    menu_open: "keyboard_arrow_down",
    insert_chart: "insert_chart",
    select_window: "select_window",
    stack: "stacks",
    title: "title",
    map: "map",
    table: "table",
    route: "route",
    build: "build",
    warning: "warning",
    error: "error",
    toast: "notifications",
    inbox: "inbox",
    pin: "push_pin",
    speed: "speed",
    alt_route: "alt_route",
    hive: "hive",
  };
  return aliases[name] ?? name;
}

export function collectionIcon(collection) {
  return collectionIcons[collection] ?? "view_quilt";
}

export function tabIcon(tab) {
  const icons = {
    overview: "info",
    design: "palette",
    build: "build",
    miel: "hive",
    "variants-states": "tune",
  };
  return icons[tab.id] ?? "segment";
}

export function iconFor(entry) {
  const exact = {
    Tone: "record_voice_over",
    Voice: "chat_bubble",
    Frame: "select_window",
    Energy: "bolt",
    Growth: "timeline",
    Symbol: "emoji_symbols",
    Motion: "animation",
    Depth: "layers",
    Accessibility: "accessibility_new",
    Color: "palette",
    Typography: "title",
    Spacing: "space_bar",
    Radius: "rounded_corner",
    Elevation: "stack",
    Iconography: "interests",
    "Motion Curves": "moving",
    Duration: "timer",
    Breakpoints: "responsive_layout",
    Density: "density_medium",
    Focus: "center_focus_strong",
    Loading: "progress_activity",
    Disabled: "block",
    Charts: "insert_chart",
    Maps: "map",
    Button: "check_circle",
    "Icon Button": "touch_app",
    "Input": "edit",
    "Code Input": "pin",
    "Biometric Prompt": "fingerprint",
    "Floating Action Button": "add",
    "Segmented Control": "tune",
    Checkbox: "checklist",
    "Checkbox Group": "checklist",
    "Radio Button": "radio_button_checked",
    "Radio Group": "radio_button_checked",
    Switch: "toggle_on",
    Select: "menu_open",
    Slider: "tune",
    "Text Area": "edit",
    "Phone Input": "phone_iphone",
    "Date Picker": "calendar_month",
    "Date Range Picker": "date_range",
    "Bottom Sheet": "bottom_panel_open",
    "Quick Action": "touch_app",
    "Card Summary": "credit_card",
    "Movement Row": "receipt_long",
    "Movement Detail": "request_quote",
    "Station Pin": "local_gas_station",
    "Station Detail Panel": "storefront",
    "Route Summary": "alt_route",
    Breadcrumbs: "account_tree",
    Tabs: "view_quilt",
    Pagination: "more_horiz",
    Stepper: "timeline",
    "KPI Tile": "speed",
    "Chart Panel": "bar_chart",
    "Dashboard Filter Bar": "filter_alt",
    "Data Table": "table",
    "Alert Strip": "notification_important",
    "Permission Matrix": "admin_panel_settings",
    "Driver Management Table": "badge",
    "Vehicle Management Table": "local_shipping",
    "Audit Event": "manage_history",
    Toast: "toast",
    "Empty State": "inbox",
    "Error Panel": "error",
    Skeleton: "density_medium",
    "Progress Bar": "progress_activity",
    "Circular Progress": "progress_activity",
    "Inline Validation": "error",
    Tooltip: "tooltip",
    Dialog: "dialogs",
    Menu: "menu_open",
    Popover: "popover",
    Accordion: "unfold_more",
    List: "list",
    Chip: "sell",
    Tag: "sell",
    Badge: "new_releases",
    Avatar: "person",
    "Avatar Group": "group",
    "Tree View": "account_tree",
    "Sort Control": "sort",
    "Chart Legend Item": "legend_toggle",
    "Animated Moment": "auto_awesome_motion",
    "Motion Boundary": "transition_slide",
    "Driver Mobile App": "phone_iphone",
    "Fleet Manager Desktop": "desktop_windows",
    "Driver Card Wallet": "account_balance_wallet",
    "Routes and Stations": "near_me",
    "Fleet Dashboard Suite": "dashboard_customize",
    "Configuration Console": "settings",
  };
  if (exact[entry.title]) return exact[entry.title];
  const map = {
    foundation: "foundation",
    primitive: "token",
    component: "widgets",
    pattern: "conversion_path",
    template: "view_quilt",
  };
  if (entry.title.includes("Route") || entry.title.includes("Station")) return "map";
  if (entry.title.includes("Dashboard")) return "monitoring";
  if (entry.title.includes("Authentication") || entry.title.includes("OTP")) return "passkey";
  if (entry.title.includes("Card")) return "credit_card";
  if (entry.title.includes("Vehicle") || entry.title.includes("Fleet")) return "local_shipping";
  return map[entry.type] ?? "category";
}
