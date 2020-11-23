import { memo } from "react";

export default memo(({ title }) => {
  return <h3 className="h3 text-capatilize">{title}</h3>;
});
