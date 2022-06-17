import './reset-password.style.scss';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { checkTokenResetPasswordAction } from 'setup/redux/auth/AuthActions';
import ExpiryToken from './components/ExpiryToken';
import LoadingBox from 'components/Loading/LoadingBox';
import FormResetPassword from './components/FormResetPassword';

const ResetPassword = () => {
  const { token_id } = useParams();
  const dispatch = useDispatch();
  const [idUser, setIdUser] = useState<number>(0);
  const [isExpiryToken, setIsExpiryToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token_id) {
      const token = token_id.slice(0, token_id.lastIndexOf('_'));
      const userId = token_id.slice(
        token_id.lastIndexOf('_') + 1,
        token_id.length
      );
      setIdUser(Number(userId));
      const payload = {
        token,
      };
      setIsLoading(true);
      dispatch(
        checkTokenResetPasswordAction(payload, (res: any) => {
          setIsExpiryToken(!res.status);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
      );
    }
  }, [token_id]);

  return (
    <>
      <Helmet>
        <title>Đặt lại mật khẩu | Chiee Sliver</title>
      </Helmet>
      {/* --------------------------------------------------------- */}
      <Box sx={{ borderRadius: 2, boxShadow: 1 }} className="my-3 p-3 bg-white">
        {isLoading ? (
          <LoadingBox />
        ) : isExpiryToken ? (
          <ExpiryToken />
        ) : (
          <FormResetPassword userId={idUser} />
        )}
      </Box>
    </>
  );
};

export default ResetPassword;
