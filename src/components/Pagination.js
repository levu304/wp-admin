import { memo } from "react";
import { Pagination } from "react-bootstrap";

export default memo(
  ({ page, disabledPrev, disabledNext, prev, next, ...other }) => (
    <Pagination size="sm" {...other}>
      <Pagination.Prev disabled={disabledPrev} onClick={prev} />
      <Pagination.Item active>{page}</Pagination.Item>
      <Pagination.Next disabled={disabledNext} onClick={next} />
    </Pagination>
  )
);
