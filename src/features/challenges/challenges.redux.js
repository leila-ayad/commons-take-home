import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiTypeBuilder, callApi } from "../../utility/api";

const FETCH_CHALLENGES = apiTypeBuilder("FETCH_CHALLENGES");
const JOIN_CHALLENGE = apiTypeBuilder("JOIN_CHALLENGE");

export const fetchChallenges = () =>
  callApi({
    type: FETCH_CHALLENGES,
    method: "GET",
    endpoint: "/interviews/challenges",
  });

// Handle returned userChallenge in reducer below or feel free to implement an alternative data fetch/state management solution
export const joinChallenge = (challengeId, onSuccess, onFailure) => {
  callApi({
    type: JOIN_CHALLENGE,
    method: "POST",
    body: challengeId,
    endpoint: `/interviews/challenges/${challengeId}`,
    onSuccess,
    onFailure
  });
  console.log(challengeId);
};

export const initialState = {
  challenges: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHALLENGES.success:
      return {
        ...state,
        challenges: action.payload.challenges,
      };
    default:
      return state;
  }
};

// Custom hook to fetch challenges. Feel free to delete/modify/add your own custom hooks
export const useChallengesData = () => {
  const dispatch = useDispatch();
  const challenges = useSelector((s) => s.challenges.challenges);

  useEffect(() => {
    if (!challenges) {
      dispatch(fetchChallenges());
    }
  }, [challenges, dispatch]);

  return challenges;
};
