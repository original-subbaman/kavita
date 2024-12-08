import { Select } from "@radix-ui/themes";
const CustomSelect = ({ defaultValue, label, size, values, triggerClass }) => {
  return (
    <Select.Root defaultValue={defaultValue} size={size}>
      <Select.Trigger className={triggerClass} />
      <Select.Content className="h-[40px]">
        <Select.Group>
          {label && <Select.Label>{label}</Select.Label>}
          {values.map((value) => (
            <Select.Item key={value} value={value}>
              {value}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default CustomSelect;
