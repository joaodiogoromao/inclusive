import React from "react";

import { Button } from "../Button/Button";
import { StyledButtonTray } from "./style";

import { BsXLg } from "react-icons/bs";

export const PhotoButtonTray = ({ closeAction }) => {
  return (
    <StyledButtonTray>
      <Button action={closeAction} content={<BsXLg />}></Button>
    </StyledButtonTray>
  );
};
