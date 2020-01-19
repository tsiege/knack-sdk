interface GenericFilterRules {
  field: string
  field_name?: string
  value?: string | number | boolean
}

interface ShortTextFilterRules extends GenericFilterRules {
  // field_name: 'Short Text'
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface ParagraphTextFilterRules extends GenericFilterRules {
  // field_name: 'Paragraph Text'
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface YesNoFilterRules extends GenericFilterRules {
  // field_name: 'Yes/No'
  operator: 'is' | 'is not' | 'is blank' | 'is not blank'
}
interface MultipleChoiceFilterRules extends GenericFilterRules {
  // field_name: 'Multiple Choice'
  operator: 'is' | 'is not' | 'contains' | 'does not contain' | 'is any' | 'is blank' | 'is not blank'
}
interface DateTimeFilterRules extends GenericFilterRules {
  // field_name: 'Date/Time'
  operator: 'is' | 'is not' | 'is during the current' | 'is during the previous' | 'is during the next' | 'is before the previous' | 'is after the next' | 'is before' | 'is after' | 'is today' | 'is today or before' | 'is today or after' | 'is before today' | 'is after today' | 'is before current time' | 'is after current time' | 'is blank' | 'is not blank'
  range?: number | string
  type?: 'days' | 'weeks' | 'months' | 'years' | ''
}
interface NumberOperatorFilterRules extends GenericFilterRules {
  // field_name: 'Number'
  operator: 'is' | 'is not' | 'higher than' | 'lower than' | 'is blank' | 'is not blank'
}
interface ImageFilterRules extends GenericFilterRules {
  // field_name: 'Image'
  operator: 'is blank' | 'is not blank'
}
interface FileFilterRules extends GenericFilterRules {
  // field_name: 'File'
  operator: 'is blank' | 'is not blank'
}
interface AddressFilterRules extends GenericFilterRules {
  // field_name: 'Address'
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank' | 'near'
}
interface NameFilterRules extends GenericFilterRules {
  // field_name: 'Name'
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface LinkFilterRules extends GenericFilterRules {
  // field_name: 'Link'
  operator: 'is' | 'is not' | 'is blank' | 'is not blank'
}
interface EmailFilterRules extends GenericFilterRules {
  // field_name: 'Email'
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface PhoneFilterRules extends GenericFilterRules {
  // field_name: 'Phone'
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface RichTextFilterRules extends GenericFilterRules {
  // field_name: 'Rich Text'
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface CurrencyFilterRules extends GenericFilterRules {
  // field_name: 'Currency'
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface AutoIncrementFilterRules extends GenericFilterRules {
  // field_name: 'Auto Increment'
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface TimerFilterRules extends GenericFilterRules {
  // field_name: 'Timer'
  operator: 'is' | 'is not' | 'higher than' | 'lower than' | 'is blank' | 'is not blank'
}
interface RatingFilterRules extends GenericFilterRules {
  // field_name: 'Rating'
  operator: 'is' | 'is not' | 'higher than' | 'lower than' | 'is blank' | 'is not blank'
}
interface TextFormulaFilterRules extends GenericFilterRules {
  // field_name: 'Text Formula'
  operator: 'contains' | 'does not contain' | 'is' | 'is not' | 'starts with' | 'ends with' | 'is blank' | 'is not blank'
}
interface SignatureFilterRules extends GenericFilterRules {
  // field_name: 'Signature'
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
