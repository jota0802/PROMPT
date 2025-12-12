"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllValidators = getAllValidators;
const output_1 = require("./output");
const performance_1 = require("./performance");
/**
 * Get all available validators
 */
function getAllValidators() {
    return [
        ...output_1.outputValidators,
        ...performance_1.performanceValidators,
        // TODO: Add more validators
        // ...rulesValidators,
        // ...modelingValidators,
        // ...patternsValidators,
        // ...typesValidators,
    ];
}
__exportStar(require("./output"), exports);
__exportStar(require("./performance"), exports);
