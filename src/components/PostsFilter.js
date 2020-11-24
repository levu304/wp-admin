import { useState, useMemo, memo, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useLocation } from "react-router-dom";
import { paramsToObject } from "../common";
import { useCategories } from "../hooks/categories";
import { startOfMonth, endOfMonth, formatRFC3339 } from "date-fns";

export default memo(({ onFilter }) => {
  const { search } = useLocation();
  const params = useMemo(() => (search === "" ? {} : paramsToObject(search)), [
    search,
  ]);
  const { categories } = useCategories();

  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (typeof params["categories[]"] === "undefined") {
      setCategory("");
      return;
    }
    setCategory(params["categories[]"]);
  }, [params]);

  const filter = () => {
    const before = formatRFC3339(endOfMonth(date));
    const after = formatRFC3339(startOfMonth(date));
    onFilter(category, { before, after });
  };

  return (
    <Form inline>
      <DatePicker
        className="form-control form-control-sm mr-sm-1"
        selected={date}
        onChange={setDate}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <Form.Control
        as="select"
        size="sm"
        custom
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="text-capitalize mr-sm-1"
      >
        <option value="">All Categories</option>
        {categories.map(({ name, id }) => (
          <option key={id} value={id} className="text-capitalize">
            {name}
          </option>
        ))}
      </Form.Control>
      <Button
        variant="outline-primary"
        size="sm"
        onClick={(e) => filter(category)}
      >
        Filter
      </Button>
    </Form>
  );
});
