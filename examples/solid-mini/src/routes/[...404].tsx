import { Title } from "solid-start";
import { HttpStatusCode } from "solid-start/server";

export default function NotFound() {
  return (
    <main class="centered">
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />
      <h1>Page not found</h1>
    </main>
  );
}
