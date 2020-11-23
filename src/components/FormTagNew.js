import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { string, object } from "yup";

export default () => {
  const submit = (values, { setSubmitting }) => {};

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      slug: "",
      description: "",
    },
    onSubmit: submit,
    validationSchema: object({
      name: string().required(),
    }),
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <small className="font-weight-bold">Add New Tag</small>
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <small>Name</small>
        </Form.Label>
        <Form.Control
          type="text"
          name="name"
          size="sm"
          disabled={isSubmitting}
          onChange={handleChange}
          value={values.name}
          isInvalid={touched.name && errors.name}
        />
        <Form.Text className="text-muted">
          <small>The name is how it appears on your site.</small>
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <small>Slug</small>
        </Form.Label>
        <Form.Control
          type="text"
          name="slug"
          size="sm"
          disabled={isSubmitting}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          <small>
            The “slug” is the URL-friendly version of the name. It is usually
            all lowercase and contains only letters, numbers, and hyphens.
          </small>
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <small>Description</small>
        </Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={5}
          disabled={isSubmitting}
          onChange={handleChange}
          value={values.description}
        />
        <Form.Text className="text-muted">
          <small>
            The description is not prominent by default; however, some themes
            may show it.
          </small>
        </Form.Text>
      </Form.Group>

      <Button type="submit" disabled={isSubmitting} variant="primary" size="sm">
        Add New Tag
      </Button>
    </Form>
  );
};
