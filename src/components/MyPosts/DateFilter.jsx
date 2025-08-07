import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Flex, Text } from "@radix-ui/themes";
import StyledDatePicker from "./StyledDatePicker";
const DateFilter = ({ from, to, setFilterDate }) => {
  return (
    <Box my={"3"} className="mx-3 sm:mx-0">
      <Text className="self-center flex-1" color="green">
        Filter by date range
      </Text>
      <Flex gap="2" my={"3"} align={"center"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDatePicker
            value={from}
            onChange={(newDate) =>
              setFilterDate((prev) => ({ ...prev, from: newDate }))
            }
          />
        </LocalizationProvider>
        <Text className="text-[#2f7c57]">-</Text>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDatePicker
            disableFuture
            value={to}
            onChanged={(newDate) =>
              setFilterDate((prev) => ({ ...prev, to: newDate }))
            }
          />
        </LocalizationProvider>
      </Flex>
    </Box>
  );
};

export default DateFilter;
