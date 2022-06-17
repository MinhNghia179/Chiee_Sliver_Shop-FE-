import { Avatar } from "@mui/material";
import { NO_IMAGE } from "config/constants";
import { CommentModel } from "models/blog/CommentModel";
import React from "react";
import { convertDate, convertDateTime, getFullName } from "utils";

interface IProps {
  data: CommentModel;
}

const CommentItem = ({ data }: IProps) => {
  return (
    <div className="my-3 d-flex">
      <Avatar src={data.user_avatar || NO_IMAGE} />
      <div className="flex-grow-1 px-2">
        <div className="d-flex justify-content-between">
          <h6>{getFullName(data.user_first_name,data.user_last_name)}</h6>
          <div className="text-secondary">{convertDateTime(data.created_at)}</div>
        </div>
        <div>{data.content}</div>
      </div>
    </div>
  );
};

 

export default CommentItem;
