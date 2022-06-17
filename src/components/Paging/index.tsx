import { Pagination } from "@mui/material";

interface IProps{
  count?:number;
  page:number;
  handleChangePage:(event: React.ChangeEvent<unknown>, value: number) => void;
}

const Paging = ({count=1,page=1,handleChangePage}:IProps) => {

  return (
    <>
      <Pagination
        count={count}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        sx={{
          ".Mui-selected": {
            color: "#fff !important",
            backgroundColor: "#f53d2d !important",
          },
          ".MuiPaginationItem-root": {
            borderColor: "#f53d2d",
            color: "#f53d2d",
          },
          ".css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root:hover": {
            backgroundColor: "#ff6633",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default Paging;
