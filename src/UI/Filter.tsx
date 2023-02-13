import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const productsValueFilter = [
  "Value1",
  "Value2",
  "Value3",
  "Value4",
  "Value5",
  "Value6",
  "Value7",
];

export default function MultipleSelectCheckmarks() {
  const [productName, setProductName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof productName>) => {
    const {
      target: { value },
    } = event;
    setProductName(typeof value === "string" ? value.split(",") : value);
  };
  console.log(productName);
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={productName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {productsValueFilter.map((product) => (
            <MenuItem key={product} value={product}>
              <Checkbox checked={productName.indexOf(product) > -1} />
              <ListItemText primary={product} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
