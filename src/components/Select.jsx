import { Select } from "@radix-ui/themes";
const CustomSelect = ({
  defaultValue,
  label,
  size,
  onValueChange,
  value,
  values,
  triggerClass,
}) => {
  return (
    <Select.Root
      onValueChange={onValueChange}
      size={size}
      defaultValue={defaultValue}
    >
      <Select.Trigger className={triggerClass} />
      <Select.Content className="">
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
