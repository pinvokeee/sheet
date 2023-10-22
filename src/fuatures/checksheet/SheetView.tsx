import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, styled } from "@mui/material";
import { Sheet, SheetItem, SheetItemValue } from "../../types/types"
import { useState } from "react";

const Label = styled("div")(({theme}) => ({

}));

const IsRequiredLabel = styled("div")(({theme}) => ({
    marginLeft: "auto",
    color: "gray",
    fontSize: "80%",
}));

const TitleBox = styled("div")(({theme}) => ({
    display: "flex",
    // width: "100%",
    borderLeft: "solid 4px #8ed1fc",
    paddingLeft: "8px",
    margin: "8px 0px 8px 0px",
}));

const Title = (props: { item: SheetItem, children?: React.ReactNode }) => {

    const { item, children } = props;

    return <>
        <TitleBox>
            <Label>{item.name}</Label>
            { item.isRequired && <IsRequiredLabel>*必須項目</IsRequiredLabel> }
            { children }
        </TitleBox>
    </>
}

const SheetItemCheckBox = (props: { item: SheetItem, valueItem: SheetItemValue, onChange: (newValueItem: SheetItemValue) => void }) => {

    const { item } = props;

    return <>
        <TitleBox>
            <FormControlLabel label={item.name} control={<Checkbox />} />
            { item.isRequired && <IsRequiredLabel>*必須項目</IsRequiredLabel> }
        </TitleBox>
    </>
}

const SheetItemCheckList = (props: { item: SheetItem, valueItem: SheetItemValue, onChange: (newValueItem: SheetItemValue) => void }) => {

    const { item } = props;
    const [check, setCheck] = useState(props.valueItem?.values ?? []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {

        const currentValue = event.target.value;
        let newValues : string[] = [];
        
        if (!check.includes(currentValue) && checked) newValues = [...check, currentValue];
        if (check.includes(currentValue) && !checked) newValues = check.filter(testv => testv != currentValue);

        setCheck(newValues);

        props.onChange({ values: newValues, latestInputDateTime: new Date() });
    }

    return <>
    <Box>
        <Title { ...props } />
        <Box sx={{ marginLeft: "32px" }}>
            { item.selector.map((value, index) => <Box>
                <FormControlLabel key={index} label={value} control={<Checkbox value={value} checked={check.includes(value)} onChange={handleChange} />} />
            </Box>) }
        </Box>        
    </Box>
    </>
}

const SheetItemRadioList = (props: { item: SheetItem, valueItem: SheetItemValue, onChange: (newValueItem: SheetItemValue) => void }) => {

    const { item } = props;
    const [currentValue, setValue] = useState(props.valueItem?.value ?? "");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const value = event.target.value;
        setValue(value);
        props.onChange({ value: value, latestInputDateTime: new Date() });
    }

    return <>
    <Box>
        <Title { ...props } />
        <Box sx={{ marginLeft: "32px" }}>
            <RadioGroup name={item.key}>
            { item.selector.map((value, index) => <Box>
                <FormControlLabel key={index} label={value} value={value} control={<Radio checked={value == currentValue} onChange={handleChange} />} />
            </Box>) }
            </RadioGroup>
        </Box>
    </Box>
    </>
}


const SheetItemTextField = (props: { item: SheetItem, valueItem: SheetItemValue, onChange: (newValueItem: SheetItemValue) => void }) => {

    const { item } = props;
    const [value, setValue] = useState(props.valueItem?.value ?? "");

    const handleChange = (e: any) => {
        setValue(e.target.value);
        props.onChange({ value: e.target.value, latestInputDateTime: new Date() });
    }

    return <>
    <Box>
        <Title { ...props } />
        <Box sx={{ marginLeft: "32px" }}>
            <TextField value={value} onChange={handleChange}></TextField>
        </Box>
    </Box>
    </>
}

const SheetItemElement = (props: { item: SheetItem,  valueItem: SheetItemValue, onChange: (item: SheetItem, newValueItem: SheetItemValue) => void }) => {

    const { item, valueItem } = props;

    const handleChange = (value: SheetItemValue) => {
        props.onChange(item, value);
    }

    const el_props = {
        item, valueItem, onChange: handleChange,
    }

    return <>
        <Box sx={{ padding: "8px" }}>
            <Box>
                { item.type == "text" && <SheetItemTextField {...el_props} /> }
                { item.type == "checkbox" && <SheetItemCheckBox {...el_props} /> }
                { item.type == "checklist" && <SheetItemCheckList {...el_props} /> }
                { item.type == "radio" && <SheetItemRadioList {...el_props} /> }
            </Box>
        </Box>
    </>
}

type ISheetViewProps = {
    currentSheet: Sheet,

    getValue: (targetItem: SheetItem) => SheetItemValue,
    setValue: (targetItem: SheetItem, changeFunc: (value: SheetItemValue) => SheetItemValue) => SheetItemValue,
}

export const SheetView = (props: ISheetViewProps) => {

    const { currentSheet, getValue, setValue } = props;
    const { items } = currentSheet;

    const handleChange = (item: SheetItem, newValueItem: SheetItemValue) => {
        setValue(item, () => newValueItem);
    }

    return <>
    
        { items.map(item => <SheetItemElement key={item.key} item={item} valueItem={getValue(item)} onChange={handleChange} {...props} />) }
    </>
}