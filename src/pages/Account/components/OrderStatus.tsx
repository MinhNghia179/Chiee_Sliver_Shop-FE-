import React                          from "react";
import { styled }                     from "@mui/material/styles";
import Stack                          from "@mui/material/Stack";
import Stepper                        from "@mui/material/Stepper";
import Step                           from "@mui/material/Step";
import StepLabel                      from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
}                                     from "@mui/material/StepConnector";
import { StepIconProps }              from "@mui/material/StepIcon";
import CreditScoreIcon                from '@mui/icons-material/CreditScore';
import RemoveRoadIcon                 from '@mui/icons-material/RemoveRoad';
import PaymentsIcon                   from '@mui/icons-material/Payments';
import ElectricRickshawOutlinedIcon   from '@mui/icons-material/ElectricRickshawOutlined';
import StarBorderOutlinedIcon         from '@mui/icons-material/StarBorderOutlined';

import { 
  LIST_ORDER_STATUS, 
  ORDER_STATUS 
}                                     from "config/constants";
import { OrderStatusModel }           from "models/order/OrderStatusModel";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

const NormalColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <CreditScoreIcon />,
    2: <PaymentsIcon />,
    3: <ElectricRickshawOutlinedIcon />,
    4: <StarBorderOutlinedIcon/>
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const CancelColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <CreditScoreIcon />,
    2: <RemoveRoadIcon />
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const normalSteps = [
  ORDER_STATUS.WAIT_CONFIRM.NAME,
  ORDER_STATUS.CONFIRM.NAME,
  ORDER_STATUS.DELIVERY.NAME,
  ORDER_STATUS.SUCCESSFUL_DELIVERY.NAME
];

const cancelSteps = ["Đơn hàng đã đặt", "Đơn hàng đã hủy"];

interface IProps{
  dataStatus:OrderStatusModel[]
}

const OrderStatus = ({ dataStatus }: IProps) => {
  const checkStatusStep = React.useCallback(() => {
    let activeStep: number = -1;
    dataStatus.forEach((item) => {
      if (LIST_ORDER_STATUS.includes(item.status_code)) {
        activeStep++;
      }
    });
    return activeStep;
  }, [dataStatus]);

  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={4}>
        {dataStatus.findIndex(
          (item) => item.status_code === ORDER_STATUS.CANCEL.CODE
        ) === -1 ? (
          <Stepper
            alternativeLabel
            activeStep={checkStatusStep()}
            connector={<ColorlibConnector />}
          >
            {normalSteps.map((label, index) => (
              <Step key={index}>
                <StepLabel StepIconComponent={NormalColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        ) : (
          <Stepper
            alternativeLabel
            activeStep={1}
            connector={<ColorlibConnector />}
          >
            {cancelSteps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={CancelColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </Stack>
    </>
  );
};

export default OrderStatus;
