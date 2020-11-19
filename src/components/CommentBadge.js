import React, { memo } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { COMMENTS } from "../routes";
import styled from "styled-components";

const Number = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  color: white;
`;

export default memo(({ children }) => (
  <Link to={COMMENTS} className="position-relative">
    <FaCommentAlt size="1.8em" />
    <Number>
      <small>{children}</small>
    </Number>
  </Link>
));
