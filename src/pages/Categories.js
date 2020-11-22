import { useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import CategoriesList from "../components/CategoriesList";
import FormCategoryNew from "../components/FormCategoryNew";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import { useHistory } from "react-router-dom";
import { CATEGORIES } from "../routes";

export default () => {
  const { push } = useHistory();

  const search = useCallback(
    (query) =>
      query !== "" &&
      push({
        pathname: CATEGORIES,
        search: `search=${query}`,
      }),
    []
  );

  return (
    <Main>
      <PageTitle title="Categories" />
      <div>
        <SearchBar
          className="justify-content-end"
          buttonName="Search Categories"
          submit={search}
        />
      </div>

      <Row className="pt-3 pb-5">
        <Col lg={4}>
          <FormCategoryNew />
        </Col>
        <Col lg={8}>
          <CategoriesList />
        </Col>
      </Row>
    </Main>
  );
};
