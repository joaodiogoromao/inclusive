import React from "react";

import { Button } from "../Button/Button";
import { StyledButtonTray } from "./style";

import { IoIosClose } from "react-icons/io";

export const PhotoButtonTray = ({ closeAction }) => {
  return (
    <StyledButtonTray>
      <Button action={closeAction} content={<IoIosClose />}></Button>
    </StyledButtonTray>
  );
};
