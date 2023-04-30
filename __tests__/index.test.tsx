/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-render-in-setup */
import { waitFor } from "@testing-library/react";
import Index from "pages/index";
import { render } from "utils/test-utils";

describe("Index", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<Index courses={[]} />, {
        router: {
          pathname: `/`,
        },
      });
    });
  });
});
