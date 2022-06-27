import React from "react";

import { Button } from "../Button/Button";
import { StyledButtonTray } from "./style";

import { BsXLg } from "react-icons/bs";
import { FaCut } from "react-icons/fa";

export const VideoButtonTray = ({ closeAction, editing, setEditing }) => {
  return (
    <StyledButtonTray>
      <Button action={closeAction} content={<BsXLg />}></Button>
      {editing ? (
        <Button action={() => setEditing(false)} content={<FaCut />} filled={true}></Button>
      ) : (
        <Button action={() => setEditing(true)} content={<FaCut />}></Button>
      )}
    </StyledButtonTray>
  );
};
