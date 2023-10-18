import { useState } from "react";
import { Sheet } from "../../types/types"

export const useCurrentCheckSheet = () => {

    const [targetSheet, setTargetSheet] = useState<Sheet>();

    const setSheet = (sheet: Sheet) => {
        setTargetSheet(sheet);
    }

    return {
        targetSheet,
        setSheet,
    }
}