import { Button, Card, Checkbox, FormControlLabel, Grid, MenuItem, Select, Stack, TextField, styled } from "@mui/material";
import { Sheet, SheetItem } from "../../types/types";

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

const Selectors = (props: { items: string[] }) => {


    return <>
        <Flex>
            { props.items.map((item, index) => <Item>
                <Label>選択肢{index+1}</Label>
                <TextField key={item} value={item} />
                </Item>) }
        </Flex>
    </>
}

const SheetItemElement = (props: { target: SheetItem }) => {

    const item = props.target;

    return <>
        <Card sx={{padding: "16px"}}>
            <Flex>
                <Item> 
                    <Label>項目</Label>
                    <TextField value={item.name} />
                </Item>

                <Item> 
                    <Label>タイプ</Label>
                    <Select value={item.type}>
                        <MenuItem value="text">テキスト</MenuItem>
                        <MenuItem value="checkbox">チェックボックス</MenuItem>
                        <MenuItem value="radio">ラジオボタン</MenuItem>
                    </Select>
                </Item>

                { (item.type == "radio" || item.type == "checkbox") && <Selectors items={item.selector} /> }

                <Item> 
                    <FormControlLabel label="必須項目" control={<Checkbox checked={item.isRequired}/>}/>
                </Item>

            </Flex>
        </Card>
    </>
}

export const SheetEditor = (props: { currentSheet: Sheet }) => {

    const { items } = props.currentSheet;

    return <>
        <Container>
            <Stack gap={2}>
                { items.map(item => <SheetItemElement key={item.key} target={item} />) }
                <Button>追加</Button>
            </Stack>
        </Container>
    </>

}