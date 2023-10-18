export type Sheet = {
    key: string,
    items: SheetItem[],
}

export type SheetItem = {
    key: string, 
    name: string,
    type: "text" | "checkbox" | "radio",
    selector: string[],
    isRequired: boolean,
}

export type SheetItemValue = {
    value: string,
    latestInputDateTime: Date,
}

