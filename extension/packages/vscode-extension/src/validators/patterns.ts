import type { CategoryValidator, ValidationContext, PromptTag, ValidationResult } from '../types';
import { formatRuleId } from '../utils';

/**
 * Patterns category validator
 * Validates code patterns, naming conventions, architecture
 */
export function createPatternsValidator(): CategoryValidator {
  return {
    async validate(context: ValidationContext, tag: PromptTag): Promise<ValidationResult[]> {
      const results: ValidationResult[] = [];
      const { fileContent } = context;
      
      const rules = getRulesForLevel(tag.level);
      
      for (const rule of rules) {
        const violation = await checkRule(fileContent, rule, tag);
        if (violation) {
          results.push(violation);
        }
      }
      
      return results;
    }
  };
}

interface Rule {
  number: number;
  description: string;
  check: (code: string) => boolean;
  message: string;
}

function getRulesForLevel(level: string): Rule[] {
  const minRules: Rule[] = [
    {
      number: 1,
      description: 'TypeScript strict mode',
      check: (code) => !code.includes(': any'),
      message: 'Avoid using "any" type. Use proper TypeScript types'
    },
    {
      number: 2,
      description: 'Zod validation',
      check: (code) => code.includes('z.object') || code.includes('zod') || !code.includes('validate'),
      message: 'Use Zod for schema validation'
    },
    {
      number: 3,
      description: 'Error handling',
      check: (code) => code.includes('try') && code.includes('catch'),
      message: 'Include proper error handling with try-catch'
    }
  ];
  
  const stdRules: Rule[] = [
    ...minRules,
    {
      number: 4,
      description: 'Descriptive naming',
      check: (code) => !/\b[a-z]\b(?!\.|:)/.test(code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '')),
      message: 'Avoid single-letter variable names (except i, j, k in loops)'
    },
    {
      number: 5,
      description: 'Function length',
      check: (code) => {
        const functions = code.match(/function\s+\w+\s*\([^)]*\)\s*{[^}]*}/g) || [];
        return functions.every(fn => fn.split('\n').length <= 50);
      },
      message: 'Functions should be less than 50 lines'
    },
    {
      number: 6,
      description: 'Consistent formatting',
      check: (code) => !/\t/.test(code),
      message: 'Use spaces instead of tabs for indentation'
    }
  ];
  
  const maxRules: Rule[] = [
    ...stdRules,
    {
      number: 7,
      description: 'JSDoc comments',
      check: (code) => /\/\*\*[\s\S]*?\*\//.test(code),
      message: 'Include JSDoc comments for functions'
    },
    {
      number: 8,
      description: 'Immutability',
      check: (code) => {
        const letCount = (code.match(/\blet\b/g) || []).length;
        const constCount = (code.match(/\bconst\b/g) || []).length;
        return constCount > letCount;
      },
      message: 'Prefer const over let for immutability'
    },
    {
      number: 9,
      description: 'Async/await',
      check: (code) => !code.includes('.then(') || code.includes('async'),
      message: 'Use async/await instead of .then() for promises'
    }
  ];
  
  switch (level) {
    case 'min':
      return minRules;
    case 'std':
      return stdRules;
    case 'max':
      return maxRules;
    default:
      return minRules;
  }
}

async function checkRule(code: string, rule: Rule, tag: PromptTag): Promise<ValidationResult | null> {
  const passed = rule.check(code);
  
  if (passed) {
    return null;
  }
  
  return {
    rule: formatRuleId('Patterns', tag.level, rule.number),
    category: 'Patterns',
    level: tag.level,
    ruleNumber: rule.number,
    severity: getSeverity(tag.level),
    message: rule.message,
    line: 1,
    column: 0
  };
}

function getSeverity(level: string): 'error' | 'warning' | 'info' {
  switch (level) {
    case 'min':
      return 'error';
    case 'std':
      return 'warning';
    case 'max':
      return 'info';
    default:
      return 'warning';
  }
}
