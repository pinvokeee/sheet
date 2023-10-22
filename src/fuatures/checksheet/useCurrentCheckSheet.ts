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

    const changeSheetItem = useCallback((targetItem: SheetItem, changeFunc: (item: SheetItem) => SheetItem, isRefresh?: boolean) => {
        const newItem = changeFunc(targetItem);
        target.items = target.items.map(item => item.key == newItem.key ? newItem : item);;

        if (isRefresh) refreshSheet();

        return newItem;
    }, [target]);

    const refreshSheet = () => {
        setTarget(sheet => ({ ...sheet }));
    }

    const setValue = (targetItem: SheetItem, changeFunc: (valueItem: SheetItemValue) => SheetItemValue, isRefresh?: boolean) => {
        const newValueItem = changeFunc(getValue(targetItem));
        const targetValueItem = values.find(([key]) => targetItem.key == key);

        if (!targetValueItem) { 
            setValues(vals => [...vals, [targetItem.key, newValueItem]]);
            if (isRefresh) refreshSheet();
            return newValueItem;
        }
        
        targetValueItem[1] = newValueItem;

        if (isRefresh) refreshSheet();

        return newValueItem;
    }

    const getValue = (targetItem: SheetItem) : any => {
        const val = values.find(([key, value]) => targetItem.key == key);
        if (val) return val[1];
        return undefined;
    }

    return {
        target,
        getSheet,
        setSheet,
        values,
        addSheetItem,
        refreshSheet,
        changeSheetItem,
        getValue,
        setValue,
    }
}