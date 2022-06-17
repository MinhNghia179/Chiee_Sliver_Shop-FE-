import { Tab, Tabs } from "@mui/material";
import React from "react";

interface IProps {
  value: number;
  isCentered?: boolean;
  labels: string[];
  handleChangeValue: (event: React.SyntheticEvent, newValue: number) => void;
}

const TabsComponent = ({
  value,
  isCentered = false,
  labels = [],
  handleChangeValue,
}: IProps) => {
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChangeValue}
        variant="scrollable"
        scrollButtons={false}
        centered={isCentered}
        aria-label="scrollable prevent tabs example tab_order"
        sx={{
          ".css-1aquho2-MuiTabs-indicator": {
            backgroundColor: "#f53d2d",
          },
          ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
            color: "#f53d2d",
          },
        }}
      >
        {labels.map((item, index) => (
          <Tab label={item} key={index} />
        ))}
      </Tabs>
    </>
  );
};

export default TabsComponent;
