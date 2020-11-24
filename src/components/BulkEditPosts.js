import { memo, useEffect, useCallback, useState, Fragment } from "react";
import { Button, Row, Col, Form, Spinner } from "react-bootstrap";
import { useCategories } from "../hooks/categories";
import { usePosts } from "../hooks/posts";
import CategoriesListSelector from "./CategoriesListSelector";
import ScrollView from "./ScrollView";
import { FaTimesCircle } from "react-icons/fa";

export default memo(({ rows, columns, onCancel, onRemove, ...other }) => {
  const { categories: categoriesList } = useCategories();
  const { authors, statuses } = usePosts();

  const [categories, setCategories] = useState([]);

  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("-1");
  const [comments, setComments] = useState("-1");
  const [pings, setPings] = useState("-1");
  const [status, setStatus] = useState("-1");
  const [sticky, setSticky] = useState("-1");

  useEffect(() => {
    const result = categoriesList.map((cat) => false);
    setCategories([...result]);
  }, [categoriesList]);

  const onCategoriesChange = useCallback(
    (index, value) => {
      categories[index] = value;
      setCategories([...categories]);
    },
    [categories]
  );

  const renderSelectedRow = useCallback(
    ({ original: { title }, id }) => (
      <div key={id}>
        <small className="d-flex flex-row align-items-center">
          <FaTimesCircle
            size="1.2em"
            className="mr-1"
            onClick={() => onRemove(id)}
          />
          <span>{title}</span>
        </small>
      </div>
    ),
    []
  );

  return (
    <tr {...other}>
      <td colSpan={columns}>
        <Row>
          <Col>
            <Form.Label>
              <small className="font-weight-bold">BULK EDIT</small>
            </Form.Label>
            <ScrollView>{rows.map(renderSelectedRow)}</ScrollView>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>
                <small className="font-italic">Categories</small>
              </Form.Label>
              <CategoriesListSelector
                data={categories}
                onChange={onCategoriesChange}
              />
            </Form.Group>
          </Col>
          <Col lg={5}>
            <Form.Group>
              <Form.Label>
                <small className="font-italic">Tags</small>
              </Form.Label>
              <Form.Control
                as="textarea"
                size="sm"
                rows={2}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col lg={6}>
                <Form.Group as={Row} className="align-items-center mb-0">
                  <Form.Label column lg="3">
                    <small>Author</small>
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      as="select"
                      size="sm"
                      custom
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    >
                      <option value="-1">— No Change —</option>
                      {authors.map(({ name, id }, index) => (
                        <option key={index} value={id}>
                          {name}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group as={Row} className="align-items-center mb-0">
                  <Form.Label column lg="3">
                    <small>Comments</small>
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      as="select"
                      size="sm"
                      custom
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    >
                      <option value="-1">— No Change —</option>
                      <option value="open">Allow</option>
                      <option value="closed">Do not allow</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  as={Row}
                  className="align-items-center justify-content-end mb-0"
                >
                  <Form.Label column lg="2">
                    <small>Pings</small>
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      as="select"
                      size="sm"
                      custom
                      value={pings}
                      onChange={(e) => setPings(e.target.value)}
                    >
                      <option value="-1">— No Change —</option>
                      <option value="open">Allow</option>
                      <option value="closed">Do not allow</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group as={Row} className="align-items-center mb-0">
                  <Form.Label column lg="3">
                    <small>Status</small>
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      as="select"
                      size="sm"
                      custom
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="-1">— No Change —</option>
                      {statuses.map(({ key, name }) => (
                        <option key={key} value={key}>
                          {name}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  as={Row}
                  className="align-items-center justify-content-end mb-0"
                >
                  <Form.Label column lg="2">
                    <small>Sticky</small>
                  </Form.Label>
                  <Col lg="8">
                    <Form.Control
                      as="select"
                      size="sm"
                      custom
                      value={sticky}
                      onChange={(e) => setSticky(e.target.value)}
                    >
                      <option value="-1">— No Change —</option>
                      <option value="">Sticky</option>
                      <option value="closed">Not Sticky</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="d-flex flex-row justify-content-between mt-2">
          <Button variant="outline-primary" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            //   disabled={submit}
            size="sm"
            //   onClick={update}
          >
            {
              //   submit ? (
              //     <Fragment>
              //       <Spinner
              //         as="span"
              //         animation="border"
              //         size="sm"
              //         role="status"
              //         aria-hidden="true"
              //       />
              //       Update
              //     </Fragment>
              //   ) : (
              "Update"
              //   )
            }
          </Button>
        </div>
      </td>
    </tr>
  );
});
