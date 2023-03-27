import { render } from "../../../utility/testRender"
import { Challenges } from "../../../features/challenges/Challenges"

describe("Challenges page", () => {
  let mockState;

  beforeAll(() => jest.spyOn(window, 'fetch'))

  beforeEach(() => {
    mockState = {
      auth: { loggedIn: true },
      challenges: { challenges: null }
    }

    window.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ challenges: [] }),
    })
  });

  afterEach(() => [
    mockState = {}
  ])

  it("renders loading state", async () => {
    const { getByText  } = render(<Challenges />, mockState);
    expect(getByText("Required")).toBeInTheDocument();
  });
});