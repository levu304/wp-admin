import { memo } from "react";
import { useCategories } from "../hooks/categories";
import ScrollView from "./ScrollView";
import { Form } from "react-bootstrap";

export default memo(({ data, onChange, ...other }) => {
  const { categories } = useCategories();

  return (
    <ScrollView {...other}>
      {data.map((value, index) => (
        <Form.Check
          key={index}
          checked={value}
          onChange={(e) => {
            onChange(index, e.target.checked);
          }}
          label={<small>{categories[index].name}</small>}
        />
      ))}
    </ScrollView>
  );
});
