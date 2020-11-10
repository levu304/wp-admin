import React, { memo } from "react";

export default memo(({ title }) => {
  return <h3 className="h3">{title}</h3>;
});
