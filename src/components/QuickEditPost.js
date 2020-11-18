import React, { memo, useRef, useEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { useClickOutside } from "../hooks/settings";
import CategoriesListSelector from "./CategoriesListSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuickEditInitState,
  setQuickEditCommentStatus,
  setQuickEditPassword,
  setQuickEditPingStatus,
  setQuickEditSlug,
  setQuickEditStatus,
  setQuickEditTags,
  setQuickEditTitle,
  setQuickEditAuthor,
  setQuickEditDate,
  setQuickEditSticky,
} from "../redux/actions/quick-edit-post";
import DatePicker from "react-datepicker";
import { usePosts } from "../hooks/posts";

export default memo(
  ({ row: { original }, rowProps, visibleColumns, onCancel }) => {
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, onCancel);
    const dispatch = useDispatch();
    const {
      id,
      title,
      slug,
      password,
      status,
      comment_status,
      ping_status,
      tags,
      author,
      date,
      sticky,
    } = useSelector((state) => state.quickEditPost);
    const { authors, statuses, updated, updatePost, toggleUpdate } = usePosts();

    useEffect(() => {
      if (updated) {
        toggleUpdate();
        onCancel();
      }
    }, [updated]);

    useEffect(() => {
      const {
        id,
        title,
        slug,
        password,
        status,
        comment_status,
        ping_status,
        tags,
        author,
        date,
        sticky,
      } = original;
      dispatch(
        setQuickEditInitState({
          id,
          title,
          slug,
          password,
          status,
          comment_status,
          ping_status,
          tags: tags.map(({ name }) => name).join(", "),
          author: author.id,
          date: new Date(date),
          sticky,
        })
      );
    }, [original]);

    const update = (e) => {
      e.preventDefault();
      if (!id) {
        return;
      }
      updatePost({
        id,
        title,
        slug,
        password,
        status,
        comment_status,
        ping_status,
        tags,
        author,
        date,
        sticky,
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
                    onChange={(e) =>
                      dispatch(setQuickEditTitle(e.target.value))
                    }
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
                    onChange={(e) => dispatch(setQuickEditSlug(e.target.value))}
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
                    onChange={(date) => dispatch(setQuickEditDate(date))}
                    dateFormat="yyyy/MM/dd hh:mm"
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
                    onChange={(e) =>
                      dispatch(setQuickEditAuthor(e.target.value))
                    }
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
                    onChange={(e) =>
                      dispatch(setQuickEditPassword(e.target.value))
                    }
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
                      dispatch(
                        setQuickEditStatus(
                          status === e.target.value ? "publish" : e.target.value
                        )
                      );
                      if (status !== e.target.value) {
                        dispatch(setQuickEditPassword(""));
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
                <CategoriesListSelector checks={original.categories} />
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
                  onChange={(e) => dispatch(setQuickEditTags(e.target.value))}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  inline
                  label={<small className="font-italic">Allow Comments</small>}
                  value="open"
                  checked={comment_status === "open"}
                  onChange={(e) =>
                    dispatch(
                      setQuickEditCommentStatus(
                        comment_status === e.target.value
                          ? "closed"
                          : e.target.value
                      )
                    )
                  }
                />
                <Form.Check
                  inline
                  label={<small className="font-italic">Allow Pings</small>}
                  value="open"
                  checked={ping_status === "open"}
                  onChange={(e) =>
                    dispatch(
                      setQuickEditPingStatus(
                        ping_status === e.target.value
                          ? "closed"
                          : e.target.value
                      )
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
                        ? dispatch(setQuickEditStatus(e.target.value))
                        : dispatch(setQuickEditStatus("private"))
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
                    onChange={(e) =>
                      dispatch(setQuickEditSticky(e.target.checked))
                    }
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex flex-row justify-content-between mt-2">
            <Button variant="outline-primary" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={update}>
              Update
            </Button>
          </div>
        </td>
      </tr>
    );
  }
);
