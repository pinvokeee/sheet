import { useEffect, useState } from "react"
import { Sheet, SheetItemValue } from "../../types/types"

export const useCheckSheet = () => {

    const [sheets, setSheets] = useState<Sheet[]>([]);
    const [sheetItemValues, setSheetItemValues] = useState<[string, SheetItemValue][]>([]);

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

    }

}