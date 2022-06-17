import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton, SwipeableDrawer } from "@mui/material";
import { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import CloseIcon from "@mui/icons-material/Close";
import { MEDIUM_WIDTH } from "config/constants";
import { getWindowDimensions } from "utils/index";

const ButtonFilter = () => {
  const { height, width } = getWindowDimensions();
  const [value, setValue] = useState(0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleDrawer = () => {
    setIsOpenMenu((prev) => !prev);
  };

  return (
    <div className="btn_drawer">
      <div className="btn_filter">
        <button onClick={toggleDrawer}>
          <span>Lọc</span>
          <FilterListIcon sx={{ fontSize: 16 }} />
        </button>
      </div>
      <div className="" style={{ zIndex: 1000 }}>
        <SwipeableDrawer
          anchor="right"
          open={width < MEDIUM_WIDTH ? isOpenMenu : false}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
          className="draw_filter"
        >
          <div className="p-4 position-relative">
            <IconButton
              className="btn_close_filter_drawer"
              onClick={toggleDrawer}
            >
              <CloseIcon />
            </IconButton>
            <LeftSidebar />
          </div>
        </SwipeableDrawer>
      </div>
    </div>
  );
};

export default ButtonFilter;
