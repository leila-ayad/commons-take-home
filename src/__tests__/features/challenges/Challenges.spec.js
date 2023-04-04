import { render} from "../../../utility/testRender"
import { waitFor } from "@testing-library/react";
import { Challenges } from "../../../features/challenges/Challenges"
import { useChallengesData } from "../../../features/challenges/challenges.redux";

import '@testing-library/jest-dom/extend-expect';

jest.mock("../../../features/challenges/challenges.redux");

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

   Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => JSON.stringify({ firstName: 'John' })),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    },
    writable: true
  });
  });

  afterEach(() => [
    mockState = {}
  ])

  it("renders loading state", async () => {
    
    const { getByText  } = render(<Challenges />, mockState);
    expect(getByText("Retrieving Challenges...")).toBeInTheDocument();
  });

  it("renders ChallengeCards", async () => {
    const mockChallenges = [
      {
        id: 1,
        title: "Challenge 1",
        description: "Description 1",
      },
      {
        id: 2,
        title: "Challenge 2",
        description: "Description 2",
      },
    ];

    useChallengesData.mockReturnValueOnce(mockChallenges);

    
    await waitFor(() => {
      const { getByText } = render(<Challenges />);
      expect(getByText("Challenge 1")).toBeInTheDocument();
      expect(getByText("Challenge 2")).toBeInTheDocument();
    })

  });
});


