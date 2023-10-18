import { styled } from "@mui/material";
import { useCheckSheet } from "./useCheckSheet";
import { useCurrentCheckSheet } from "./useCurrentCheckSheet";
import { SheetEditor } from "./SheetEditor";
import { useEffect } from "react";

const Container = styled("div")(({ theme }) => ({

    width: "100%",
    height: "100%",

}));

export const SheetContainer = (props: { isEditMode: boolean }) => {

    const { isEditMode } = props;
    const { sheets } = useCheckSheet();
    const { targetSheet, setSheet } = useCurrentCheckSheet();

    useEffect(() => {
        setSheet(sheets[0]);
    }, [sheets])

    // if (sheets.length > 0) setSheet(sheets[0]);

    // useEffect(() => {
    //     console.log(sheets);
    //     setSheet(sheets[0]);
    // }, [])

    return <>
        <Container>
            { isEditMode && targetSheet && <SheetEditor currentSheet={targetSheet}></SheetEditor> }

        </Container>
    </>
        
}