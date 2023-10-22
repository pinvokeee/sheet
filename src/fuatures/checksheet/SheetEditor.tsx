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

const Title = styled("p")(({ theme }) => ({
    minWidth: "200px",
    padding: "4px",
}));

const Label = (props: { children?: React.ReactNode }) => {
    return <div><Title>{ props.children }</Title></div>
}

const Selectors = (props: { items: string[], onChange: (newSelector: string[]) => void }) => {

    const [ itemNames, setItemNames ] = useState(props.items);

    // const handleBlur = (index: number, value: string) => {
    const handleBlur = () => {
        props.onChange([...itemNames]);
    }

    // const handleChange = () => {
    const handleChange = (index: number, value: string) => {
        setItemNames([...props.items.map((v, i) => i == index ? value : v)]);        
        // props.onChange([...props.items.map((v, i) => i == index ? value : v)]);
    }

    const handleClick = () => {
        props.onChange([...props.items, ""]);
    }

    return <>
        <Flex>
            { props.items.map((item, index) => <Item key={index}>
                <Label>選択肢{index+1}</Label>
                <TextField key={index} value={itemNames[index] ?? ""} onChange={(e) => handleChange(index, e.target.value)} onBlur={handleBlur} />
                {/* <TextField key={index} value={item} onBlur={handleBlur} onChange={(e) => handleChange(index, e.target.value)} /> */}
                </Item>) }
            <Item><Button onClick={handleClick}>選択肢を追加</Button></Item>
        </Flex>
    </>
}

const ParentItemSelector = React.memo((props: { parentItem: SheetItem, listItems: SheetItem[], selectKeys: string[] | undefined, onChange: (newSelector: string[]) => void }) => {

    const { parentItem, listItems, selectKeys } = props;

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
                <Label>依存項目{index+1}</Label>
                <Select value={item} onChange={(e) => handleChange(index, e.target.value as string)} >
                    { listItems.map((item, nindex) => item.key != parentItem.key && <MenuItem key={item.key} value={item.key}>{nindex+1}.{item.name}</MenuItem>) }
                </Select>
                {/* <TextField key={index} value={item} onChange={(e) => handleChange(index, e.target.value)} /> */}
                </Item>) : <></> }
            <Item><Button onClick={handleClick}>依存項目を追加</Button></Item>
        </Flex>
    </>
})

const SheetItemElementContainer = (props: { children: React.ReactNode }) => {

    return (
        <Card sx={{padding: "16px"}}>
            <Flex>
                {props.children}
            </Flex>
        </Card>
    )
};

type ISheetItemElementProps = {
    index: number,
    item: SheetItem,
    changeSheetItem: (targetItem: SheetItem, changeFunc: (item: SheetItem) => SheetItem, isRefresh?: boolean) => SheetItem,
}

const SheetItemElement = React.memo((props: ISheetItemElementProps) => {

    const { index, item, changeSheetItem } = props;
    const [ itemName, setItemName ] = useState(props.item.name ?? "");
    const [ itemRegexText, setItemRegexText ] = useState(item.validateRegex ?? "");
    const [ itemValidateErrorMessage, setItemValidateErrorMessage ] = useState(item.validateErrorMessage ?? "");

    const handleChange = (event: any) => {
        setItemName(event.target.value);
    }

    const handleNameBlur = (event: any) => {
        changeSheetItem(item, (target) => ({ ...target, name: itemName }));
    }

    const handleChangeSelection = (event: SelectChangeEvent<SheetItemType>) => {
        changeSheetItem(item, (target) => ({ ...target, type: event.target.value as SheetItemType }));
    }

    const handleChangeIsRequired = (event: any) => {
        changeSheetItem(item, (target) => ({ ...target, isRequired: event.target.checked }));
    }

    const handleChangeSelector = (selector: string[]) => {
        changeSheetItem(item, (target) => ({ ...target, selector }));
    }

    const handleChangeValidate = (event: any) => {
        changeSheetItem(item, (target) => ({ ...target, isValidate: event.target.checked }));
    }

    const handleRegexChange = (event: any) => {
        setItemRegexText(event.target.value);
    }

    const handleRegexBlur = (event: any) => {
        changeSheetItem(item, (target) => ({ ...target, validateRegex: itemRegexText }));
    }

    const handleValidateErrorMessageChange = (event: any) => {
        setItemValidateErrorMessage(event.target.value);
    }

    const handleValidateErrorMesssageBlur = (event: any) => {
        changeSheetItem(item, (target) => ({ ...target, validateErrorMessage: itemValidateErrorMessage }));
    }

    return <>

        <h2>{index+1}. {itemName}</h2>

        <Item> 
            <FormControlLabel sx={{userSelect: "none"}} label="必須項目" control={<Checkbox checked={item.isRequired} onChange={handleChangeIsRequired}/>}/>
        </Item>

        <Item> 
            <Label>項目</Label>
            <TextField value={itemName} onChange={handleChange} onBlur={handleNameBlur}/>
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

        { item.type == "text" && 
            <Item>
                <Label></Label>
                <FormControlLabel label="入力内容を正規表現で検証する" control={<Checkbox checked={item.isValidate ?? false} onChange={handleChangeValidate} />} />
            </Item>
        }
        
        { item.type == "text" && item.isValidate && <>        
            <Item>
                <Label>正規表現</Label>
                <TextField value={itemRegexText} onChange={handleRegexChange} onBlur={handleRegexBlur}></TextField>
            </Item>
            <Item>
                <Label>不一致時のエラー文</Label>
                <TextField value={itemValidateErrorMessage} onChange={handleValidateErrorMessageChange} onBlur={handleValidateErrorMesssageBlur}></TextField>
            </Item>
            </>
        }

        { (item.type == "radio" || item.type == "checklist") && <Selectors items={item.selector} onChange={handleChangeSelector} /> }

    </>
} );

type ISheetEditorProps = {
    currentSheet: Sheet, 
    addSheetItem: (newItem: SheetItem) => void, 
    changeSheetItem: (targetItem: SheetItem, changeFunc: (item: SheetItem) => SheetItem) => SheetItem,
}

export const SheetEditor = (props: ISheetEditorProps) => {

    const { changeSheetItem } = props;
    const { items } = props.currentSheet;

    const handleClick = () => {
        props.addSheetItem( { key: crypto.randomUUID(), name: `新規項目${items.length}`, isRequired: true, type: "text", selector: [] } );
    }

    // console.log("RENDER_EDITOR");

    const prop = { 
        changeSheetItem 
    }

    const handleChangeParentSelector = (item: SheetItem, parentKeys: string[]) => {
        changeSheetItem(item, (target) => ({ ...target, parentKeys}));
    }

    return <>
        <Container>
            <Stack gap={2}>
                { items.map((item, index) => (
                    <SheetItemElementContainer key={item.key}>
                        <SheetItemElement key={item.key} index={index} item={item} {...prop} />
                        <ParentItemSelector parentItem={item} listItems={items} selectKeys={item.parentKeys} onChange={(parkeys) => handleChangeParentSelector(item, parkeys)} />
                    </SheetItemElementContainer>
                    )) 
                }
                <Button onClick={handleClick}>追加</Button>
            </Stack>
        </Container>
    </>

}