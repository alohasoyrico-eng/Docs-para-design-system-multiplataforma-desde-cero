import { createCountryFlag } from "../primitives/country-flags.js?v=4";
import { createFieldAction } from "../primitives/field-actions.js?v=2";
import { setIconGlyph } from "../primitives/iconography.js?v=1";
import {
  appendFieldHelper,
  createFieldShell,
  createFieldSurface,
  resolveFieldState,
} from "./fields.js?v=18";
import { createSpinner } from "./feedback.js?v=8";

let codeInputId = 0;
let phoneInputId = 0;
let countrySelectorId = 0;
let datePickerId = 0;
let dateRangePickerId = 0;
let cardNumberInputId = 0;
let cardExpiryInputId = 0;
let cardSecurityCodeInputId = 0;

const phoneCountries = Object.freeze([
  { country: "AR", label: "Argentina", callingCode: "+54", nationalLength: 10 },
  { country: "BR", label: "Brazil", callingCode: "+55", nationalLength: 11 },
  { country: "CL", label: "Chile", callingCode: "+56", nationalLength: 9 },
  { country: "CO", label: "Colombia", callingCode: "+57", nationalLength: 10 },
  { country: "MX", label: "Mexico", callingCode: "+52", nationalLength: 10 },
  { country: "PE", label: "Peru", callingCode: "+51", nationalLength: 9 },
  { country: "ES", label: "Spain", callingCode: "+34", nationalLength: 9 },
  { country: "US", label: "United States", callingCode: "+1", nationalLength: 10 },
  { country: "CA", label: "Canada", callingCode: "+1", nationalLength: 10 },
  { country: "CU", label: "Cuba", callingCode: "+53", nationalLength: 8 },
]);

function addClassName(node, className) {
  if (!node || !className) return;
  const current = String(node.className ?? "").split(/\s+/).filter(Boolean);
  if (!current.includes(className)) current.push(className);
  node.className = current.join(" ");
}

function createFieldLoadingSpinner(label) {
  const loadingNode = createSpinner({ label, density: "sm", decorative: true });
  loadingNode.className = `${loadingNode.className} field__icon field__icon--loading`;
  loadingNode.setAttribute("aria-hidden", "true");
  return loadingNode;
}

function resolvePhoneCountry({ country, prefix } = {}) {
  const countryCode = String(country ?? "").toUpperCase();
  return phoneCountries.find((item) => item.country === countryCode)
    ?? phoneCountries.find((item) => item.callingCode === prefix)
    ?? phoneCountries[0];
}

function parsePhoneValue(value, initialCountry, countryList = phoneCountries) {
  const raw = String(value ?? "").trim();
  const international = raw.match(/^\+(\d{1,3})/);
  if (!international) return { country: initialCountry, digits: raw.replace(/\D/g, "").slice(0, initialCountry.nationalLength) };
  const withPlus = `+${international[1]}`;
  const matched = countryList.find((item) => withPlus.startsWith(item.callingCode)) ?? initialCountry;
  return {
    country: matched,
    digits: raw.slice(matched.callingCode.length).replace(/\D/g, "").slice(0, matched.nationalLength),
  };
}

function normalizeCardNumber(value) {
  return String(value ?? "").replace(/\D/g, "").slice(0, 19);
}

function formatCardNumber(value) {
  return normalizeCardNumber(value).replace(/(.{4})/g, "$1 ").trim();
}

function isCardNumberLuhnValid(digits) {
  const value = normalizeCardNumber(digits);
  if (value.length < 12) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let index = value.length - 1; index >= 0; index -= 1) {
    let digit = Number(value[index]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function cardNumberValidity(digits) {
  const value = normalizeCardNumber(digits);
  if (!value) return "empty";
  if (value.length < 12) return "incomplete";
  return isCardNumberLuhnValid(value) ? "valid" : "invalid";
}

function cardNumberBrand(digits) {
  const value = normalizeCardNumber(digits);
  if (/^4/.test(value)) return "Visa";
  if (/^5[1-5]/.test(value) || /^2(2[2-9]|[3-6]|7[01]|720)/.test(value)) return "Mastercard";
  if (/^3[47]/.test(value)) return "American Express";
  return "";
}

function removeNodeAttribute(node, name) {
  node?.removeAttribute?.(name);
  if (node?.attributes && Object.prototype.hasOwnProperty.call(node.attributes, name)) delete node.attributes[name];
}

function nodeAttribute(node, name) {
  const value = node?.getAttribute?.(name);
  if (value != null) return value;
  const attribute = node?.attributes?.[name];
  return typeof attribute === "object" && attribute !== null && "value" in attribute ? attribute.value : attribute;
}

function normalizeCardExpiry(value) {
  return String(value ?? "").replace(/\D/g, "").slice(0, 4);
}

function formatCardExpiry(value) {
  const digits = normalizeCardExpiry(value);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function parseCardExpiry(value) {
  const digits = normalizeCardExpiry(value);
  if (digits.length < 4) return { digits, month: "", year: "" };
  return { digits, month: digits.slice(0, 2), year: digits.slice(2, 4) };
}

function cardExpiryValidity(value, now = new Date()) {
  const { digits, month, year } = parseCardExpiry(value);
  if (!digits) return "empty";
  if (digits.length < 4) return "incomplete";
  const monthNumber = Number(month);
  if (monthNumber < 1 || monthNumber > 12) return "invalid";
  const yearNumber = 2000 + Number(year);
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  if (yearNumber < currentYear || (yearNumber === currentYear && monthNumber < currentMonth)) return "expired";
  return "valid";
}

function normalizeCardSecurityCode(value, maxLength = 4) {
  return String(value ?? "").replace(/\D/g, "").slice(0, maxLength);
}

function cardSecurityCodeValidity(value, expectedLength = 3) {
  const maxLength = expectedLength === 4 ? 4 : 3;
  const digits = normalizeCardSecurityCode(value, maxLength);
  if (!digits) return "empty";
  if (digits.length < expectedLength) return "incomplete";
  return digits.length === expectedLength ? "valid" : "invalid";
}

export function hydrateCardNumberInput(root, { onValueChange } = {}) {
  if (!root || root.__cardNumberHydrated === true) return root;
  const input = root.querySelector?.("[data-card-number-input]")
    ?? Array.from(root.querySelectorAll?.("input") ?? []).find((node) => node.attributes?.["data-card-number-input"] !== undefined);
  if (!input) return root;
  root.__cardNumberHydrated = true;
  root.dataset.cardNumberHydrated = "true";
  const helper = root.querySelector?.("[data-card-number-helper]")
    ?? root.querySelector?.(".card-number-input__helper")
    ?? root.querySelector?.(".field__helper")
    ?? Array.from(root.querySelectorAll?.("*") ?? []).find((node) => node.attributes?.["data-card-number-helper"] !== undefined);
  const defaultHelper = root.dataset.defaultHelper ?? helper?.textContent ?? "";
  const brandNode = root.querySelector?.("[data-card-number-brand]")
    ?? root.querySelector?.(".card-number-input__brand");
  const validationMessage = root.dataset.validationMessage || "Check the card number.";
  const sync = () => {
    const digits = normalizeCardNumber(input.value);
    const formatted = formatCardNumber(digits);
    if (input.value !== formatted) input.value = formatted;
    input.setAttribute?.("value", formatted);
    const validity = cardNumberValidity(digits);
    const brand = cardNumberBrand(digits);
    root.dataset.validity = validity;
    root.dataset.brand = brand;
    if (brandNode) {
      brandNode.textContent = brand;
      brandNode.hidden = !brand;
    }
    if (root.dataset.errorLocked === "true") {
      root.dataset.state = "error";
      input.setAttribute?.("aria-invalid", "true");
      if (helper) helper.textContent = defaultHelper || validationMessage;
      helper?.setAttribute?.("role", "alert");
    } else if (validity === "invalid") {
      root.dataset.state = "error";
      input.setAttribute?.("aria-invalid", "true");
      if (helper) helper.textContent = validationMessage;
      helper?.setAttribute?.("role", "alert");
    } else {
      if (!root.dataset.errorLocked) root.dataset.state = validity === "valid" ? "valid" : digits ? "filled" : "default";
      removeNodeAttribute(input, "aria-invalid");
      if (helper) helper.textContent = defaultHelper;
      removeNodeAttribute(helper, "role");
    }
    if (typeof onValueChange === "function") onValueChange(digits, { formatted, validity, brand, luhnValid: validity === "valid" });
  };
  input.addEventListener?.("input", sync);
  sync();
  return root;
}

export function hydrateCardExpiryInput(root, { onValueChange } = {}) {
  if (!root || root.__cardExpiryHydrated === true) return root;
  const input = root.querySelector?.("[data-card-expiry-input]")
    ?? Array.from(root.querySelectorAll?.("input") ?? []).find((node) => node.attributes?.["data-card-expiry-input"] !== undefined);
  if (!input) return root;
  root.__cardExpiryHydrated = true;
  root.dataset.cardExpiryHydrated = "true";
  const helper = root.querySelector?.("[data-card-expiry-helper]")
    ?? root.querySelector?.(".card-expiry-input__helper")
    ?? root.querySelector?.(".field__helper");
  const defaultHelper = root.dataset.defaultHelper ?? helper?.textContent ?? "";
  const validationMessage = root.dataset.validationMessage || "Check the expiry date.";
  const expiredMessage = root.dataset.expiredMessage || "Use a card that has not expired.";
  const sync = () => {
    const digits = normalizeCardExpiry(input.value);
    const formatted = formatCardExpiry(digits);
    if (input.value !== formatted) input.value = formatted;
    input.setAttribute?.("value", formatted);
    const validity = cardExpiryValidity(digits);
    const { month, year } = parseCardExpiry(digits);
    root.dataset.validity = validity;
    root.dataset.month = month;
    root.dataset.year = year;
    if (root.dataset.errorLocked === "true") {
      root.dataset.state = "error";
      input.setAttribute?.("aria-invalid", "true");
      if (helper) helper.textContent = defaultHelper || validationMessage;
      helper?.setAttribute?.("role", "alert");
    } else if (validity === "invalid" || validity === "expired") {
      root.dataset.state = "error";
      input.setAttribute?.("aria-invalid", "true");
      if (helper) helper.textContent = validity === "expired" ? expiredMessage : validationMessage;
      helper?.setAttribute?.("role", "alert");
    } else {
      if (!root.dataset.errorLocked) root.dataset.state = validity === "valid" ? "valid" : digits ? "filled" : "default";
      removeNodeAttribute(input, "aria-invalid");
      if (helper) helper.textContent = defaultHelper;
      removeNodeAttribute(helper, "role");
    }
    if (typeof onValueChange === "function") onValueChange(formatted, { digits, month, year, validity, expired: validity === "expired" });
  };
  input.addEventListener?.("input", sync);
  sync();
  return root;
}

export function hydrateCardSecurityCodeInput(root, { onValueChange } = {}) {
  if (!root || root.__cardSecurityCodeHydrated === true) return root;
  const input = root.querySelector?.("[data-card-security-code-input]")
    ?? Array.from(root.querySelectorAll?.("input") ?? []).find((node) => node.attributes?.["data-card-security-code-input"] !== undefined);
  if (!input) return root;
  root.__cardSecurityCodeHydrated = true;
  root.dataset.cardSecurityCodeHydrated = "true";
  const helper = root.querySelector?.("[data-card-security-code-helper]")
    ?? root.querySelector?.(".card-security-code-input__helper")
    ?? root.querySelector?.(".field__helper");
  const reveal = root.querySelector?.("[data-card-security-code-reveal]")
    ?? Array.from(root.querySelectorAll?.("button") ?? []).find((node) => node.attributes?.["data-card-security-code-reveal"] !== undefined || node.dataset?.cardSecurityCodeReveal !== undefined);
  const revealIcon = reveal?.querySelector?.(".card-security-code-input__action-icon")
    ?? reveal?.querySelector?.(".field__icon");
  const defaultHelper = root.dataset.defaultHelper ?? helper?.textContent ?? "";
  const validationMessage = root.dataset.validationMessage || "Enter the security code.";
  const expectedLength = Number(root.dataset.expectedLength || input.getAttribute?.("maxlength") || 3);
  if (reveal) {
    reveal.addEventListener?.("click", () => {
      const nextRevealed = input.type === "password";
      input.type = nextRevealed ? "text" : "password";
      reveal.setAttribute?.("aria-pressed", String(nextRevealed));
      reveal.setAttribute?.("aria-label", nextRevealed ? "Hide security code" : "Show security code");
      if (revealIcon) revealIcon.textContent = nextRevealed ? "visibility_off" : "visibility";
    });
  }
  const sync = () => {
    const digits = normalizeCardSecurityCode(input.value, expectedLength === 4 ? 4 : 3);
    if (input.value !== digits) input.value = digits;
    input.setAttribute?.("value", digits);
    const validity = cardSecurityCodeValidity(digits, expectedLength === 4 ? 4 : 3);
    root.dataset.validity = validity;
    root.dataset.length = String(digits.length);
    if (root.dataset.stateLocked === "true") {
      if (typeof onValueChange === "function") onValueChange(digits, { validity, expectedLength: expectedLength === 4 ? 4 : 3, complete: validity === "valid" });
      return;
    }
    if (root.dataset.errorLocked === "true") {
      root.dataset.state = "error";
      input.setAttribute?.("aria-invalid", "true");
      if (helper) helper.textContent = defaultHelper || validationMessage;
      helper?.setAttribute?.("role", "alert");
    } else if (validity === "invalid") {
      root.dataset.state = "error";
      input.setAttribute?.("aria-invalid", "true");
      if (helper) helper.textContent = validationMessage;
      helper?.setAttribute?.("role", "alert");
    } else {
      if (!root.dataset.errorLocked) root.dataset.state = validity === "valid" ? "valid" : digits ? "filled" : "default";
      removeNodeAttribute(input, "aria-invalid");
      if (helper) helper.textContent = defaultHelper;
      removeNodeAttribute(helper, "role");
    }
    if (typeof onValueChange === "function") onValueChange(digits, { validity, expectedLength: expectedLength === 4 ? 4 : 3, complete: validity === "valid" });
  };
  input.addEventListener?.("input", sync);
  sync();
  return root;
}

function getPhoneInput(root) {
  return root.querySelector?.("[data-phone-input]")
    ?? Array.from(root.querySelectorAll?.("input") ?? []).find((node) => node.attributes?.["data-phone-input"] !== undefined);
}

function getPhoneCountryControl(root) {
  return root.querySelector?.("[data-phone-country]")
    ?? Array.from(root.querySelectorAll?.("span") ?? []).find((node) => node.attributes?.["data-phone-country"] !== undefined);
}

function getPhonePrefix(root) {
  return root.querySelector?.("[data-phone-prefix]")
    ?? Array.from(root.querySelectorAll?.("span") ?? []).find((node) => node.attributes?.["data-phone-prefix"] !== undefined);
}

function getPhoneCountryFromControl(control, fallback = phoneCountries[0]) {
  const selectedOption = Array.from(control?.querySelectorAll?.("[data-phone-country-option]") ?? [])
    .find((option) => option.dataset?.selected === "true" || option.dataset?.countryCode === control?.dataset?.country);
  return phoneCountries.find((item) => item.country === control?.dataset?.country)
    ?? {
      country: control?.dataset?.country ?? fallback.country,
      label: selectedOption?.textContent?.replace(/\s\+\d+$/, "") ?? fallback.label,
      callingCode: selectedOption?.dataset?.callingCode ?? fallback.callingCode,
      nationalLength: Number(selectedOption?.dataset?.nationalLength ?? fallback.nationalLength),
    };
}

function syncPhoneCountry(root, country) {
  const countryControl = getPhoneCountryControl(root);
  if (countryControl) syncCountrySelectorValue(countryControl, country);
  const trigger = root.querySelector?.("[data-phone-country-trigger]") ?? root.querySelector?.(".phone-input__country-trigger");
  const listbox = root.querySelector?.("[data-phone-country-list]") ?? root.querySelector?.(".phone-input__country-listbox");
  if (trigger) {
    trigger.setAttribute?.("aria-label", `${root.querySelector?.(".field__label")?.textContent ?? "Phone number"} country code, ${country.label} ${country.callingCode}`);
    if (listbox?.id) trigger.setAttribute?.("aria-controls", listbox.id);
  }
}

export function createCountrySelector({
  id,
  label = "Country",
  value = "MX",
  country,
  countries,
  disabled = false,
  invalid = false,
  density = "md",
  inline = false,
  searchable = true,
  searchPlaceholder = "Search country or code",
  ariaLabel,
  listboxLabel,
  className = "",
  hydrate = true,
  onValueChange,
} = {}) {
  const resolvedId = id ?? `country-selector-${++countrySelectorId}`;
  const countryOptions = (countries?.length ? countries : phoneCountries).map((item) => ({
    ...resolvePhoneCountry(item),
    ...item,
  }));
  const selectedCountry = countryOptions.find((item) => item.country === String(country ?? value).toUpperCase())
    ?? resolvePhoneCountry({ country: country ?? value });
  const root = document.createElement("span");
  root.className = ["select-control", inline ? "select-control--inline" : "", "country-selector", className].filter(Boolean).join(" ");
  root.setAttribute("data-country-selector", "");
  root.dataset.country = selectedCountry.country;
  root.dataset.value = selectedCountry.country;
  root.dataset.open = "false";
  root.dataset.density = density;
  if (invalid) root.dataset.state = "error";
  if (disabled) root.dataset.state = "disabled";

  const trigger = document.createElement("span");
  trigger.className = "select-control__trigger country-selector__trigger";
  trigger.setAttribute("data-country-selector-trigger", "");
  trigger.setAttribute("role", "combobox");
  trigger.setAttribute("tabindex", disabled ? "-1" : "0");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-label", ariaLabel ?? `${label}, ${selectedCountry.label} ${selectedCountry.callingCode}`);
  if (disabled) trigger.setAttribute("aria-disabled", "true");

  const flagNode = createCountryFlag(selectedCountry.country);
  flagNode.setAttribute("data-country-selector-flag", "");
  const valueNode = document.createElement("span");
  valueNode.className = "country-selector__value";
  valueNode.setAttribute("data-country-selector-value", "");
  const labelNode = document.createElement("span");
  labelNode.className = "country-selector__label";
  labelNode.setAttribute("data-country-selector-label", "");
  labelNode.textContent = selectedCountry.label;
  const prefixNode = document.createElement("span");
  prefixNode.className = "select-control__code country-selector__code";
  prefixNode.setAttribute("data-country-selector-prefix", "");
  prefixNode.textContent = selectedCountry.callingCode;
  valueNode.append(labelNode, prefixNode);
  const chevronNode = document.createElement("span");
  chevronNode.className = "select-control__chevron country-selector__chevron";
  chevronNode.setAttribute("aria-hidden", "true");
  chevronNode.textContent = "expand_more";
  trigger.append(flagNode, valueNode, chevronNode);

  const listboxNode = document.createElement("span");
  listboxNode.className = "select-control__listbox country-selector__listbox";
  listboxNode.id = `${resolvedId}-list`;
  listboxNode.setAttribute("data-country-selector-list", "");
  listboxNode.setAttribute("role", "listbox");
  listboxNode.setAttribute("aria-label", listboxLabel ?? `${label} options`);
  trigger.setAttribute("aria-controls", listboxNode.id);

  if (searchable) {
    const searchWrap = document.createElement("span");
    searchWrap.className = "country-selector__search";
    const searchInput = document.createElement("input");
    searchInput.className = "country-selector__search-input";
    searchInput.type = "search";
    searchInput.placeholder = searchPlaceholder;
    searchInput.setAttribute("data-country-selector-search", "");
    searchInput.setAttribute("aria-label", `${label} search`);
    searchInput.autocomplete = "off";
    searchInput.spellcheck = false;
    if (disabled) searchInput.disabled = true;
    searchWrap.append(searchInput);
    listboxNode.append(searchWrap);
  }

  for (const optionCountry of countryOptions) {
    const option = document.createElement("span");
    const isSelected = optionCountry.country === selectedCountry.country;
    option.className = "select-control__option country-selector__option";
    option.id = `${resolvedId}-${optionCountry.country.toLowerCase()}`;
    option.setAttribute("data-country-selector-option", "");
    option.setAttribute("role", "option");
    option.setAttribute("tabindex", "-1");
    option.setAttribute("aria-selected", String(isSelected));
    option.dataset.countryCode = optionCountry.country;
    option.dataset.callingCode = optionCountry.callingCode;
    option.dataset.nationalLength = String(optionCountry.nationalLength);
    option.dataset.selected = String(isSelected);
    option.dataset.active = String(isSelected);
    const optionFlag = createCountryFlag(optionCountry.country);
    const optionBody = document.createElement("span");
    optionBody.className = "country-selector__option-body";
    const optionLabel = document.createElement("span");
    optionLabel.className = "select-control__option-label country-selector__option-label";
    optionLabel.textContent = optionCountry.label;
    const optionCode = document.createElement("span");
    optionCode.className = "select-control__option-code country-selector__option-code";
    optionCode.textContent = optionCountry.callingCode;
    optionBody.append(optionLabel, optionCode);
    const optionCheck = document.createElement("span");
    optionCheck.className = "country-selector__option-check";
    optionCheck.setAttribute("aria-hidden", "true");
    optionCheck.textContent = "check";
    option.append(optionFlag, optionBody, optionCheck);
    listboxNode.append(option);
  }
  const emptyNode = document.createElement("span");
  emptyNode.className = "country-selector__empty";
  emptyNode.setAttribute("data-country-selector-empty", "");
  emptyNode.setAttribute("role", "status");
  emptyNode.hidden = true;
  emptyNode.textContent = "No results";
  listboxNode.append(emptyNode);
  root.append(trigger, listboxNode);
  if (hydrate) hydrateCountrySelector(root, { onValueChange });
  return root;
}

function syncCountrySelectorValue(control, countryLike, { onValueChange } = {}) {
  if (!control) return null;
  const attributeOptions = Array.from(control.querySelectorAll?.("[data-country-selector-option]") ?? []);
  const options = attributeOptions.length ? attributeOptions : Array.from(control.querySelectorAll?.(".country-selector__option") ?? []);
  const countryCode = String(countryLike?.country ?? countryLike?.countryCode ?? countryLike ?? "").toUpperCase();
  const selectedOption = options.find((option) => option.dataset.countryCode === countryCode)
    ?? options.find((option) => option.dataset.callingCode === countryLike?.callingCode)
    ?? options[0];
  if (!selectedOption) return null;
  options.forEach((item) => {
    const selected = item === selectedOption;
    item.dataset.selected = String(selected);
    item.setAttribute?.("aria-selected", String(selected));
  });
  const country = {
    country: selectedOption.dataset.countryCode,
    label: selectedOption.querySelector?.(".country-selector__option-label")?.textContent ?? selectedOption.dataset.countryCode,
    callingCode: selectedOption.dataset.callingCode,
    nationalLength: Number(selectedOption.dataset.nationalLength || 10),
  };
  control.dataset.country = country.country;
  control.dataset.value = country.country;
  const prefixNode = control.querySelector?.("[data-country-selector-prefix]") ?? control.querySelector?.(".country-selector__code");
  if (prefixNode) prefixNode.textContent = country.callingCode;
  const labelNode = control.querySelector?.("[data-country-selector-label]") ?? control.querySelector?.(".country-selector__label");
  if (labelNode) labelNode.textContent = country.label;
  const flag = control.querySelector?.("[data-country-selector-flag]") ?? control.querySelector?.(".country-flag");
  const nextFlag = createCountryFlag(country.country);
  nextFlag.setAttribute("data-country-selector-flag", "");
  if (flag?.className) nextFlag.className = flag.className;
  if (flag?.replaceWith) flag.replaceWith(nextFlag);
  onValueChange?.(country.country, country);
  return country;
}

export function hydrateCountrySelector(root, { onValueChange } = {}) {
  if (!root || root.__countrySelectorHydrated === true) return root;
  const control = root.matches?.("[data-country-selector]")
    ? root
    : root.className?.split?.(" ")?.includes("country-selector")
      ? root
      : root.querySelector?.("[data-country-selector]") ?? root.querySelector?.(".country-selector");
  if (!control) return root;
  const trigger = control.querySelector?.("[data-country-selector-trigger]") ?? control.querySelector?.(".country-selector__trigger");
  const search = control.querySelector?.("[data-country-selector-search]") ?? control.querySelector?.(".country-selector__search-input");
  const empty = control.querySelector?.("[data-country-selector-empty]") ?? control.querySelector?.(".country-selector__empty");
  const attributeOptions = Array.from(control.querySelectorAll?.("[data-country-selector-option]") ?? []);
  const options = attributeOptions.length ? attributeOptions : Array.from(control.querySelectorAll?.(".country-selector__option") ?? []);
  if (!trigger || !options.length) return root;
  control.__countrySelectorHydrated = true;
  control.dataset.countrySelectorHydrated = "true";
  const visibleOptions = () => options.filter((option) => option.hidden !== true && option.getAttribute?.("hidden") == null);
  const selectedOption = () => visibleOptions().find((option) => option.dataset.selected === "true") ?? visibleOptions()[0] ?? options[0];
  const setActiveOption = (option) => {
    options.forEach((item) => {
      item.dataset.active = String(item === option);
      item.setAttribute?.("tabindex", item === option ? "0" : "-1");
    });
    if (option?.id) trigger.setAttribute?.("aria-activedescendant", option.id);
  };
  const setOpen = (open) => {
    control.dataset.open = String(open);
    trigger.setAttribute?.("aria-expanded", String(open));
    if (open) {
      setActiveOption(selectedOption());
      search?.focus?.();
    } else {
      if (search) search.value = "";
      options.forEach((option) => {
        option.hidden = false;
        option.removeAttribute?.("hidden");
      });
      trigger.removeAttribute?.("aria-activedescendant");
    }
  };
  const chooseCountry = (option) => {
    if (!option) return;
    syncCountrySelectorValue(control, option.dataset.countryCode, { onValueChange });
    setOpen(false);
    trigger.focus?.();
  };
  trigger.addEventListener?.("click", () => setOpen(control.dataset.open !== "true"));
  trigger.addEventListener?.("keydown", (event) => {
    if (["Enter", " "].includes(event.key)) {
      event.preventDefault?.();
      setOpen(control.dataset.open !== "true");
    }
    if (event.key === "Escape") setOpen(false);
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault?.();
      setOpen(true);
      const option = selectedOption();
      option?.focus?.();
      setActiveOption(option);
    }
  });
  search?.addEventListener?.("input", () => {
    const query = search.value.trim().toLowerCase();
    options.forEach((option) => {
      const labelText = option.querySelector?.(".country-selector__option-label")?.textContent ?? "";
      const codeText = `${option.dataset.countryCode ?? ""} ${option.dataset.callingCode ?? ""}`;
      const visible = !query || `${labelText} ${codeText}`.toLowerCase().includes(query);
      option.hidden = !visible;
      if (visible) option.removeAttribute?.("hidden");
      else option.setAttribute?.("hidden", "");
    });
    const hasVisibleOptions = visibleOptions().length > 0;
    if (empty) {
      empty.hidden = hasVisibleOptions;
      if (hasVisibleOptions) empty.setAttribute?.("hidden", "");
      else empty.removeAttribute?.("hidden");
    }
    setActiveOption(selectedOption());
  });
  search?.addEventListener?.("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      trigger.focus?.();
    }
    if (event.key === "ArrowDown") {
      event.preventDefault?.();
      const first = visibleOptions()[0];
      first?.focus?.();
      setActiveOption(first);
    }
  });
  options.forEach((option) => {
    option.addEventListener?.("click", () => chooseCountry(option));
    option.addEventListener?.("keydown", (event) => {
      const candidates = visibleOptions();
      const currentIndex = candidates.indexOf(option);
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault?.();
        chooseCountry(option);
      }
      if (event.key === "Escape") {
        setOpen(false);
        trigger.focus?.();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault?.();
        const nextOption = candidates[Math.min(currentIndex + 1, candidates.length - 1)];
        nextOption?.focus?.();
        setActiveOption(nextOption);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault?.();
        const nextOption = candidates[Math.max(currentIndex - 1, 0)];
        nextOption?.focus?.();
        setActiveOption(nextOption);
      }
      if (event.key === "Home") {
        event.preventDefault?.();
        candidates[0]?.focus?.();
        setActiveOption(candidates[0]);
      }
      if (event.key === "End") {
        event.preventDefault?.();
        candidates[candidates.length - 1]?.focus?.();
        setActiveOption(candidates[candidates.length - 1]);
      }
    });
  });
  globalThis.document?.addEventListener?.("mousedown", (event) => {
    if (control.dataset.open === "true" && !control.contains?.(event.target)) setOpen(false);
  });
  return root;
}

export function hydratePhoneInput(root, { onValueChange } = {}) {
  if (!root || root.__phoneHydrated === true) return root;
  const input = getPhoneInput(root);
  const countryControl = getPhoneCountryControl(root);
  let options = Array.from(root.querySelectorAll?.("[data-phone-country-option]") ?? []);
  if (!options.length) options = Array.from(root.querySelectorAll?.(".phone-input__country-option") ?? []);
  if (!input) return root;
  root.__phoneHydrated = true;
  root.dataset.phoneHydrated = "true";
  const countryOptions = options.map((option) => ({
    country: option.dataset.countryCode,
    label: option.querySelector?.(".country-selector__option-label")?.textContent ?? option.textContent?.replace(/\s\+\d+$/, "") ?? option.dataset.countryCode,
    callingCode: option.dataset.callingCode,
    nationalLength: Number(option.dataset.nationalLength || 10),
  }));
  let selectedCountry = getPhoneCountryFromControl(countryControl, resolvePhoneCountry({ prefix: getPhonePrefix(root)?.textContent }));
  const emitPhoneValue = (digits) => {
    if (typeof onValueChange !== "function") return;
    onValueChange(digits, {
      country: selectedCountry.country,
      callingCode: selectedCountry.callingCode,
      e164: `${selectedCountry.callingCode}${digits}`,
      nationalNumber: digits,
    });
  };
  const normalize = () => {
    const parsed = parsePhoneValue(input.value, selectedCountry, countryOptions.length ? countryOptions : phoneCountries);
    if (parsed.country.country !== selectedCountry.country) {
      selectedCountry = parsed.country;
      syncPhoneCountry(root, selectedCountry);
    }
    const digits = parsed.digits.slice(0, selectedCountry.nationalLength);
    input.value = formatPhoneValue(digits, selectedCountry.nationalLength);
    emitPhoneValue(digits);
  };
  input.addEventListener?.("input", normalize);
  hydrateCountrySelector(countryControl, {
    onValueChange: (countryCode, countryMeta) => {
      selectedCountry = (countryOptions.length ? countryOptions : phoneCountries).find((item) => item.country === countryCode) ?? countryMeta ?? selectedCountry;
    syncPhoneCountry(root, selectedCountry);
    const digits = String(input.value ?? "").replace(/\D/g, "").slice(0, selectedCountry.nationalLength);
    input.value = formatPhoneValue(digits, selectedCountry.nationalLength);
    emitPhoneValue(digits);
    },
  });
  return root;
}

function normalizeCodeValue(value, length) {
  return String(value ?? "").replace(/\D/g, "").slice(0, Number(length));
}

function getCodeInput(root) {
  return root.querySelector?.("[data-code-input]")
    ?? Array.from(root.querySelectorAll?.("input") ?? []).find((node) => (
      node.attributes?.["data-code-input"] !== undefined
    ));
}

function getCodeSlots(root) {
  const attributeSlots = Array.from(root.querySelectorAll?.("[data-code-slot]") ?? []);
  if (attributeSlots.length) return attributeSlots;
  return Array.from(root.querySelectorAll?.("span") ?? []).filter((node) => (
    node.attributes?.["data-code-slot"] !== undefined
  ));
}

function syncCodeSlots(root, value, disabled = false) {
  const input = getCodeInput(root);
  const slots = getCodeSlots(root);
  const currentValue = normalizeCodeValue(value, slots.length);
  const activeIndex = Math.min(currentValue.length, Math.max(slots.length - 1, 0));
  const createElement = root.ownerDocument?.createElement?.bind(root.ownerDocument) ?? globalThis.document?.createElement?.bind(globalThis.document);
  slots.forEach((slot, index) => {
    const digit = currentValue[index] ?? "";
    slot.textContent = "";
    slot.dataset.filled = String(Boolean(digit));
    slot.dataset.active = String(root.dataset.focused === "true" && index === activeIndex && !disabled);
    if (digit && createElement) {
      const digitNode = createElement("span");
      digitNode.className = "code-input__digit";
      digitNode.textContent = digit;
      slot.append(digitNode);
    } else if (digit) {
      slot.textContent = digit;
    } else if (root.dataset.focused === "true" && index === activeIndex && !disabled && createElement) {
      const caretNode = createElement("span");
      caretNode.className = "code-input__caret";
      slot.append(caretNode);
    }
  });
  return { input, slots, currentValue };
}

export function hydrateCodeInput(root, { onValueChange, onComplete } = {}) {
  if (!root || root.__codeHydrated === true) return root;
  const input = getCodeInput(root);
  const slots = getCodeSlots(root);
  if (!input || !slots.length) return root;
  root.__codeHydrated = true;
  root.dataset.codeHydrated = "true";
  const length = Number(input.maxLength > 0 ? input.maxLength : slots.length);
  const isDisabled = () => Boolean(input.disabled || root.dataset.state === "disabled");
  const sync = () => syncCodeSlots(root, input.value, isDisabled());
  const emitValue = () => {
    const nextValue = input.value;
    if (typeof onValueChange === "function") onValueChange(nextValue);
    if (nextValue.length === length && typeof onComplete === "function") onComplete(nextValue);
  };
  input.value = normalizeCodeValue(input.value, length);
  input.addEventListener?.("input", () => {
    const nextValue = normalizeCodeValue(input.value, length);
    if (input.value !== nextValue) input.value = nextValue;
    sync();
    emitValue();
  });
  input.addEventListener?.("focus", () => {
    root.dataset.focused = "true";
    sync();
  });
  input.addEventListener?.("blur", () => {
    root.dataset.focused = "false";
    sync();
  });
  sync();
  return root;
}

export function createCodeInput({
  label,
  value = "",
  length = 6,
  variant = "sms",
  masked = false,
  helper = "",
  disabled = false,
  state,
  density = "md",
  error = "",
  onValueChange,
  onComplete,
} = {}) {
  const id = `code-input-${++codeInputId}`;
  const resolvedState = disabled ? "disabled" : error ? "error" : state ?? "default";
  const resolvedHelper = error || helper;
  const { root } = createFieldShell({
    id,
    label,
    fallbackLabel: "Security code",
    state: resolvedState,
    density,
    variant,
    className: "code-input",
  });
  if (masked || variant === "masked") root.dataset.masked = "true";
  root.dataset.focused = resolvedState === "focus" ? "true" : "false";
  const control = document.createElement("span");
  control.className = "code-input__control";
  const slots = document.createElement("span");
  slots.className = "code-input__slots";
  slots.setAttribute("aria-hidden", "true");
  const slotNodes = [];
  const resolvedLength = Number(length);
  const normalizeValue = (nextValue) => String(nextValue ?? "").replace(/\D/g, "").slice(0, resolvedLength);
  let currentValue = normalizeValue(value);
  const input = document.createElement("input");
  input.className = "code-input__input";
  input.id = id;
  input.type = "text";
  input.inputMode = "numeric";
  input.autocomplete = "one-time-code";
  input.pattern = "[0-9]*";
  input.maxLength = resolvedLength;
  input.value = currentValue;
  input.disabled = Boolean(disabled);
  input.setAttribute("data-code-input", "");
  input.setAttribute("inputmode", input.inputMode);
  input.setAttribute("autocomplete", input.autocomplete);
  input.setAttribute("pattern", input.pattern);
  input.setAttribute("maxlength", String(input.maxLength));
  input.setAttribute("aria-label", `${label ?? "Security code"} (${resolvedLength} digits)`);
  if (error) input.setAttribute("aria-invalid", "true");
  for (let index = 0; index < resolvedLength; index += 1) {
    const slot = document.createElement("span");
    slot.className = "code-input__slot";
    slot.setAttribute("data-code-slot", "");
    slotNodes.push(slot);
    slots.append(slot);
  }
  control.append(input, slots);
  root.append(control);
  appendFieldHelper(root, { id, text: resolvedHelper, target: input });
  hydrateCodeInput(root, { onValueChange, onComplete });
  return root;
}

export function createPhoneInput({
  label,
  value = "",
  prefix = "+1",
  country,
  countries,
  variant = "country-code",
  helper = "",
  disabled = false,
  state,
  density = "md",
  error = "",
  onValueChange,
} = {}) {
  const id = `phone-input-${++phoneInputId}`;
  const resolvedState = disabled ? "disabled" : error ? "error" : state ?? "default";
  const isReadonly = variant === "readonly";
  const resolvedHelper = error || helper;
  const { root } = createFieldShell({
    id,
    label,
    fallbackLabel: "Phone number",
    state: resolvedState,
    density,
    variant,
    className: "phone-input",
  });
  const control = createFieldSurface({ className: "phone-input__control" });
  const countryOptions = (countries?.length ? countries : phoneCountries).map((item) => ({
    ...resolvePhoneCountry(item),
    ...item,
  }));
  let selectedCountry = resolvePhoneCountry({ country, prefix });
  const parsed = parsePhoneValue(value, selectedCountry);
  selectedCountry = parsed.country;
  const countryControl = createCountrySelector({
    id: `${id}-country`,
    label: label ?? "Phone number",
    value: selectedCountry.country,
    countries: countryOptions,
    disabled: disabled || isReadonly,
    invalid: Boolean(error),
    density,
    inline: true,
    ariaLabel: `${label ?? "Phone number"} country code, ${selectedCountry.label} ${selectedCountry.callingCode}`,
    listboxLabel: `${label ?? "Phone number"} country options`,
    className: "phone-input__country",
    hydrate: false,
  });
  countryControl.setAttribute("data-phone-country-control", "");
  countryControl.setAttribute("data-phone-country", "");
  const countryValue = countryControl.querySelector(".country-selector__trigger");
  addClassName(countryValue, "phone-input__country-trigger");
  countryValue.setAttribute("data-phone-country-trigger", "");
  const flagNode = countryControl.querySelector(".country-flag");
  addClassName(flagNode, "phone-input__flag");
  flagNode.setAttribute("data-phone-country-flag", "");
  const prefixNode = countryControl.querySelector(".country-selector__code");
  addClassName(prefixNode, "phone-input__prefix");
  prefixNode.setAttribute("data-phone-prefix", "");
  const listboxNode = countryControl.querySelector(".country-selector__listbox");
  addClassName(listboxNode, "phone-input__country-listbox");
  listboxNode.setAttribute("data-phone-country-list", "");
  countryControl.querySelectorAll(".country-selector__option").forEach((option) => {
    addClassName(option, "phone-input__country-option");
    option.setAttribute("data-phone-country-option", "");
  });
  const input = document.createElement("input");
  input.className = "input phone-input__input";
  input.id = id;
  input.type = "tel";
  input.inputMode = "tel";
  input.autocomplete = "tel-national";
  input.value = formatPhoneValue(parsed.digits, selectedCountry.nationalLength);
  input.disabled = disabled;
  input.readOnly = isReadonly;
  input.setAttribute("data-phone-input", "");
  input.setAttribute("inputmode", input.inputMode);
  input.setAttribute("autocomplete", input.autocomplete);
  input.setAttribute("aria-labelledby", `${id}-label`);
  if (isReadonly) input.setAttribute("readonly", "");
  if (error) input.setAttribute("aria-invalid", "true");
  control.append(countryControl, input);
  root.append(control);
  appendFieldHelper(root, { id, text: resolvedHelper, target: input });
  hydratePhoneInput(root, { onValueChange });
  return root;
}

export function createCardNumberInput({
  label,
  value = "",
  helper = "",
  error = "",
  disabled = false,
  loading = false,
  required = false,
  density = "md",
  state,
  name = "",
  placeholder = "5231 0000 0000 0000",
  validationMessage = "Check the card number.",
  onValueChange,
} = {}) {
  const id = `card-number-input-${++cardNumberInputId}`;
  const digits = normalizeCardNumber(value);
  const formattedValue = formatCardNumber(digits);
  const validity = cardNumberValidity(digits);
  const resolvedError = error || (validity === "invalid" ? validationMessage : "");
  const resolvedHelper = resolvedError || helper;
  const resolvedState = resolveFieldState({ disabled, loading, error: resolvedError, state, value: digits });
  const { root } = createFieldShell({
    id,
    label,
    fallbackLabel: "Card number",
    state: resolvedState,
    density,
    mono: true,
    className: "card-number-input",
  });
  root.dataset.validity = validity;
  root.dataset.brand = cardNumberBrand(digits);
  root.dataset.defaultHelper = helper;
  root.dataset.validationMessage = validationMessage;
  if (resolvedError) root.dataset.errorLocked = error || state === "error" ? "true" : "false";
  addClassName(root.querySelector(".field__label"), "card-number-input__label");

  const control = createFieldSurface({ className: "card-number-input__control" });

  const iconNode = document.createElement("span");
  iconNode.className = "field__icon card-number-input__icon";
  iconNode.setAttribute("aria-hidden", "true");
  setIconGlyph(iconNode, "credit_card");

  const input = document.createElement("input");
  input.className = "input card-number-input__input";
  input.id = id;
  input.name = name;
  input.type = "text";
  input.inputMode = "numeric";
  input.autocomplete = "cc-number";
  input.placeholder = placeholder;
  input.value = formattedValue;
  input.disabled = Boolean(disabled || loading);
  input.required = Boolean(required);
  input.setAttribute("data-card-number-input", "");
  input.setAttribute("inputmode", "numeric");
  input.setAttribute("autocomplete", "cc-number");
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("value", formattedValue);
  input.setAttribute("aria-labelledby", `${id}-label`);
  input.setAttribute("pattern", "[0-9 ]*");
  input.setAttribute("enterkeyhint", "next");
  input.spellcheck = false;
  if (resolvedError) input.setAttribute("aria-invalid", "true");

  control.append(iconNode, input);
  const brandNode = document.createElement("span");
  brandNode.className = "field__suffix card-number-input__brand";
  brandNode.setAttribute("data-card-number-brand", "");
  brandNode.setAttribute("aria-hidden", "true");
  brandNode.textContent = root.dataset.brand;
  brandNode.hidden = !root.dataset.brand;
  control.append(brandNode);
  if (loading) {
    control.append(createFieldLoadingSpinner(`${label ?? "Card number"} loading`));
  }

  root.append(control);
  const helperNode = appendFieldHelper(root, { id, text: resolvedHelper, target: input, className: "card-number-input__helper" });
  helperNode?.setAttribute("data-card-number-helper", "");
  hydrateCardNumberInput(root, { onValueChange });
  return root;
}

export function createCardExpiryInput({
  label,
  value = "",
  helper = "",
  error = "",
  disabled = false,
  loading = false,
  required = false,
  density = "md",
  state,
  name = "",
  placeholder = "MM/YY",
  validationMessage = "Check the expiry date.",
  expiredMessage = "Use a card that has not expired.",
  onValueChange,
} = {}) {
  const id = `card-expiry-input-${++cardExpiryInputId}`;
  const digits = normalizeCardExpiry(value);
  const formattedValue = formatCardExpiry(digits);
  const validity = cardExpiryValidity(digits);
  const localError = validity === "invalid" ? validationMessage : validity === "expired" ? expiredMessage : "";
  const resolvedError = error || localError;
  const resolvedHelper = resolvedError || helper;
  const resolvedState = resolveFieldState({ disabled, loading, error: resolvedError, state, value: digits });
  const { month, year } = parseCardExpiry(digits);
  const { root } = createFieldShell({
    id,
    label,
    fallbackLabel: "Expiry date",
    state: resolvedState,
    density,
    mono: true,
    className: "card-expiry-input",
  });
  root.dataset.validity = validity;
  root.dataset.month = month;
  root.dataset.year = year;
  root.dataset.defaultHelper = helper;
  root.dataset.validationMessage = validationMessage;
  root.dataset.expiredMessage = expiredMessage;
  if (resolvedError) root.dataset.errorLocked = error ? "true" : "false";
  addClassName(root.querySelector(".field__label"), "card-expiry-input__label");

  const control = createFieldSurface({ className: "card-expiry-input__control" });

  const iconNode = document.createElement("span");
  iconNode.className = "field__icon card-expiry-input__icon";
  iconNode.setAttribute("aria-hidden", "true");
  setIconGlyph(iconNode, "calendar_month");

  const input = document.createElement("input");
  input.className = "input card-expiry-input__input";
  input.id = id;
  input.name = name;
  input.type = "text";
  input.inputMode = "numeric";
  input.autocomplete = "cc-exp";
  input.placeholder = placeholder;
  input.value = formattedValue;
  input.disabled = Boolean(disabled || loading);
  input.required = Boolean(required);
  input.setAttribute("data-card-expiry-input", "");
  input.setAttribute("inputmode", "numeric");
  input.setAttribute("autocomplete", "cc-exp");
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("value", formattedValue);
  input.setAttribute("aria-labelledby", `${id}-label`);
  input.setAttribute("pattern", "[0-9/ ]*");
  input.setAttribute("enterkeyhint", "next");
  input.maxLength = 5;
  input.setAttribute("maxlength", "5");
  input.spellcheck = false;
  if (resolvedError) input.setAttribute("aria-invalid", "true");

  control.append(iconNode, input);
  if (loading) {
    control.append(createFieldLoadingSpinner(`${label ?? "Expiry date"} loading`));
  }

  root.append(control);
  const helperNode = appendFieldHelper(root, { id, text: resolvedHelper, target: input, className: "card-expiry-input__helper" });
  helperNode?.setAttribute("data-card-expiry-helper", "");
  hydrateCardExpiryInput(root, { onValueChange });
  return root;
}

export function createCardSecurityCodeInput({
  label,
  value = "",
  helper = "",
  error = "",
  disabled = false,
  loading = false,
  required = false,
  density = "md",
  state,
  name = "",
  placeholder = "CVC",
  expectedLength = 3,
  validationMessage = "Enter the security code.",
  revealable = true,
  revealed = false,
  onValueChange,
} = {}) {
  const id = `card-security-code-input-${++cardSecurityCodeInputId}`;
  const resolvedLength = Number(expectedLength) === 4 ? 4 : 3;
  const digits = normalizeCardSecurityCode(value, resolvedLength);
  const validity = cardSecurityCodeValidity(digits, resolvedLength);
  const localError = validity === "invalid" || state === "error" ? validationMessage : "";
  const resolvedError = error || localError;
  const resolvedHelper = resolvedError || helper;
  const isLoading = Boolean(loading) || state === "loading";
  const isDisabledState = Boolean(disabled) || state === "disabled";
  const isDisabled = isDisabledState || isLoading;
  const resolvedState = resolveFieldState({ disabled: isDisabledState, loading: isLoading, error: resolvedError, state, value: digits });
  const { root } = createFieldShell({
    id,
    label,
    fallbackLabel: "Security code",
    state: resolvedState,
    density,
    mono: true,
    className: "card-security-code-input",
  });
  root.dataset.validity = validity;
  root.dataset.length = String(digits.length);
  root.dataset.expectedLength = String(resolvedLength);
  root.dataset.defaultHelper = helper;
  root.dataset.validationMessage = validationMessage;
  if (state === "disabled" || state === "loading") root.dataset.stateLocked = "true";
  if (resolvedError) root.dataset.errorLocked = error || state === "error" ? "true" : "false";
  addClassName(root.querySelector(".field__label"), "card-security-code-input__label");

  const control = createFieldSurface({ className: "card-security-code-input__control" });

  const iconNode = document.createElement("span");
  iconNode.className = "field__icon card-security-code-input__icon";
  iconNode.setAttribute("aria-hidden", "true");
  setIconGlyph(iconNode, "pin");

  const input = document.createElement("input");
  input.className = "input card-security-code-input__input";
  input.id = id;
  input.name = name;
  input.type = revealable && !revealed ? "password" : "text";
  input.inputMode = "numeric";
  input.autocomplete = "cc-csc";
  input.placeholder = placeholder;
  input.value = digits;
  input.disabled = isDisabled;
  input.required = Boolean(required);
  input.maxLength = resolvedLength;
  input.setAttribute("data-card-security-code-input", "");
  input.setAttribute("inputmode", "numeric");
  input.setAttribute("autocomplete", "cc-csc");
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("value", digits);
  input.setAttribute("maxlength", String(resolvedLength));
  input.setAttribute("aria-labelledby", `${id}-label`);
  input.setAttribute("pattern", "[0-9]*");
  input.setAttribute("enterkeyhint", "next");
  input.spellcheck = false;
  if (resolvedError) input.setAttribute("aria-invalid", "true");

  control.append(iconNode, input);
  if (revealable) {
    const action = createFieldAction({
      action: "reveal",
      ariaLabel: revealed ? "Hide security code" : "Show security code",
      icon: revealed ? "visibility_off" : "visibility",
      pressed: Boolean(revealed),
      disabled: isDisabled,
    });
    action.className = `${action.className} card-security-code-input__action`;
    action.setAttribute("data-card-security-code-reveal", "");
    const actionIcon = action.querySelector(".field-action__icon");
    addClassName(actionIcon, "card-security-code-input__action-icon");
    control.append(action);
  }
  if (isLoading) {
    control.append(createFieldLoadingSpinner(`${label ?? "Security code"} loading`));
  }

  root.append(control);
  const helperNode = appendFieldHelper(root, { id, text: resolvedHelper, target: input, className: "card-security-code-input__helper" });
  helperNode?.setAttribute("data-card-security-code-helper", "");
  hydrateCardSecurityCodeInput(root, { onValueChange });
  return root;
}

export function createDatePicker({
  label,
  value = "",
  placeholder = "Selecciona fecha",
  helper = "",
  error = "",
  disabled = false,
  min = "",
  max = "",
  density = "md",
  state = "default",
  invalid = false,
  onValueChange,
  onOpenChange,
} = {}) {
  const controlId = `date-picker-${datePickerId + 1}`;
  const visualState = resolveFieldState({ disabled, error: error || invalid ? "error" : "", state });
  const { root, labelNode } = createFieldShell({
    id: controlId,
    label,
    fallbackLabel: "Date",
    state: visualState,
    density,
    tag: "div",
    className: "date-picker",
  });
  addClassName(labelNode, "date-picker__label");
  root.dataset.open = "false";
  let viewDate = parseDate(value) ?? new Date();
  const formattedValue = formatDateLabel(value);
  const control = document.createElement("button");
  control.type = "button";
  control.className = createFieldSurface({ className: "date-picker__control" }).className;
  control.id = controlId;
  control.disabled = disabled;
  control.setAttribute("data-date-picker-trigger", "");
  control.setAttribute("aria-haspopup", "dialog");
  control.setAttribute("aria-expanded", "false");
  const panelId = `date-picker-panel-${datePickerId += 1}`;
  control.setAttribute("aria-controls", panelId);
  control.setAttribute("aria-labelledby", labelNode.id);
  if (invalid || error || state === "error") control.setAttribute("aria-invalid", "true");
  const iconNode = document.createElement("span");
  iconNode.className = "field__icon date-picker__icon";
  iconNode.setAttribute("aria-hidden", "true");
  setIconGlyph(iconNode, "calendar_month");
  const valueNode = document.createElement("span");
  valueNode.className = "date-picker__value";
  valueNode.setAttribute("data-date-picker-value", "");
  valueNode.textContent = formattedValue || placeholder;
  const input = document.createElement("input");
  input.type = "date";
  input.className = "date-picker__input";
  input.value = value;
  input.disabled = disabled;
  input.min = min;
  input.max = max;
  input.setAttribute("data-date-picker-input", "");
  input.setAttribute("aria-label", `${label ?? "Date"} native picker`);
  input.tabIndex = -1;
  control.append(iconNode, valueNode);
  const helperText = error || helper;
  const panel = document.createElement("div");
  panel.className = "date-picker__panel";
  panel.id = panelId;
  panel.hidden = true;
  panel.setAttribute("data-date-picker-panel", "");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-label", `${label ?? "Date"} calendar`);
  const setOpen = (open, restoreFocus = false) => {
    root.dataset.open = String(Boolean(open));
    control.setAttribute("aria-expanded", String(Boolean(open)));
    panel.hidden = !open;
    if (restoreFocus) control.focus?.();
    if (typeof onOpenChange === "function") onOpenChange(Boolean(open));
  };
  const selectDate = (nextValue) => {
    input.value = nextValue;
    valueNode.textContent = formatDateLabel(nextValue) || placeholder;
    for (const day of panel.querySelectorAll?.(".date-picker__day") ?? []) {
      day.setAttribute("aria-pressed", String(nodeAttribute(day, "data-date-picker-day") === nextValue));
    }
    if (typeof onValueChange === "function") onValueChange(nextValue);
    setOpen(false, true);
  };
  const header = document.createElement("div");
  header.className = "date-picker__header";
  const previousMonth = createDatePickerNavButton("chevron_left", "Mes anterior");
  const monthLabel = document.createElement("strong");
  monthLabel.setAttribute("data-date-picker-month", "");
  const nextMonth = createDatePickerNavButton("chevron_right", "Mes siguiente");
  header.append(previousMonth, monthLabel, nextMonth);
  const grid = document.createElement("div");
  grid.className = "date-picker__grid";
  grid.setAttribute("data-date-picker-grid", "");
  grid.setAttribute("role", "grid");
  grid.setAttribute("aria-labelledby", `${controlId}-month`);
  monthLabel.id = `${controlId}-month`;
  const renderCalendar = () => {
    clearNode(grid);
    monthLabel.textContent = formatMonthLabel(viewDate);
    const todayValue = dateIso(new Date());
    for (const day of ["L", "M", "X", "J", "V", "S", "D"]) {
      const dayLabel = document.createElement("span");
      dayLabel.className = "date-picker__weekday";
      dayLabel.setAttribute("role", "columnheader");
      dayLabel.textContent = day;
      grid.append(dayLabel);
    }
    for (const cell of dateCells(viewDate)) {
      if (!cell) {
        const empty = document.createElement("span");
        empty.className = "date-picker__empty";
        empty.setAttribute("role", "gridcell");
        empty.setAttribute("aria-hidden", "true");
        grid.append(empty);
        continue;
      }
      const button = document.createElement("button");
      const isoValue = dateIso(cell);
      button.type = "button";
      button.className = "date-picker__day";
      button.textContent = String(cell.getDate());
      button.setAttribute("role", "gridcell");
      button.setAttribute("data-date-picker-day", isoValue);
      button.setAttribute("aria-label", formatDateLongLabel(isoValue));
      button.setAttribute("aria-pressed", String(isoValue === input.value));
      if (isoValue === todayValue) {
        button.setAttribute("aria-current", "date");
        button.setAttribute("data-today", "true");
      }
      button.disabled = Boolean((min && isoValue < min) || (max && isoValue > max));
      button.addEventListener?.("click", () => {
        if (!button.disabled) selectDate(isoValue);
      });
      button.addEventListener?.("keydown", (event) => {
        const days = Array.from(panel.querySelectorAll?.(".date-picker__day") ?? []).filter((day) => !day.disabled);
        const index = days.indexOf(button);
        const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault?.();
          selectDate(isoValue);
        } else if (event.key in moves) {
          event.preventDefault?.();
          days[Math.max(0, Math.min(days.length - 1, index + moves[event.key]))]?.focus?.();
        } else if (event.key === "Home") {
          event.preventDefault?.();
          days[0]?.focus?.();
        } else if (event.key === "End") {
          event.preventDefault?.();
          days[days.length - 1]?.focus?.();
        } else if (event.key === "PageUp" || event.key === "PageDown") {
          event.preventDefault?.();
          moveMonth(event.key === "PageUp" ? -1 : 1);
          const nextDays = Array.from(panel.querySelectorAll?.(".date-picker__day") ?? []).filter((day) => !day.disabled);
          (nextDays[Math.min(index, nextDays.length - 1)] ?? nextDays[0])?.focus?.();
        }
      });
      grid.append(button);
    }
  };
  const moveMonth = (delta) => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1);
    renderCalendar();
  };
  previousMonth.addEventListener?.("click", () => moveMonth(-1));
  nextMonth.addEventListener?.("click", () => moveMonth(1));
  renderCalendar();
  control.addEventListener?.("click", () => {
    if (!disabled) setOpen(panel.hidden);
  });
  control.addEventListener?.("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault?.();
      setOpen(false, true);
    }
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault?.();
      setOpen(true);
      const selectedDay = Array.from(panel.querySelectorAll?.(".date-picker__day") ?? []).find((day) => nodeAttribute(day, "aria-pressed") === "true" && !day.disabled);
      (selectedDay ?? panel.querySelector?.(".date-picker__day"))?.focus?.();
    }
  });
  panel.addEventListener?.("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault?.();
    setOpen(false, true);
  });
  input.addEventListener?.("change", () => {
    if (input.value) selectDate(input.value);
  });
  document.addEventListener?.("mousedown", (event) => {
    if (root.dataset.open !== "true") return;
    if (root.contains?.(event.target)) return;
    setOpen(false);
  });
  panel.append(header, grid);
  root.append(control, input, panel);
  appendFieldHelper(root, { id: controlId, text: helperText, target: control, className: "date-picker__helper" });
  return root;
}

export function createDateRangePicker({
  label,
  value = {},
  from,
  to,
  placeholder = "Rango de fechas",
  helper = "",
  error = "",
  disabled = false,
  density = "md",
  state = "default",
  invalid = false,
  presets = true,
  presetItems,
  onValueChange,
  onOpenChange,
} = {}) {
  const controlId = `date-range-picker-${dateRangePickerId + 1}`;
  const visualState = resolveFieldState({ disabled, error: error || invalid ? "error" : "", state });
  const resolvedFrom = from ?? value?.from ?? "";
  const resolvedTo = to ?? value?.to ?? "";
  const { root, labelNode } = createFieldShell({
    id: controlId,
    label,
    fallbackLabel: "Date range",
    state: visualState,
    density,
    tag: "div",
    className: "date-picker date-range-picker",
  });
  addClassName(labelNode, "date-picker__label date-range-picker__label");
  root.dataset.open = "false";
  root.dataset.from = resolvedFrom;
  root.dataset.to = resolvedTo;
  let rangeFrom = resolvedFrom;
  let rangeTo = resolvedTo;
  let viewDate = parseDate(rangeFrom) ?? parseDate(rangeTo) ?? new Date();
  const panelId = `date-range-picker-panel-${dateRangePickerId += 1}`;
  const control = document.createElement("button");
  control.type = "button";
  control.className = createFieldSurface({ className: "date-picker__control date-range-picker__control" }).className;
  control.id = controlId;
  control.disabled = disabled;
  control.setAttribute("data-date-range-picker-trigger", "");
  control.setAttribute("aria-haspopup", "dialog");
  control.setAttribute("aria-expanded", "false");
  control.setAttribute("aria-controls", panelId);
  control.setAttribute("aria-labelledby", labelNode.id);
  if (invalid || error || state === "error") control.setAttribute("aria-invalid", "true");
  const iconNode = document.createElement("span");
  iconNode.className = "field__icon date-picker__icon date-range-picker__icon";
  iconNode.setAttribute("aria-hidden", "true");
  setIconGlyph(iconNode, "date_range");
  const valueNode = document.createElement("span");
  valueNode.className = "date-picker__value date-range-picker__value";
  valueNode.setAttribute("data-date-range-picker-value", "");
  const inputFrom = document.createElement("input");
  inputFrom.type = "date";
  inputFrom.className = "date-picker__input date-range-picker__input";
  inputFrom.value = rangeFrom;
  inputFrom.disabled = disabled;
  inputFrom.tabIndex = -1;
  inputFrom.setAttribute("data-date-range-picker-from", "");
  inputFrom.setAttribute("aria-label", `${label ?? "Date range"} start date`);
  const inputTo = document.createElement("input");
  inputTo.type = "date";
  inputTo.className = "date-picker__input date-range-picker__input";
  inputTo.value = rangeTo;
  inputTo.disabled = disabled;
  inputTo.tabIndex = -1;
  inputTo.setAttribute("data-date-range-picker-to", "");
  inputTo.setAttribute("aria-label", `${label ?? "Date range"} end date`);
  const panel = document.createElement("div");
  panel.className = "date-picker__panel date-range-picker__panel";
  panel.id = panelId;
  panel.hidden = true;
  panel.setAttribute("data-date-range-picker-panel", "");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-label", `${label ?? "Date range"} calendar`);
  const helperText = error || helper;
  const rangeLabel = () => {
    if (!rangeFrom) return placeholder;
    return `${formatDateLabel(rangeFrom)} - ${rangeTo ? formatDateLabel(rangeTo) : "..."}`;
  };
  const emitRange = () => {
    root.dataset.from = rangeFrom;
    root.dataset.to = rangeTo;
    inputFrom.value = rangeFrom;
    inputTo.value = rangeTo;
    valueNode.textContent = rangeLabel();
    if (typeof onValueChange === "function") onValueChange({ from: rangeFrom, to: rangeTo });
  };
  const setOpen = (open, restoreFocus = false) => {
    root.dataset.open = String(Boolean(open));
    control.setAttribute("aria-expanded", String(Boolean(open)));
    panel.hidden = !open;
    if (restoreFocus) control.focus?.();
    if (typeof onOpenChange === "function") onOpenChange(Boolean(open));
  };
  control.append(iconNode, valueNode);
  const header = document.createElement("div");
  header.className = "date-picker__header date-range-picker__header";
  const previousMonth = createDatePickerNavButton("chevron_left", "Mes anterior");
  const monthLabel = document.createElement("strong");
  monthLabel.id = `${controlId}-month`;
  monthLabel.setAttribute("data-date-range-picker-month", "");
  const nextMonth = createDatePickerNavButton("chevron_right", "Mes siguiente");
  header.append(previousMonth, monthLabel, nextMonth);
  const grid = document.createElement("div");
  grid.className = "date-picker__grid date-range-picker__grid";
  grid.setAttribute("data-date-range-picker-grid", "");
  grid.setAttribute("role", "grid");
  grid.setAttribute("aria-labelledby", monthLabel.id);
  const selectDate = (nextValue) => {
    if (!rangeFrom || (rangeFrom && rangeTo)) {
      rangeFrom = nextValue;
      rangeTo = "";
    } else if (nextValue < rangeFrom) {
      rangeTo = rangeFrom;
      rangeFrom = nextValue;
      setOpen(false, true);
    } else {
      rangeTo = nextValue;
      setOpen(false, true);
    }
    emitRange();
    renderCalendar();
  };
  const presetOptions = presetItems ?? [
    { label: "7 dias", days: 7 },
    { label: "30 dias", days: 30 },
    { label: "90 dias", days: 90 },
  ];
  const presetRow = document.createElement("div");
  presetRow.className = "date-range-picker__presets";
  if (presets) {
    for (const preset of presetOptions) {
      const presetButton = document.createElement("button");
      presetButton.type = "button";
      presetButton.className = "date-range-picker__preset";
      presetButton.textContent = preset.label;
      presetButton.addEventListener?.("click", () => {
        const end = new Date();
        const start = new Date(end);
        start.setDate(end.getDate() - Number(preset.days ?? 1) + 1);
        rangeFrom = dateIso(start);
        rangeTo = dateIso(end);
        viewDate = start;
        emitRange();
        renderCalendar();
        setOpen(false, true);
      });
      presetRow.append(presetButton);
    }
  }
  const renderCalendar = () => {
    clearNode(grid);
    monthLabel.textContent = formatMonthLabel(viewDate);
    const todayValue = dateIso(new Date());
    for (const day of ["L", "M", "X", "J", "V", "S", "D"]) {
      const dayLabel = document.createElement("span");
      dayLabel.className = "date-picker__weekday";
      dayLabel.setAttribute("role", "columnheader");
      dayLabel.textContent = day;
      grid.append(dayLabel);
    }
    for (const cell of dateCells(viewDate)) {
      if (!cell) {
        const empty = document.createElement("span");
        empty.className = "date-picker__empty";
        empty.setAttribute("role", "gridcell");
        empty.setAttribute("aria-hidden", "true");
        grid.append(empty);
        continue;
      }
      const isoValue = dateIso(cell);
      const isFrom = isoValue === rangeFrom;
      const isTo = isoValue === rangeTo;
      const inRange = Boolean(rangeFrom && rangeTo && isoValue > rangeFrom && isoValue < rangeTo);
      const day = document.createElement("button");
      day.type = "button";
      day.className = "date-picker__day date-range-picker__day";
      day.textContent = String(cell.getDate());
      day.setAttribute("role", "gridcell");
      day.setAttribute("data-date-range-picker-day", isoValue);
      day.setAttribute("aria-label", formatDateLongLabel(isoValue));
      day.setAttribute("aria-pressed", String(isFrom || isTo));
      if (isoValue === todayValue) {
        day.setAttribute("aria-current", "date");
        day.setAttribute("data-today", "true");
      }
      if (isFrom) day.dataset.rangeEdge = "start";
      if (isTo) day.dataset.rangeEdge = "end";
      if (inRange) day.dataset.inRange = "true";
      day.addEventListener?.("click", () => selectDate(isoValue));
      day.addEventListener?.("keydown", (event) => {
        const days = Array.from(panel.querySelectorAll?.(".date-range-picker__day") ?? []);
        const index = days.indexOf(day);
        const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault?.();
          selectDate(isoValue);
        } else if (event.key in moves) {
          event.preventDefault?.();
          days[Math.max(0, Math.min(days.length - 1, index + moves[event.key]))]?.focus?.();
        } else if (event.key === "Escape") {
          event.preventDefault?.();
          setOpen(false, true);
        }
      });
      grid.append(day);
    }
  };
  const moveMonth = (delta) => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1);
    renderCalendar();
  };
  previousMonth.addEventListener?.("click", () => moveMonth(-1));
  nextMonth.addEventListener?.("click", () => moveMonth(1));
  control.addEventListener?.("click", () => {
    if (!disabled) setOpen(panel.hidden);
  });
  control.addEventListener?.("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault?.();
      setOpen(false, true);
    }
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault?.();
      setOpen(true);
      panel.querySelector?.(".date-range-picker__day")?.focus?.();
    }
  });
  panel.addEventListener?.("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault?.();
    setOpen(false, true);
  });
  document.addEventListener?.("mousedown", (event) => {
    if (root.dataset.open !== "true") return;
    if (root.contains?.(event.target)) return;
    setOpen(false);
  });
  emitRange();
  renderCalendar();
  if (presets) panel.append(presetRow);
  panel.append(header, grid);
  root.append(control, inputFrom, inputTo, panel);
  appendFieldHelper(root, { id: controlId, text: helperText, target: control, className: "date-picker__helper date-range-picker__helper" });
  return root;
}

export function hydrateDateRangePicker(root, { placeholder = "Rango de fechas", disabled = false, onValueChange, onOpenChange } = {}) {
  if (!root || root.dataset?.dateRangePickerReady === "true") return root;
  root.dataset.dateRangePickerReady = "true";
  const control = root.querySelector?.("[data-date-range-picker-trigger]");
  const panel = root.querySelector?.("[data-date-range-picker-panel]");
  const valueNode = root.querySelector?.("[data-date-range-picker-value]");
  const inputFrom = root.querySelector?.("[data-date-range-picker-from]");
  const inputTo = root.querySelector?.("[data-date-range-picker-to]");
  if (!control || !panel || !valueNode) return root;
  let rangeFrom = root.dataset.from ?? inputFrom?.value ?? "";
  let rangeTo = root.dataset.to ?? inputTo?.value ?? "";
  const setValueText = () => {
    valueNode.textContent = rangeFrom
      ? `${formatDateLabel(rangeFrom)} - ${rangeTo ? formatDateLabel(rangeTo) : "..."}`
      : placeholder;
    root.dataset.from = rangeFrom;
    root.dataset.to = rangeTo;
    if (inputFrom) inputFrom.value = rangeFrom;
    if (inputTo) inputTo.value = rangeTo;
  };
  const setOpen = (open, restoreFocus = false) => {
    root.dataset.open = String(Boolean(open));
    control.setAttribute?.("aria-expanded", String(Boolean(open)));
    panel.hidden = !open;
    if (restoreFocus) control.focus?.();
    if (typeof onOpenChange === "function") onOpenChange(Boolean(open));
  };
  const syncDayStates = () => {
    for (const day of panel.querySelectorAll?.("[data-date-range-picker-day]") ?? []) {
      const value = nodeAttribute(day, "data-date-range-picker-day");
      day.removeAttribute?.("data-range-edge");
      delete day.dataset.rangeEdge;
      day.removeAttribute?.("data-in-range");
      delete day.dataset.inRange;
      const isStart = value === rangeFrom;
      const isEnd = value === rangeTo;
      const middle = Boolean(rangeFrom && rangeTo && value > rangeFrom && value < rangeTo);
      day.setAttribute?.("aria-pressed", String(isStart || isEnd));
      if (isStart) day.dataset.rangeEdge = "start";
      if (isEnd) day.dataset.rangeEdge = "end";
      if (middle) day.dataset.inRange = "true";
    }
  };
  const emitRange = () => {
    setValueText();
    syncDayStates();
    if (typeof onValueChange === "function") onValueChange({ from: rangeFrom, to: rangeTo });
  };
  const chooseDate = (value) => {
    if (!rangeFrom || (rangeFrom && rangeTo)) {
      rangeFrom = value;
      rangeTo = "";
    } else if (value < rangeFrom) {
      rangeTo = rangeFrom;
      rangeFrom = value;
      setOpen(false, true);
    } else {
      rangeTo = value;
      setOpen(false, true);
    }
    emitRange();
  };
  control.addEventListener?.("click", () => {
    if (!disabled && !control.disabled) setOpen(panel.hidden);
  });
  control.addEventListener?.("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault?.();
      setOpen(false, true);
    }
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault?.();
      setOpen(true);
      panel.querySelector?.("[data-date-range-picker-day]")?.focus?.();
    }
  });
  for (const preset of panel.querySelectorAll?.(".date-range-picker__preset") ?? []) {
    preset.addEventListener?.("click", () => {
      const match = preset.textContent.match(/\d+/);
      const days = Number(match?.[0] ?? 1);
      const end = new Date();
      const start = new Date(end);
      start.setDate(end.getDate() - days + 1);
      rangeFrom = dateIso(start);
      rangeTo = dateIso(end);
      emitRange();
      setOpen(false, true);
    });
  }
  for (const day of panel.querySelectorAll?.("[data-date-range-picker-day]") ?? []) {
    const value = nodeAttribute(day, "data-date-range-picker-day");
    day.addEventListener?.("click", () => chooseDate(value));
    day.addEventListener?.("keydown", (event) => {
      const days = Array.from(panel.querySelectorAll?.("[data-date-range-picker-day]") ?? []);
      const index = days.indexOf(day);
      const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault?.();
        chooseDate(value);
      } else if (event.key in moves) {
        event.preventDefault?.();
        days[Math.max(0, Math.min(days.length - 1, index + moves[event.key]))]?.focus?.();
      } else if (event.key === "Escape") {
        event.preventDefault?.();
        setOpen(false, true);
      }
    });
  }
  panel.addEventListener?.("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault?.();
    setOpen(false, true);
  });
  document.addEventListener?.("mousedown", (event) => {
    if (root.dataset.open !== "true") return;
    if (root.contains?.(event.target)) return;
    setOpen(false);
  });
  emitRange();
  return root;
}

export function hydrateDatePicker(root, { placeholder = "Selecciona fecha", disabled = false, onValueChange, onOpenChange } = {}) {
  if (!root || root.dataset?.datePickerReady === "true") return root;
  root.dataset.datePickerReady = "true";
  const control = root.querySelector?.("[data-date-picker-trigger]");
  const panel = root.querySelector?.("[data-date-picker-panel]");
  const input = root.querySelector?.("[data-date-picker-input]");
  const valueNode = root.querySelector?.("[data-date-picker-value]");
  const monthLabel = root.querySelector?.("[data-date-picker-month]");
  const grid = root.querySelector?.("[data-date-picker-grid]");
  if (!control || !panel || !input || !valueNode) return root;
  if (!monthLabel || !grid) {
    const setOpen = (open, restoreFocus = false) => {
      root.dataset.open = String(Boolean(open));
      control.setAttribute("aria-expanded", String(Boolean(open)));
      panel.hidden = !open;
      if (restoreFocus) control.focus?.();
      if (typeof onOpenChange === "function") onOpenChange(Boolean(open));
    };
    const selectDate = (nextValue) => {
      input.value = nextValue;
      valueNode.textContent = formatDateLabel(nextValue) || placeholder;
      for (const day of panel.querySelectorAll?.(".date-picker__day, [data-date-picker-day]") ?? []) {
        day.setAttribute("aria-pressed", String(nodeAttribute(day, "data-date-picker-day") === nextValue));
      }
      if (typeof onValueChange === "function") onValueChange(nextValue);
      setOpen(false, true);
    };
    control.addEventListener?.("click", () => {
      if (!disabled && !input.disabled) setOpen(panel.hidden);
    });
    for (const day of panel.querySelectorAll?.(".date-picker__day, [data-date-picker-day]") ?? []) {
      day.addEventListener?.("click", () => selectDate(nodeAttribute(day, "data-date-picker-day")));
    }
    return root;
  }
  let viewDate = parseDate(input.value) ?? new Date();
  const min = input.min ?? "";
  const max = input.max ?? "";
  panel.setAttribute("aria-modal", "false");
  grid.setAttribute("role", "grid");
  if (!monthLabel.id) monthLabel.id = `${control.id || "date-picker"}-month`;
  grid.setAttribute("aria-labelledby", monthLabel.id);
  const setOpen = (open, restoreFocus = false) => {
    root.dataset.open = String(Boolean(open));
    control.setAttribute("aria-expanded", String(Boolean(open)));
    panel.hidden = !open;
    if (restoreFocus) control.focus?.();
    if (typeof onOpenChange === "function") onOpenChange(Boolean(open));
  };
  const selectDate = (nextValue) => {
    input.value = nextValue;
    valueNode.textContent = formatDateLabel(nextValue) || placeholder;
    for (const day of panel.querySelectorAll?.(".date-picker__day") ?? []) {
      day.setAttribute("aria-pressed", String(nodeAttribute(day, "data-date-picker-day") === nextValue));
    }
    if (typeof onValueChange === "function") onValueChange(nextValue);
    setOpen(false, true);
  };
  const renderCalendar = () => {
    clearNode(grid);
    monthLabel.textContent = formatMonthLabel(viewDate);
    const todayValue = dateIso(new Date());
    for (const day of ["L", "M", "X", "J", "V", "S", "D"]) {
      const dayLabel = document.createElement("span");
      dayLabel.className = "date-picker__weekday";
      dayLabel.setAttribute("role", "columnheader");
      dayLabel.textContent = day;
      grid.append(dayLabel);
    }
    for (const cell of dateCells(viewDate)) {
      if (!cell) {
        const empty = document.createElement("span");
        empty.className = "date-picker__empty";
        empty.setAttribute("role", "gridcell");
        empty.setAttribute("aria-hidden", "true");
        grid.append(empty);
        continue;
      }
      const button = document.createElement("button");
      const isoValue = dateIso(cell);
      button.type = "button";
      button.className = "date-picker__day";
      button.textContent = String(cell.getDate());
      button.setAttribute("role", "gridcell");
      button.setAttribute("data-date-picker-day", isoValue);
      button.setAttribute("aria-label", formatDateLongLabel(isoValue));
      button.setAttribute("aria-pressed", String(isoValue === input.value));
      if (isoValue === todayValue) {
        button.setAttribute("aria-current", "date");
        button.setAttribute("data-today", "true");
      }
      button.disabled = Boolean((min && isoValue < min) || (max && isoValue > max));
      button.addEventListener?.("click", () => {
        if (!button.disabled) selectDate(isoValue);
      });
      button.addEventListener?.("keydown", (event) => {
        const days = Array.from(panel.querySelectorAll?.(".date-picker__day") ?? []).filter((day) => !day.disabled);
        const index = days.indexOf(button);
        const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault?.();
          selectDate(isoValue);
        } else if (event.key in moves) {
          event.preventDefault?.();
          days[Math.max(0, Math.min(days.length - 1, index + moves[event.key]))]?.focus?.();
        } else if (event.key === "Home") {
          event.preventDefault?.();
          days[0]?.focus?.();
        } else if (event.key === "End") {
          event.preventDefault?.();
          days[days.length - 1]?.focus?.();
        } else if (event.key === "PageUp" || event.key === "PageDown") {
          event.preventDefault?.();
          moveMonth(event.key === "PageUp" ? -1 : 1);
          const nextDays = Array.from(panel.querySelectorAll?.(".date-picker__day") ?? []).filter((day) => !day.disabled);
          (nextDays[Math.min(index, nextDays.length - 1)] ?? nextDays[0])?.focus?.();
        }
      });
      grid.append(button);
    }
  };
  const moveMonth = (delta) => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1);
    renderCalendar();
  };
  root.querySelector?.('.date-picker__nav[aria-label="Mes anterior"]')?.addEventListener?.("click", () => moveMonth(-1));
  root.querySelector?.('.date-picker__nav[aria-label="Mes siguiente"]')?.addEventListener?.("click", () => moveMonth(1));
  control.addEventListener?.("click", () => {
    if (!disabled && !input.disabled) setOpen(panel.hidden);
  });
  control.addEventListener?.("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault?.();
      setOpen(false, true);
    }
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault?.();
      setOpen(true);
      const selectedDay = Array.from(panel.querySelectorAll?.(".date-picker__day") ?? []).find((day) => nodeAttribute(day, "aria-pressed") === "true" && !day.disabled);
      (selectedDay ?? panel.querySelector?.(".date-picker__day"))?.focus?.();
    }
  });
  panel.addEventListener?.("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault?.();
    setOpen(false, true);
  });
  input.addEventListener?.("change", () => {
    if (input.value) selectDate(input.value);
  });
  document.addEventListener?.("mousedown", (event) => {
    if (root.dataset.open !== "true") return;
    if (root.contains?.(event.target)) return;
    setOpen(false);
  });
  renderCalendar();
  return root;
}

function createDatePickerNavButton(icon, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "date-picker__nav";
  button.setAttribute("aria-label", label);
  const iconNode = document.createElement("span");
  iconNode.className = "field__icon date-picker__icon";
  iconNode.setAttribute("aria-hidden", "true");
  iconNode.textContent = icon;
  button.append(iconNode);
  return button;
}

function clearNode(node) {
  if (typeof node.replaceChildren === "function") {
    node.replaceChildren();
    return;
  }
  node.children = [];
  node.textContent = "";
}

function formatPhoneValue(value, maxLength = 10) {
  const digits = String(value ?? "").replace(/\D/g, "").slice(0, Number(maxLength) || 10);
  if (!digits) return "";
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
}

function parseDate(value) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function dateIso(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function formatDateLabel(value) {
  const date = parseDate(value);
  if (!date) return "";
  return date.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateLongLabel(value) {
  const date = parseDate(value);
  if (!date) return "";
  return date.toLocaleDateString("es-MX", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}

function formatMonthLabel(date) {
  const month = date.toLocaleDateString("es-MX", { month: "long" });
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date.getFullYear()}`;
}

function dateCells(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: startOffset }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(new Date(year, month, day));
  return cells;
}
