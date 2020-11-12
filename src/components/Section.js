import React, { memo } from "react";

export default memo(({ title, children, ...other }) => {
  return (
    <section {...other}>
      <h5>{title}</h5>

      <div className="my-4">{children}</div>
    </section>
  );
});
