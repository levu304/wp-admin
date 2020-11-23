import { useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import { useHistory } from "react-router-dom";
import { TAGS } from "../routes";
import FormTagNew from "../components/FormTagNew";
import TagsList from "../components/TagsList";

export default () => {
  const { push } = useHistory();

  const search = useCallback(
    (query) =>
      query !== "" &&
      push({
        pathname: TAGS,
        search: `search=${query}`,
      }),
    []
  );

  return (
    <Main>
      <PageTitle title="Tags" />
      <div>
        <SearchBar
          className="justify-content-end"
          buttonName="Search Tags"
          submit={search}
        />
      </div>

      <Row className="pt-3 pb-5">
        <Col lg={4}>
          <FormTagNew />
        </Col>
        <Col lg={8}>
          <TagsList />
        </Col>
      </Row>
    </Main>
  );
};
