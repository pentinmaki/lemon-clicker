import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="root">
      <div className="root_content">
        <h1>Hupsis!</h1>
        <p>Valitettavasti tapahtui odottaman virhe.</p>
        <p>{error.statusText || error.message}</p> 
      </div>
    </div>
  );
}

export default ErrorPage;
