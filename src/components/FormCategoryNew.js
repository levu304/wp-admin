import { useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useCategories } from "../hooks/categories";
import { useFormik } from "formik";
import { string, object } from "yup";

export default () => {
  const { getAllCategories, allCategories, createCategory } = useCategories();

  useEffect(() => {
    getAllCategories();
  }, []);

  const submit = (values, { setSubmitting }) =>
    createCategory(values, () => setSubmitting(false));

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      slug: "",
      parent: "-1",
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
          <small className="font-weight-bold">Add New Category</small>
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
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.slug}
        />
        <Form.Text className="text-muted">
          <small>
            The “slug” is the URL-friendly version of the name. It is usually
            all lowercase and contains only letters, numbers, and hyphens.
          </small>
        </Form.Text>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column lg="12">
          <small>Parent Category</small>
        </Form.Label>
        <Col lg="6">
          <Form.Control
            as="select"
            size="sm"
            name="parent"
            custom
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.parent}
          >
            <option value="-1">None</option>
            {allCategories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col lg="12">
          <Form.Text className="text-muted">
            <small>
              Categories, unlike tags, can have a hierarchy. You might have a
              Jazz category, and under that have children categories for Bebop
              and Big Band. Totally optional.
            </small>
          </Form.Text>
        </Col>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <small>Description</small>
        </Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={5}
          onChange={handleChange}
          onBlur={handleBlur}
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
        Add New Category
      </Button>
    </Form>
  );
};
