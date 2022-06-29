import React from "react";

import { Button } from "../Button/Button";
import { StyledButtonTray } from "./style";

import { BsXLg } from "react-icons/bs";
import { FaCut } from "react-icons/fa";
import { BiSave } from "react-icons/bi";

export const VideoButtonTray = ({
  closeAction,
  editing,
  setEditing,
  resetEditing,
  save,
}) => {
  return (
    <StyledButtonTray>
      <Button action={closeAction} content={<BsXLg />}></Button>
      {editing ? (
        <>
          <Button
            action={() => {
              setEditing(false);
              resetEditing();
            }}
            content={<FaCut />}
            filled={true}
          ></Button>
          <Button action={save} content={<BiSave />}></Button>
        </>
      ) : (
        <Button
          action={() => {
            setEditing(true);
          }}
          content={<FaCut />}
        ></Button>
      )}
    </StyledButtonTray>
  );
};
