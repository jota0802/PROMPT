import type { CategoryValidator, ValidationContext, PromptTag, ValidationResult } from '../types';
import { formatRuleId } from '../utils';

/**
 * Output/UX category validator (O)
 * Validates design system usage, UI components, responsiveness
 */
export function createOutputValidator(): CategoryValidator {
  return {
    async validate(context: ValidationContext, tag: PromptTag): Promise<ValidationResult[]> {
      const results: ValidationResult[] = [];
      const { fileContent } = context;
      
      // Get rules for this level
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

/**
 * Get rules for O category based on level
 */
function getRulesForLevel(level: string): Rule[] {
  const minRules: Rule[] = [
    {
      number: 1,
      description: 'Use shadcn/ui components',
      check: (code) => code.includes('shadcn') || code.includes('@/components/ui') || code.includes('from "ui"'),
      message: 'Should use shadcn/ui components instead of raw HTML/CSS'
    },
    {
      number: 2,
      description: 'Use Tailwind CSS',
      check: (code) => code.includes('className') && (code.includes('tailwind') || /className="[^"]*(?:flex|grid|p-|m-|bg-|text-)/.test(code)),
      message: 'Should use Tailwind CSS for styling'
    },
    {
      number: 3,
      description: 'Responsive design',
      check: (code) => /(?:sm:|md:|lg:|xl:|2xl:)/.test(code),
      message: 'Should include responsive breakpoints (sm:, md:, lg:, xl:)'
    }
  ];
  
  const stdRules: Rule[] = [
    ...minRules,
    {
      number: 4,
      description: 'Semantic HTML',
      check: (code) => /<(?:header|nav|main|article|section|aside|footer)/.test(code),
      message: 'Should use semantic HTML elements (header, nav, main, article, section)'
    },
    {
      number: 5,
      description: 'Loading states',
      check: (code) => /(?:loading|isLoading|pending|skeleton)/i.test(code),
      message: 'Should handle loading states'
    },
    {
      number: 6,
      description: 'Error states',
      check: (code) => /(?:error|isError|hasError|catch)/i.test(code),
      message: 'Should handle error states'
    }
  ];
  
  const maxRules: Rule[] = [
    ...stdRules,
    {
      number: 7,
      description: 'Empty states',
      check: (code) => /(?:empty|isEmpty|noData|placeholder)/i.test(code),
      message: 'Should handle empty states'
    },
    {
      number: 8,
      description: 'Accessibility attributes',
      check: (code) => /(?:aria-|role=|alt=)/.test(code),
      message: 'Should include accessibility attributes (aria-*, role, alt)'
    },
    {
      number: 9,
      description: 'Dark mode support',
      check: (code) => /(?:dark:|dark-mode|theme)/.test(code),
      message: 'Should support dark mode'
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

/**
 * Check individual rule
 */
async function checkRule(code: string, rule: Rule, tag: PromptTag): Promise<ValidationResult | null> {
  const passed = rule.check(code);
  
  if (passed) {
    return null; // Rule passed, no violation
  }
  
  return {
    rule: formatRuleId('O', tag.level, rule.number),
    category: 'O',
    level: tag.level,
    ruleNumber: rule.number,
    severity: getSeverity(tag.level),
    message: rule.message,
    line: 1,
    column: 0
  };
}

/**
 * Get severity based on level
 */
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
