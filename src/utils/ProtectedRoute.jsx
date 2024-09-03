import { Navigate } from "react-router-dom";

export default function ProtectedRouteElement({
  component: Component,
  ...props
}) {
  return props.isAuthorized ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace />
  );
}
