import { memo, Fragment } from "react";
import { Button, Spinner } from "react-bootstrap";

export default memo(({ isSubmitting, label, ...other }) => (
  <Button
    size="sm"
    className="mt-3"
    variant="primary"
    type="submit"
    disabled={isSubmitting}
    {...other}
  >
    {isSubmitting ? (
      <Fragment>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="mr-1"
        />
        {label}
      </Fragment>
    ) : (
      label
    )}
  </Button>
));
