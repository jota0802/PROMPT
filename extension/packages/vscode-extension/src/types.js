"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationResultSchema = exports.ParsedPromptSchema = exports.PromptTagSchema = void 0;
const zod_1 = require("zod");
/**
 * Zod schemas for validation
 */
exports.PromptTagSchema = zod_1.z.object({
    category: zod_1.z.enum(['P', 'R', 'O', 'M', 'Patterns', 'T']),
    level: zod_1.z.enum(['min', 'std', 'max']),
});
exports.ParsedPromptSchema = zod_1.z.object({
    tags: zod_1.z.array(exports.PromptTagSchema),
    raw: zod_1.z.string(),
    line: zod_1.z.number(),
});
exports.ValidationResultSchema = zod_1.z.object({
    rule: zod_1.z.string(),
    category: zod_1.z.enum(['P', 'R', 'O', 'M', 'Patterns', 'T']),
    level: zod_1.z.enum(['min', 'std', 'max']),
    ruleNumber: zod_1.z.number(),
    severity: zod_1.z.enum(['error', 'warning', 'info']),
    message: zod_1.z.string(),
    line: zod_1.z.number().optional(),
    column: zod_1.z.number().optional(),
    endLine: zod_1.z.number().optional(),
    endColumn: zod_1.z.number().optional(),
    quickFix: zod_1.z.object({
        title: zod_1.z.string(),
        edit: zod_1.z.object({
            range: zod_1.z.object({
                start: zod_1.z.object({ line: zod_1.z.number(), character: zod_1.z.number() }),
                end: zod_1.z.object({ line: zod_1.z.number(), character: zod_1.z.number() }),
            }),
            newText: zod_1.z.string(),
        }),
    }).optional(),
});
