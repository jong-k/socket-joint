import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { addComment } from "../features/Comments/addComment";
import Form from "../components/Form";

function FormContainer() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.comments);

  return <Form postdata={(data) => dispatch(addComment(data))} />;
}

export default FormContainer;
