import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { addComments } from "../features/Comments/addComments";
import Form from "../components/Form";

function FormContainer() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.comments);

  return <Form postdata={(data) => dispatch(addComments(data))} />;
}

export default FormContainer;
