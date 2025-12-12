/**
 * PROMPT Protocol Categories
 */
export declare const CATEGORIES: {
    readonly P: "Performance";
    readonly R: "Rules & Structure";
    readonly O: "Output & UX";
    readonly M: "Modeling";
    readonly Patterns: "Patterns";
    readonly T: "Types";
};
/**
 * PROMPT Protocol Levels
 */
export declare const LEVELS: readonly ["min", "std", "max"];
/**
 * Default configuration
 */
export declare const DEFAULT_CONFIG: {
    readonly enabled: true;
    readonly validateOnSave: true;
    readonly validateOnType: false;
    readonly showStatusBar: true;
    readonly severity: {
        readonly min: "error";
        readonly std: "warning";
        readonly max: "info";
    };
    readonly customRules: {};
};
/**
 * Rule counts per category and level
 */
export declare const RULE_COUNTS: {
    readonly P: {
        readonly min: 3;
        readonly std: 6;
        readonly max: 12;
    };
    readonly R: {
        readonly min: 3;
        readonly std: 9;
        readonly max: 12;
    };
    readonly O: {
        readonly min: 3;
        readonly std: 6;
        readonly max: 12;
    };
    readonly M: {
        readonly min: 3;
        readonly std: 6;
        readonly max: 12;
    };
    readonly Patterns: {
        readonly min: 3;
        readonly std: 6;
        readonly max: 12;
    };
    readonly T: {
        readonly min: 3;
        readonly std: 6;
        readonly max: 12;
    };
};
/**
 * Extension ID
 */
export declare const EXTENSION_ID = "prompt-protocol.validator";
/**
 * Extension display name
 */
export declare const EXTENSION_NAME = "PROMPT Protocol Validator";
/**
 * Configuration section
 */
export declare const CONFIG_SECTION = "promptProtocol";
