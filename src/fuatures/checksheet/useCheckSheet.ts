import { useCallback, useEffect, useState } from "react"
import { Sheet, SheetItem, SheetItemValue } from "../../types/types"

export const useCheckSheet = () => {

    const [sheets, setSheets] = useState<Sheet[]>([]);    
    const [currentSheet, setCurrentSheet] = useState<Sheet>();

    
    const [values, setValues] = useState<[string, SheetItemValue][]>([]);

    const registerSheet = useCallback((newSheet: Sheet) => {
        setSheets(sheets => [...sheets, newSheet]);
    }, []);

    const selectSheetFromIndex = useCallback((index: number) => {
        setCurrentSheet(sheets[index]);
    }, [sheets]);

    const setValue = useCallback((targetItem: SheetItem, changeFunc: (valueItem: SheetItemValue) => SheetItemValue) => {

        const newValueItem = changeFunc(getValue(targetItem));
 
        setValues(oldValues => {

            if (oldValues.some(([key]) => targetItem.key == key)) {
                return [...oldValues, [targetItem.key, newValueItem]];
            }

            return oldValues.map(([key, value]) => targetItem.key == key ? [key, newValueItem] : [key, value] );
        });
 
        // const targetValueItem = values.find(([key]) => targetItem.key == key);

        // if (!targetValueItem) { 
        //     setValues(vals => [...vals, [targetItem.key, newValueItem]]);
        //     return newValueItem;
        // }
        
        // setValues()

        // targetValueItem[1] = newValueItem;

        // return newValueItem;

        // const newValueItem = changeFunc(getValue(targetItem));
        // const targetValueItem = values.find(([key]) => targetItem.key == key);

        // console.log(values);

        // if (!targetValueItem) { 
        //     setValues(vals => [...vals, [targetItem.key, newValueItem]]);
        //     return newValueItem;
        // }
        
        // targetValueItem[1] = newValueItem;

        // return newValueItem;
    }, []);

    const getValue = useCallback((targetItem: SheetItem) : any => {
        const val = values.find(([key, value]) => targetItem.key == key);
        if (val) return val[1];
        return undefined;
    }, []);

    useEffect(() => 
    {
        console.log("NEW");
        add_newItem();

    }, []);

    const add_newItem = () => {

        const sheet : Sheet = {
            key: crypto.randomUUID(),
            items: [
                {
                    key: crypto.randomUUID(),
                    name: "テスト1",
                    type: "text",
                    selector: [],
                    isRequired: true,
                },

                {
                    key: crypto.randomUUID(),
                    name: "テスト2",
                    type: "text",
                    selector: [],
                    isRequired: true,
                },

                {
                    key: crypto.randomUUID(),
                    name: "テスト3",
                    type: "checkbox",
                    selector: ["チェック1", "チェック2", "チェック3"],
                    isRequired: true,
                }
            ]
        }

        setSheets(sh => {
            const a = [...sh, sheet];
            return [...sh, sheet];
        });


    }

    return {
        sheets, 

        registerSheet,
        selectSheetFromIndex,
        setValue,
        getValue,
    }

}