import { useContext } from "react";
import { PopupContext } from "containers/PopupContainer";

const usePopup = () => {
  return useContext(PopupContext);
};

export default usePopup;
