export type Sheet = {
    key: string,
    items: SheetItem[],
}

export type SheetItem = {
    key: string, 
    name: string,
    type: SheetItemType,
    isValidate?: boolean,
    validateRegex?: string,
    validateErrorMessage?: string,
    selector: string[],
    isRequired: boolean,
    parentKeys?: string[],
}

export type SheetItemValue = {
    value?: string,
    values?: string[],
    latestInputDateTime: Date | undefined,
}

export type SheetItemType = "text" | "checkbox" | "radio" | "checklist";
