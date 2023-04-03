import React from "react";
import { useChallengesData } from "../../../features/challenges/challenges.redux";
import { render, screen } from "../../../utility/testRender";
import { Challenges } from "../../../features/challenges/Challenges";

describe("Challenges page", () => {
  let mockState;
  let mockChallenges = [
    {
      category: "food",
      contentKey: "contentKey ",
      id: 1,
      name: "Challenge 1",
      timePeriod: "week",
    },
    {
      category: "food",
      contentKey: "contentKey ",
      id: 2,
      name: "Challenge 2",
      timePeriod: "week",
    },
    {
      category: "food",
      contentKey: "contentKey ",
      id: 3,
      name: "Challenge 3",
      timePeriod: "week",
    },
  ];

  beforeAll(() => jest.spyOn(window, "fetch"));

  beforeEach(() => {
    jest.spyOn(window.localStorage, "getItem").mockImplementation(() => {
      return JSON.stringify({ firstName: "John" });
    });
    mockState = {
      auth: { loggedIn: true },
      challenges: { challenges: null },
    };

    window.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ challenges: [mockChallenges] }),
    });
  });

  afterEach(() => [(mockState = {})]);

  it("renders loading state", () => {
    render(<Challenges />);
    const loadingElement = screen.getByText("Retrieving Challenges...");
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders the list of challenges", () => {
    jest.spyOn(useChallengesData, "default").mockReturnValue(mockChallenges);
    render(<Challenges />);
    const challengeElements = screen.getAllByTestId("challenge-card");
    expect(challengeElements).toHaveLength(mockChallenges.length);
  });

  it("shows the user's first name", () => {
    render(<Challenges />);
    const nameElement = screen.getByText("Hi John");
    expect(nameElement).toBeInTheDocument();
  });
});
