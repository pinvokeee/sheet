import { useCallback, useEffect, useRef, useState } from "react";
import { Sheet, SheetItem, SheetItemValue } from "../../types/types"

export const useCurrentSheet = (props: { sheet: Sheet }) => {

    const [target, setTarget] = useState<Sheet>(props.sheet);
    const getSheet = () => target;
    const setSheet = (targetSheet: Sheet) => setTarget(targetSheet);

    const [values, setValues] = useState<[string, SheetItemValue][]>([]);

    const addSheetItem = (newItem: SheetItem) => {
        setTarget(sheet => ({ ...sheet, items: [...sheet.items, newItem] }));
    }

    const changeSheetItem = useCallback((targetItem: SheetItem, changeFunc: (item: SheetItem) => SheetItem) => {        
        const newItem = changeFunc(targetItem);
        setTarget(target => ({ ...target, items: target.items.map(item => item.key == newItem.key ? newItem : item) }));
        return newItem;
    }, []);

    // const setValue = (targetItem: SheetItem, changeFunc: (valueItem: SheetItemValue) => SheetItemValue) => {
    //     const newValueItem = changeFunc(getValue(targetItem));
    //     const targetValueItem = values.find(([key]) => targetItem.key == key);

    //     if (!targetValueItem) { 
    //         setValues(vals => [...vals, [targetItem.key, newValueItem]]);
    //         return newValueItem;
    //     }
        
    //     targetValueItem[1] = newValueItem;

    //     return newValueItem;
    // }

    // const getValue = (targetItem: SheetItem) : any => {
    //     const val = values.find(([key, value]) => targetItem.key == key);
    //     if (val) return val[1];
    //     return undefined;
    // }

    return {
        target,
        getSheet,
        setSheet,
        values,
        addSheetItem,
        changeSheetItem,
        // getValue,
        // setValue,
    }
}