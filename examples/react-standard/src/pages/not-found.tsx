import { Link } from "wouter";

type Props = {
  isAuthenticationRequired?: boolean;
};
export default function NotFound({ isAuthenticationRequired }: Props) {
  return (
    <div>
      <p>404 - This is not the page you age looking for.</p>
      {isAuthenticationRequired && <Link to="/login">Login to App</Link>}
    </div>
  );
}
