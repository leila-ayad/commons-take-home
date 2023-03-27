import fish from "../assets/svg/Fish.svg";
import beet from "../assets/svg/Beet.svg";
import broccoli from "../assets/svg/Broccoli.svg";
import thermometer from "../assets/svg/Thermometer.svg";

export const PESCETARIAN_CHALLENGE = "pescatarian-month";
export const POWER_DOWN_CHALLENGE = "power-down-week";
export const VEGETARIAN_CHALLENGE = "vegetarian-month";
export const VEGAN_CHALLENGE = "vegan-week";

export const CHALLENGE_CONTENT_KEYS = {
  PESCETARIAN_CHALLENGE,
  POWER_DOWN_CHALLENGE,
  VEGETARIAN_CHALLENGE,
  VEGAN_CHALLENGE
};

export const CHALLENGE_ICONS = {
  [PESCETARIAN_CHALLENGE]: fish,
  [VEGETARIAN_CHALLENGE]: broccoli,
  [VEGAN_CHALLENGE]: beet,
  [POWER_DOWN_CHALLENGE]: thermometer
}