import React, {
  memo,
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
  Fragment,
} from "react";
import { Button, Row, Col, Form, Spinner } from "react-bootstrap";
import { useClickOutside } from "../hooks/settings";
import CategoriesListSelector from "./CategoriesListSelector";
import DatePicker from "react-datepicker";
import { usePosts } from "../hooks/posts";
import { useCategories } from "../hooks/categories";
import { formatRFC3339 } from "date-fns";

export default memo(
  ({ row: { original }, rowProps, visibleColumns, onCancel }) => {
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, onCancel);

    const { authors, statuses, updated, updatePost, toggleUpdate } = usePosts();

    const id = useMemo(() => original.id, [original]);
    const [title, setTitle] = useState(original.title);
    const [slug, setSlug] = useState(original.slug);
    const [password, setPassword] = useState(original.password);
    const [status, setStatus] = useState(original.status);
    const [comment_status, setCommentStatus] = useState(
      original.comment_status
    );
    const [ping_status, setPingStatus] = useState(original.ping_status);
    const [tags, setTags] = useState(
      original.tags.map(({ name }) => name).join(", ")
    );
    const [author, setAuthor] = useState(original.author.id);
    const [date, setDate] = useState(new Date(original.date));
    const [sticky, setSticky] = useState(original.sticky);

    const { categories: categoriesList } = useCategories();
    const [categories, setCategories] = useState([]);

    const [submit, setSubmit] = useState(false);

    useEffect(() => {
      const result = [];
      categoriesList.forEach((cat) => {
        if (
          original.categories.length !== 0 &&
          typeof original.categories.find((ele) => ele.name === cat.name) !==
            "undefined"
        ) {
          result.push(true);
        } else {
          result.push(false);
        }
      });
      setCategories([...result]);
    }, [original.categories, categoriesList]);

    const onCategoriesChange = useCallback(
      (index, value) => {
        categories[index] = value;
        setCategories([...categories]);
      },
      [categories]
    );

    useEffect(() => {
      if (updated) {
        setSubmit(false);
        toggleUpdate();
        onCancel();
      }
    }, [updated]);

    const update = (e) => {
      e.preventDefault();
      if (!id) {
        return;
      }
      setSubmit(true);
      updatePost({
        id,
        title,
        slug,
        password,
        status,
        comment_status,
        ping_status,
        tags: tags.replace(" ", "").split(","),
        categories: categoriesList
          .filter((cat, index) => categories[index])
          .map(({ name }) => name),
        author,
        date: formatRFC3339(date),
        sticky: password !== "" ? null : sticky,
      });
    };

    return (
      <tr {...rowProps} ref={wrapperRef}>
        <td colSpan={visibleColumns.length}>
          <Row>
            <Col>
              <h6 className="text-uppercase">Quick Edit</h6>
              <Form.Group as={Row} className="align-items-center mb-0">
                <Form.Label column sm="2">
                  <small className="font-italic">Title</small>
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    size="sm"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="align-items-center mb-0">
                <Form.Label column sm="2">
                  <small className="font-italic">Slug</small>
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    size="sm"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="align-items-center mb-0">
                <Form.Label column sm="2">
                  <small className="font-italic">Date</small>
                </Form.Label>
                <Col sm="10">
                  <DatePicker
                    className="form-control form-control-sm"
                    selected={date}
                    showTimeSelect
                    onChange={(date) => setDate(date)}
                    dateFormat="yyyy/MM/dd HH:mm"
                    timeFormat="HH:mm"
                    timeIntervals={1}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="align-items-center mb-0">
                <Form.Label column sm="2">
                  <small className="font-italic">Author</small>
                </Form.Label>
                <Col sm="5">
                  <Form.Control
                    as="select"
                    size="sm"
                    custom
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  >
                    {authors.map(({ name, id }, index) => (
                      <option key={index} value={id}>
                        {name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="align-items-center mb-0">
                <Form.Label column sm="2">
                  <small className="font-italic">Password</small>
                </Form.Label>
                <Col sm="5">
                  <Form.Control
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="sm"
                    disabled={status === "private"}
                  />
                </Col>
                <Col sm="3" className="px-0 d-flex align-items-center">
                  <em>
                    <small>{"–OR–"} </small>
                  </em>
                  <Form.Check
                    inline
                    className="mr-0 ml-2"
                    checked={status === "private"}
                    value="private"
                    onChange={(e) => {
                      setStatus(
                        status === e.target.value ? "publish" : e.target.value
                      );
                      if (status !== e.target.value) {
                        setPassword("");
                      }
                    }}
                    label={<small>Private</small>}
                  />
                </Col>
              </Form.Group>
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

            <Col>
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
              <Form.Group>
                <Form.Check
                  inline
                  label={<small className="font-italic">Allow Comments</small>}
                  value="open"
                  checked={comment_status === "open"}
                  onChange={(e) =>
                    setCommentStatus(
                      comment_status === e.target.value
                        ? "closed"
                        : e.target.value
                    )
                  }
                />
                <Form.Check
                  inline
                  label={<small className="font-italic">Allow Pings</small>}
                  value="open"
                  checked={ping_status === "open"}
                  onChange={(e) =>
                    setPingStatus(
                      ping_status === e.target.value ? "closed" : e.target.value
                    )
                  }
                />
              </Form.Group>
              <Form.Group as={Row} className="align-items-center mb-0">
                <Form.Label column sm="1">
                  <small className="font-italic">Status</small>
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    as="select"
                    size="sm"
                    custom
                    value={status}
                    onChange={(e) =>
                      status !== "private"
                        ? setStatus(e.target.value)
                        : setStatus("private")
                    }
                  >
                    {statuses
                      .filter(({ key }) => key !== "private")
                      .map(({ key, name }) => (
                        <option key={key} value={key}>
                          {name}
                        </option>
                      ))}
                  </Form.Control>
                </Col>
                <Col sm="4">
                  <Form.Check
                    inline
                    label={
                      <small className="font-italic">
                        Make this post sticky
                      </small>
                    }
                    checked={sticky}
                    onChange={(e) => setSticky(e.target.checked)}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex flex-row justify-content-between mt-2">
            <Button variant="outline-primary" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={submit}
              size="sm"
              onClick={update}
            >
              {submit ? (
                <Fragment>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Update
                </Fragment>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </td>
      </tr>
    );
  }
);
