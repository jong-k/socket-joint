import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { addComment } from "../features/Comments/addComment";
import { editComment } from "../features/Comments/editComment";
import Form from "../components/Form";

function FormContainer() {
  const dispatch = useDispatch();
  const { isLoading, data, error, onEditData } = useSelector(
    (state) => state.comments,
  );

  return (
    <Form
      postdata={(data) => dispatch(addComment(data))}
      onEditData={onEditData}
      editComment={(comment, newData) =>
        dispatch(editComment(comment, newData))
      }
    />
  );
}

export default FormContainer;
