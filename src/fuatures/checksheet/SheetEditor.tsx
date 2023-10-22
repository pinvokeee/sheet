import { Button, Card, Checkbox, FormControlLabel, Grid, Menu, MenuItem, Select, SelectChangeEvent, Stack, TextField, styled } from "@mui/material";
import { Sheet, SheetItem, SheetItemType } from "../../types/types";
import { useState } from "react";
import React from "react";

const Container = styled("div")(({ theme }) => ({

    width: "100%",
    height: "100%",

}));

const Flex = styled("div")(({ theme }) => ({

    display: "flex",
    flexDirection: "column",
    gap: "8px",
}));

const Item = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
}));

const Label = styled("div")(({ theme }) => ({
    minWidth: "100px",
    padding: "4px",
}));

// const SelectorsBase = <T,>(props: { label: string, items: T[], onChange: (newSelector: string[]) => void, controls: React.ReactNode }) => {

//     const { label, controls } = props;

//     const handleChange = (index: number, value: string) => {
//         props.onChange([...props.items.map((v, i) => i == index ? value : v)]);
//     }

//     const handleClick = () => {
//         props.onChange([...props.items, ""]);
//     }

//     return <>
//         <Flex>
//             { props.items.map((item, index) => <Item>
//                 <Label>{label}{index+1}</Label>
//                 { controls }
//                 </Item>) }
//             <Item><Button onClick={handleClick}>選択肢を追加</Button></Item>
//         </Flex>
//     </>
// }

const Selectors = (props: { items: string[], onChange: (newSelector: string[]) => void }) => {

    const handleChange = (index: number, value: string) => {
        props.onChange([...props.items.map((v, i) => i == index ? value : v)]);
    }

    const handleClick = () => {
        props.onChange([...props.items, ""]);
    }

    return <>
        <Flex>
            { props.items.map((item, index) => <Item key={index}>
                <Label>選択肢{index+1}</Label>
                <TextField key={index} value={item} onChange={(e) => handleChange(index, e.target.value)} />
                </Item>) }
            <Item><Button onClick={handleClick}>選択肢を追加</Button></Item>
        </Flex>
    </>
}

const ParentItemSelector = (props: { listItems: SheetItem[], selectKeys: string[] | undefined, onChange: (newSelector: string[]) => void }) => {

    const { listItems, selectKeys } = props;

    const handleChange = (index: number, value: string) => {
        if (props.selectKeys == undefined) return props.onChange([value]);
        props.onChange([...props.selectKeys.map((v, i) => i == index ? value : v)]);
    }

    const handleClick = () => {
        if (!selectKeys) return props.onChange([""]);
        props.onChange([...selectKeys.map((item) => item), ""]);
    }

    return <>
        <Flex>
            { selectKeys ? selectKeys.map((item, index) => <Item key={index}>
                <Label>親項目{index+1}</Label>
                <Select value={item} onChange={(e) => handleChange(index, e.target.value as string)} >
                    { listItems.map(item => <MenuItem key={item.key} value={item.key}>{item.name}</MenuItem>) }
                </Select>
                {/* <TextField key={index} value={item} onChange={(e) => handleChange(index, e.target.value)} /> */}
                </Item>) : <></> }
            <Item><Button onClick={handleClick}>親項目を追加</Button></Item>
        </Flex>
    </>
}

type ISheetItemElementProps = {
    item: SheetItem, 
    // changeSheetItem: (targetItem: SheetItem, changeFunc: (item: SheetItem) => SheetItem, isRefresh?: boolean) => SheetItem,
    // refreshSheet: () => void,
    // items: SheetItem[],
    // changeSheetItem: (targetItem: SheetItem, name: keyof SheetItem, newValue: never) => SheetItem | undefined,
}

const SheetItemElement = React.memo((props: ISheetItemElementProps) => {

    // const { items, refreshSheet } = props;
    const [item, setItem] = useState(props.item);

    console.log("TEST");

    const handleChange = (event: any) => {
        setItem({ ...item, name: event.target.value });
        // setItem(props.changeSheetItem(item, (target) => ({ ...target, name: event.target.value }), true));
    }

    const handleNameBlur = (event: any) => {
        // setItem(props.changeSheetItem(item, (target) => ({ ...target, name: event.target.value }), true));
    }

    const handleChangeSelection = (event: SelectChangeEvent<SheetItemType>) => {
        // setItem(props.changeSheetItem(item, (target) => ({ ...target, type: event.target.value as SheetItemType })));
    }

    const handleChangeIsRequired = (event: any) => {
        // setItem(props.changeSheetItem(item, (target) => ({ ...target, isRequired: event.target.checked })));
    }

    const handleChangeSelector = (selector: string[]) => {
        // setItem(props.changeSheetItem(item, (target) => ({ ...target, selector})));
    }

    const handleChangeParentSelector = (parentKeys: string[]) => {
        console.log(parentKeys);
        // setItem(props.changeSheetItem(item, (target) => ({ ...target, parentKeys})));
    }

    return <>
        <Card sx={{padding: "16px"}}>
            <Flex>
                <Item> 
                    <FormControlLabel sx={{userSelect: "none"}} label="必須項目" control={<Checkbox checked={item.isRequired} onChange={handleChangeIsRequired}/>}/>
                </Item>

                <Item> 
                    <Label>項目</Label>
                    <TextField name="name" value={item.name} onChange={handleChange} onBlur={handleNameBlur}/>
                </Item>

                <Item> 
                    <Label>タイプ</Label>
                    <Select value={item.type} onChange={handleChangeSelection}>
                        <MenuItem value="text">テキスト</MenuItem>
                        <MenuItem value="checkbox">単一チェック</MenuItem>
                        <MenuItem value="checklist">チェックリスト</MenuItem>
                        <MenuItem value="radio">ラジオボタン</MenuItem>
                    </Select>
                </Item>

                { (item.type == "radio" || item.type == "checklist") && <Selectors items={item.selector} onChange={handleChangeSelector} /> }

                <Item> 
                    {/* <ParentItemSelector listItems={items} selectKeys={item.parentKeys} onChange={handleChangeParentSelector} /> */}
                </Item>

            </Flex>
        </Card>
    </>
});

type ISheetEditorProps = {
    currentSheet: Sheet, 
    addSheetItem: (newItem: SheetItem) => void, 
    refreshSheet: () => void,
    changeSheetItem: (targetItem: SheetItem, changeFunc: (item: SheetItem) => SheetItem, isRefresh?: boolean) => SheetItem,
}

export const SheetEditor = (props: ISheetEditorProps) => {

    const { items } = props.currentSheet;

    const handleClick = () => {
        props.addSheetItem( { key: crypto.randomUUID(), name: `新規項目${items.length}`, isRequired: true, type: "text", selector: [] } );
    }

    console.log("TESTA");

    return <>
        <Container>
            <Stack gap={2}>
                { items.map(item => <SheetItemElement key={item.key} item={item}  {...props} />) }
                <Button onClick={handleClick}>追加</Button>
            </Stack>
        </Container>
    </>

}