import { render } from "../../../utility/testRender"
import { Authentication } from "../../../features/auth/Authentication"

describe("Authentication page", () => {

  it("renders", async () => {
    const { getByText  } = render(<Authentication />);
    expect(getByText("LOGIN")).toBeInTheDocument();
  });
});