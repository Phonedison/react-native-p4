import { Image, ImageSourcePropType } from "react-native";
import {
  colorNavegationInactive,
  whiteColor,
} from "../../../utils/globalStyles";

type IconType = {
  source: ImageSourcePropType;
  size: number;
  focused: boolean;
};

export const ImgIcon = ({ source, size, focused }: IconType) => (
  <Image
    source={source}
    resizeMode="contain"
    style={{
      width: size,
      height: size,
      tintColor: focused ? whiteColor : colorNavegationInactive,
    }}
  />
);
