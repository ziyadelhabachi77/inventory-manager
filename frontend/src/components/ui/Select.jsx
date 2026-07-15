import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

function SelectInput({
  state,
  setState,
  className,
  options,
  placeholder,
  isDisabled = false,
  isLoading,
}) {
  return (
    <FormControl sx={{ minWidth: "100%" }}>
      <Select
        value={state?.category ?? state}
        name="category"
        onChange={setState}
        displayEmpty
        input={
          <OutlinedInput
            sx={{
              height: 30,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        }
        sx={{
          height: "30px",
          paddingLeft: "20px",
          "& .MuiOutlinedInput-input": {
            color: "black",
          },
          ".dark & .MuiOutlinedInput-input": {
            color: "white",
          },
          ".dark & .MuiSelect-icon": {
            color: "white",
          },
        }}
        className={`ring-gray-400/70 ${className}`}
      >
        <MenuItem disabled={isDisabled} value="">
          {placeholder}
        </MenuItem>
        {!isLoading &&
          options?.map((item) => (
            <MenuItem key={item._id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default SelectInput;
