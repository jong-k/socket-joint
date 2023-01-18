import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchComments } from "../features/Comments/fetchComments";
import CommentList from "../components/CommentList";

function CommentListContainer() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return <CommentList isLoading={isLoading} data={data} error={error} />;
}
export default CommentListContainer;
