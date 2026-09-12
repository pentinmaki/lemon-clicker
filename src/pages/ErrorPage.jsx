import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="root">
      <div className="root_content">
        <h1>A spell misfired!</h1>
        <p>An unexpected error interrupted the workshop.</p>
        <p>{error.statusText || error.message}</p> 
      </div>
    </div>
  );
}

export default ErrorPage;
