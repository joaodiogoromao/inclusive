import React from "react";

import { Button } from "../Button/Button";
import { StyledButtonTray } from "./style";

import { BsXLg } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";

export const PhotoButtonTray = ({ closeAction, downloadAction }) => {
  return (
    <StyledButtonTray>
      <Button action={closeAction} content={<BsXLg />}></Button>
      <Button action={downloadAction} content={<HiDownload />}></Button>
    </StyledButtonTray>
  );
};
