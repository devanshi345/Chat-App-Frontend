import React from "react";
import {useHistory} from 'react-router-dom';

const IndexPage = (props) => {
  let history = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem("chatToken");
    if(!token) {
      history.push("/login");
    }
    else {
      history.push("/dashboard");
    }
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>Index</div>
  );
};

export default IndexPage;
