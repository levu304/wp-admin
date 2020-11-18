import React, { memo, useEffect } from "react";
import { useCategories } from "../hooks/categories";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setQuickEditCategoriesList } from "../redux/actions/quick-edit-post";

const ScrollView = styled.div`
  height: 20vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default memo(({ checks, ...other }) => {
  const { categories } = useCategories();
  const dispatch = useDispatch();
  const { quickEditCategoriesList } = useSelector(
    (state) => state.quickEditPost
  );

  useEffect(() => {
    const result = [];
    categories.forEach((cat) => {
      if (
        checks.length !== 0 &&
        typeof checks.find((ele) => ele.name === cat.name) !== "undefined"
      ) {
        result.push(true);
      } else {
        result.push(false);
      }
    });
    dispatch(setQuickEditCategoriesList([...result]));
  }, [checks, categories]);

  return (
    <Form.Control as={ScrollView} {...other}>
      {quickEditCategoriesList.map((value, index) => (
        <Form.Check
          key={index}
          checked={value}
          onChange={(e) => {
            quickEditCategoriesList[index] = e.target.checked;
            dispatch(setQuickEditCategoriesList([...quickEditCategoriesList]));
          }}
          label={<small>{categories[index].name}</small>}
        />
      ))}
    </Form.Control>
  );
});
