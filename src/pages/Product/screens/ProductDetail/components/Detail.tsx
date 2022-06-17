import { useState } from "react";
import { Box } from "@mui/system";
import { Tab, Tabs } from "@mui/material";
import ProductDescription from "./ProductDescription";
import ProductReview from "./ProductReview";
import TabsComponent from "components/TabsComponent";

const Detail = () => {
  const labelsTab = ["Chi tiết sản phẩm","Đánh giá"]
  const [valueTab, setValueTab] = useState<number>(0);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  return (
    <>
      <Box
        sx={{ borderRadius: 2, boxShadow: 1 }}
        className="my-3 p-3 bg-white product_detail"
      >
        <TabsComponent
          value={valueTab}
          handleChangeValue={handleChange}
          labels={labelsTab}
        />
        {valueTab === 0 ? <ProductDescription /> : <ProductReview />}
      </Box>
    </>
  );
};

export default Detail;
