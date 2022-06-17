import { Box, Tab, Tabs } from '@mui/material';
import LOGO from 'assets/images/logoV2.png';
import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import './auth.style.scss';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
interface IProps {
  isOpen: boolean;
  onHide: () => void;
}

const AuthPopup = (props: IProps) => {
  const { isOpen = false, onHide } = props;
  const [valueTab, setValueTab] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClosed={onHide}
        toggle={onHide}
        centered
        contentClassName="auth"
      >
        <Box sx={{ width: '100%' }} className="content">
          <div className="d-flex justify-content-center">
            <img src={LOGO} className="logo" alt="" width="60%" />
          </div>

          <Tabs value={valueTab} onChange={handleChange} centered>
            <Tab
              label="Đăng nhập"
              value={0}
              className={valueTab === 0 ? 'tab--active' : ''}
            />
            <Tab
              label="Đăng ký"
              value={1}
              className={valueTab === 1 ? 'tab--active' : ''}
            />
          </Tabs>
          {valueTab === 0 ? (
            <LoginForm onClickRegister={() => setValueTab(1)} />
          ) : (
            <RegisterForm onClickLogin={() => setValueTab(0)} />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default AuthPopup;
