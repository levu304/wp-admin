import React, { memo, useState, useMemo, useRef } from "react";
import { Button, Row, Col, Form, FormCheck } from "react-bootstrap";
import { useClickOutside } from "../hooks/settings";
import CategoriesListSelector from "./CategoriesListSelector";

export default memo(
  ({ row: { original }, rowProps, visibleColumns, onCancel }) => {
    // console.log(original);
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, onCancel);

    const [title, setTitle] = useState(original.title);
    const [slug, setSlug] = useState(original.slug);
    const [password, setPassword] = useState(original.password);
    const [status, setStatus] = useState(original.status);
    const [comment_status, setCommentStatus] = useState(
      original.comment_status
    );
    const [ping_status, setPingStatus] = useState(original.ping_status);
    const tagsList = useMemo(
      () => original.tags.map(({ name }) => name).join(", "),
      [original.tags]
    );
    const [tags, setTags] = useState(tagsList);

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
                  <small className="font-italic">Password</small>
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="sm"
                  />
                </Col>
                <Col sm="3" className="px-0 d-flex align-items-center">
                  <em>
                    <small>{"–OR–"} </small>
                  </em>
                  <Form.Check inline className="mr-0 ml-2">
                    <input
                      type="checkbox"
                      value="private"
                      checked={status === "private"}
                      onChange={(e) =>
                        setStatus(
                          status !== "private" ? "publish" : e.target.value
                        )
                      }
                    />
                    <Form.Label className="mb-0 ml-1">
                      <small className="font-italic">Private</small>
                    </Form.Label>
                  </Form.Check>
                </Col>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>
                  <small className="font-italic">Categories</small>
                </Form.Label>
                <CategoriesListSelector />
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
                <FormCheck inline>
                  <FormCheck.Input
                    type="checkbox"
                    value="open"
                    checked={comment_status === "open"}
                    onChange={(e) =>
                      setCommentStatus(
                        comment_status === "open" ? "closed" : e.target.value
                      )
                    }
                  />
                  <FormCheck.Label>
                    <small className="font-italic">Allow Comments</small>
                  </FormCheck.Label>
                </FormCheck>
                <FormCheck inline>
                  <FormCheck.Input
                    type="checkbox"
                    value="open"
                    checked={ping_status === "open"}
                    onChange={(e) =>
                      setPingStatus(
                        ping_status === "open" ? "closed" : e.target.value
                      )
                    }
                  />
                  <FormCheck.Label>
                    <small className="font-italic">Allow Pings</small>
                  </FormCheck.Label>
                </FormCheck>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex flex-row justify-content-between mt-2">
            <Button variant="outline-primary" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" size="sm">
              Update
            </Button>
          </div>
        </td>
      </tr>
    );
  }
);
