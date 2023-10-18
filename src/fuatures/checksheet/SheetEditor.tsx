import { Checkbox, FormControlLabel, MenuItem, Select, TextField, styled } from "@mui/material";
import { Sheet, SheetItem } from "../../types/types";

const Container = styled("div")(({ theme }) => ({

    width: "100%",
    height: "100%",

}));

const Selectors = (props: { items: string[] }) => {


    return <>
    </>
}

const Item = (props: { target: SheetItem }) => {

    const item = props.target;

    return <>
        <div>項目</div>
        <TextField value={item.name} />
        <div>タイプ</div>
        <Select value={item.type}>
            <MenuItem value="text">テキスト</MenuItem>
            <MenuItem value="checkbox">チェックボックス</MenuItem>
            <MenuItem value="radio">ラジオボタン</MenuItem>
        </Select>
        <FormControlLabel label="必須項目" control={<Checkbox value={item.isRequired}/>}/>
    </>
}

export const SheetEditor = (props: { currentSheet: Sheet }) => {

    const { items } = props.currentSheet;

    return <>
        <Container>
            { items.map(item => <Item key={item.key} target={item} />) }
        </Container>
    </>

}