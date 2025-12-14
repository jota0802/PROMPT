import type { CategoryValidator, ValidationContext, PromptTag, ValidationResult } from '../types';
import { formatRuleId } from '../utils';

/**
 * Performance category validator (P)
 * Validates Next.js Image, lazy loading, memoization
 */
export function createPerformanceValidator(): CategoryValidator {
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
      description: 'Next.js Image',
      check: (code) => !/<img\s/.test(code) || /import.*Image.*from.*next\/image/.test(code),
      message: 'Use Next.js Image component instead of <img> tag'
    },
    {
      number: 2,
      description: 'Dynamic imports',
      check: (code) => !code.includes('import(') || code.includes('dynamic'),
      message: 'Use Next.js dynamic() for code splitting'
    },
    {
      number: 3,
      description: 'Avoid large dependencies',
      check: (code) => !/(moment|lodash(?!-es)|jquery)/i.test(code),
      message: 'Avoid large dependencies (use date-fns, lodash-es instead)'
    }
  ];
  
  const stdRules: Rule[] = [
    ...minRules,
    {
      number: 4,
      description: 'React.memo',
      check: (code) => code.includes('React.memo') || code.includes('memo(') || !code.includes('export default function'),
      message: 'Wrap components with React.memo to prevent unnecessary re-renders'
    },
    {
      number: 5,
      description: 'useMemo/useCallback',
      check: (code) => {
        const hasExpensiveComputation = /map\(|filter\(|reduce\(|sort\(/.test(code);
        return !hasExpensiveComputation || code.includes('useMemo') || code.includes('useCallback');
      },
      message: 'Use useMemo/useCallback for expensive computations'
    },
    {
      number: 6,
      description: 'Server Components',
      check: (code) => code.includes('use client') || !code.includes('useState') || code.includes('async function'),
      message: 'Use Server Components when possible (Next.js 13+)'
    }
  ];
  
  const maxRules: Rule[] = [
    ...stdRules,
    {
      number: 7,
      description: 'Lazy loading',
      check: (code) => code.includes('loading="lazy"') || code.includes('Suspense') || !/<img/.test(code),
      message: 'Implement lazy loading for images and components'
    },
    {
      number: 8,
      description: 'Virtual scrolling',
      check: (code) => !/(\.map\([^)]*\).{0,50}<)/.test(code) || code.includes('virtual') || code.includes('window'),
      message: 'Use virtual scrolling for long lists'
    },
    {
      number: 9,
      description: 'Bundle optimization',
      check: (code) => !code.includes('import *') || code.includes('{'),
      message: 'Use named imports instead of wildcard imports'
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
    rule: formatRuleId('P', tag.level, rule.number),
    category: 'P',
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
