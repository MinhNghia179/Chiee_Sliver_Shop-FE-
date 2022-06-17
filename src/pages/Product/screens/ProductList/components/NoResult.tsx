import IMG from "assets/images/no-result.png";

const NoResult = () => {
  return (
    <div className="my-4 w-100">
      <div className="d-flex justify-content-center align-items-center">
        <img src={IMG} style={{ width: "8.375rem" }} />
      </div>
      <h5 className="text-center mt-3">Không tìm thấy kết quả nào</h5>
    </div>
  );
};

export default NoResult;
