import { useEffect, Fragment } from "react";
import PageTitle from "../components/PageTitle";
import { Form } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { useUsers } from "../hooks/users";
import Main from "../components/Main";
import { usePosts } from "../hooks/posts";
import { load } from "react-cookies";
import { useFormik } from "formik";
import { USERS } from "../routes";
import SubmitButton from "../components/SubmitButton";

export default () => {
  const {
    state: { users },
  } = useLocation();
  const { replace } = useHistory();

  const { id } = load("user");

  const { deleteUsers } = useUsers();
  const { authors, getAuthors } = usePosts();

  const submit = ({ value, reassign }, { setSubmitting }) => {
    deleteUsers(
      {
        id,
        force: true,
        users: users.map(({ id }) => id),
        reassign: value === "delete" ? false : parseInt(reassign),
      },
      (result, { data, status }) => {
        setSubmitting(false);
        if (result && status === 200) {
          replace(USERS);
          return;
        }
      }
    );
  };

  const { handleChange, handleSubmit, isSubmitting, setFieldValue } = useFormik(
    {
      initialValues: {
        value: "delete",
        reassign: "",
      },
      onSubmit: submit,
    }
  );

  useEffect(() => {
    if (authors.length !== 0) {
      setFieldValue("resassign", authors[0].id);
      return;
    }
    getAuthors();
  }, [authors]);

  return (
    <Main>
      <PageTitle title="Delete Users" />

      <p>You have specified this user for deletion:</p>
      {users.map(({ id, name }) => (
        <p key={id}>
          ID #{id}: {name}
        </p>
      ))}
      <p>What should be done with content owned by this user?</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Check
            type="radio"
            value="delete"
            name="value"
            disabled={isSubmitting}
            onChange={handleChange}
            label="Delete all content."
            className="mb-3 d-flex align-items-center"
          />
          <Form.Check
            type="radio"
            value="reassign"
            name="value"
            onChange={handleChange}
            disabled={isSubmitting}
            className="mb-3 d-flex flex-row align-items-center"
            label={
              <Fragment>
                <Form.Check.Label>Attribute all content to: </Form.Check.Label>
                <Form.Control
                  as="select"
                  size="sm"
                  custom
                  name="reassign"
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="ml-2 col-lg-5"
                >
                  {authors.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
              </Fragment>
            }
          />
        </Form.Group>

        <SubmitButton isSubmitting={isSubmitting} label="Confirm Deletion" />
      </Form>
    </Main>
  );
};
