import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

interface IProps {
  id:string;
  errors?: any;
  touched?: any;
  value: any;
  label:string;
  changeValue: ( value: any) => void;
}

const InputPassword = (props: IProps) => {
  const {id, value, label, errors, touched, changeValue } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => setShowPassword((prev: boolean) => !prev);

  return (
    <FormControl className="w-100 bg-white" variant="outlined">
      <InputLabel
        error={errors && touched ? true : false}
        htmlFor="outlined-adornment-password"
      >
        {label}
      </InputLabel>
      <OutlinedInput
        error={errors && touched ? true : false}
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(event) => changeValue(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              onClick={handleShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {errors && touched && (
        <FormHelperText error id="accountId-error">
          {errors}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputPassword;
