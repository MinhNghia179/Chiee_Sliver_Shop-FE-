import { Breadcrumbs } from "@mui/material";
import { ROUTER_NAME } from "config/constants";
import { Link } from "react-router-dom";
import "./breadcrumbs-page.style.scss";

interface DataBreadcrumbsModel {
  name: string;
  link: string;
  currentPage: boolean;
}

interface IProps {
  data?: DataBreadcrumbsModel[];
}

const BreadcrumbsPage = ({ data = [] }: IProps) => {
  return (
    <>
      <div className="breadcrumbs_contain p-3  my-3">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={ROUTER_NAME.HOME}>Trang chủ</Link>
            {data.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.link}
                  className={item.currentPage ? "current_page" : ""}
                >
                  {item.name}
                </Link>
              );
            })}
          </Breadcrumbs>
        </div>
      </div>
    </>
  );
};

export default BreadcrumbsPage;
