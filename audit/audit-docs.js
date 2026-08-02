#!/usr/bin/env node

const {
  checkStaticHygiene,
  checkDocsModuleBoundaries,
  checkCssBalance,
} = require("./audit-css.js");
const { checkFrameLayoutContract } = require("./audit-frame-contracts.js");
const {
  checkFoundationRoutesAndContent,
  checkPrimitiveRoutesAndContent,
} = require("./audit-routes.js");
const {
  checkTemplateBlueprints,
  checkI18nReadiness,
} = require("./audit-docs-content.js");
const {
  checkHomeContentOwnership,
  checkFoundationCopyOwnership,
  checkPrimitiveCopyOwnership,
  checkReferenceCopyOwnership,
  checkDocsContentOwnership,
} = require("./audit-content-ownership.js");
const {
  checkDocsComponentCssOwnership,
  checkDocsPackageImportBoundary,
  checkPublicClassNamespaceOwnership,
} = require("./audit-css-ownership.js");
const { checkFoundationCascadeContracts } = require("./audit-foundation-cascade-contracts.js");
const { finishAudit } = require("./audit-result.js");

checkStaticHygiene();
checkDocsModuleBoundaries();
checkCssBalance();
checkFrameLayoutContract();
checkFoundationRoutesAndContent();
checkPrimitiveRoutesAndContent();
checkTemplateBlueprints();
checkI18nReadiness();
checkHomeContentOwnership();
checkFoundationCopyOwnership();
checkPrimitiveCopyOwnership();
checkReferenceCopyOwnership();
checkDocsContentOwnership();
checkFoundationCascadeContracts();
checkDocsComponentCssOwnership();
checkDocsPackageImportBoundary();
checkPublicClassNamespaceOwnership();

finishAudit();
