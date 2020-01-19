interface GenericFilterRules {
  field: string
  field_name?: string
  value?: string | number | boolean
}

interface ShortTextFilterRules extends GenericFilterRules {
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface ParagraphTextFilterRules extends GenericFilterRules {
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface YesNoFilterRules extends GenericFilterRules {
  operator: 'is' | 'is not' | 'is blank' | 'is not blank'
}
interface MultipleChoiceFilterRules extends GenericFilterRules {
  operator: 'is' | 'is not' | 'contains' | 'does not contain' | 'is any' | 'is blank' | 'is not blank'
}
interface DateTimeFilterRules extends GenericFilterRules {
  operator: 'is' | 'is not' | 'is during the current' | 'is during the previous' | 'is during the next' | 'is before the previous' | 'is after the next' | 'is before' | 'is after' | 'is today' | 'is today or before' | 'is today or after' | 'is before today' | 'is after today' | 'is before current time' | 'is after current time' | 'is blank' | 'is not blank'
  range?: number | string
  type?: 'days' | 'weeks' | 'months' | 'years' | ''
}
interface NumberOperatorFilterRules extends GenericFilterRules {
  operator: 'is' | 'is not' | 'higher than' | 'lower than' | 'is blank' | 'is not blank'
}
interface ImageFilterRules extends GenericFilterRules {
  operator: 'is blank' | 'is not blank'
}
interface FileFilterRules extends GenericFilterRules {
  operator: 'is blank' | 'is not blank'
}
interface AddressFilterRules extends GenericFilterRules {
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank' | 'near'
}
interface NameFilterRules extends GenericFilterRules {
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface LinkFilterRules extends GenericFilterRules {
  operator: 'is' | 'is not' | 'is blank' | 'is not blank'
}
interface EmailFilterRules extends GenericFilterRules {
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface PhoneFilterRules extends GenericFilterRules {
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface RichTextFilterRules extends GenericFilterRules {
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface CurrencyFilterRules extends GenericFilterRules {
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface AutoIncrementFilterRules extends GenericFilterRules {
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface TimerFilterRules extends GenericFilterRules {
  operator: 'is' | 'is not' | 'higher than' | 'lower than' | 'is blank' | 'is not blank'
}
interface RatingFilterRules extends GenericFilterRules {
  operator: 'is' | 'is not' | 'higher than' | 'lower than' | 'is blank' | 'is not blank'
}
interface TextFormulaFilterRules extends GenericFilterRules {
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface SignatureFilterRules extends GenericFilterRules {
  operator: 'is blank' | 'is not blank'
}

export interface FilterStatement {
  match?: 'or' | 'and'
  rules: Array<
    ShortTextFilterRules
    | ParagraphTextFilterRules
    | YesNoFilterRules
    | MultipleChoiceFilterRules
    | DateTimeFilterRules
    | NumberOperatorFilterRules
    | ImageFilterRules
    | FileFilterRules
    | AddressFilterRules
    | NameFilterRules
    | LinkFilterRules
    | EmailFilterRules
    | PhoneFilterRules
    | RichTextFilterRules
    | CurrencyFilterRules
    | AutoIncrementFilterRules
    | TimerFilterRules
    | RatingFilterRules
    | TextFormulaFilterRules
    | SignatureFilterRules
  >
}
