import { Button, styled } from "@mui/material";
// import { useCurrentCheckSheet } from "./useCurrentCheckSheet";
import { SheetEditor } from "./SheetEditor";
import { useEffect, useState } from "react";
import { Sheet } from "../../types/types";
import { useCurrentSheet } from "./useCurrentCheckSheet";
import { SheetView } from "./SheetView";

const Container = styled("div")(({ theme }) => ({

    width: "100%",
    height: "100%",

}));

export const SheetContainer = (props: { isEditMode: boolean }) => {

    const [isEditMode, setIsEditMode] = useState(true);

    // const { isEditMode } = props;
    // const { sheets } = useCheckSheet();

    const newSheet : Sheet = {
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

    const hook = useCurrentSheet({ sheet: newSheet });
    const { target } = hook;

    useEffect(() => {
        // setSheet(newSheet);
        // setSheet(sheets[0]);
    }, [])

    // if (sheets.length > 0) setSheet(sheets[0]);

    // useEffect(() => {
    //     console.log(sheets);
    //     setSheet(sheets[0]);
    // }, [])

    const handleClick = () => {
        setIsEditMode(b => !b);
    }

    return <>
        <Container>
            <Button onClick={handleClick}>AAA</Button>
            { isEditMode && target && <SheetEditor currentSheet={target} { ...hook }></SheetEditor> }
            { !isEditMode && target && <SheetView currentSheet={target} { ...hook }></SheetView> }
        </Container>
    </>
        
}