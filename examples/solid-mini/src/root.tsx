// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Link,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./index.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Solid</Title>
        <Meta charset="utf-8" />
        <Link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <A href="/">Home</A>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
