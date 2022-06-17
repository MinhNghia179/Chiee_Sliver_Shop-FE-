import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
}                             from "@mui/material";
import { useState }           from "react";
import { useDispatch }        from "react-redux";

import { setOrderByAction }   from "setup/redux/product/ProductAction";
import { useSelector }        from "setup";

const CheckSortPrice = () => {
  const dispatch = useDispatch();
  const orderBy = useSelector(state => state.product.OrderBy);
  const [value, setValue] = useState<string>(orderBy);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setValue(value);
    dispatch(setOrderByAction(value));
  };

  return (
    <div className="mt-3">
      <h6>Sắp xếp</h6>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="id desc"
          name="radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="id desc"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#f53d2d",
                  },
                }}
              />
            }
            label="Mặc định"
            className="check_box"
          />
          <FormControlLabel
            value="price"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#f53d2d",
                  },
                }}
              />
            }
            label="Giá tăng dần"
          />
          <FormControlLabel
            value="price desc"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#f53d2d",
                  },
                }}
              />
            }
            label="Giá giảm dần"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default CheckSortPrice;
