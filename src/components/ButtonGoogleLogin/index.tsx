import { GOOGLE_CLIENT_ID } from 'config/constants';
import GoogleLogin from 'react-google-login';


const ButtonGoogleLogin = () => {
  const responseGoogle = (response: any) => {
    const profile = response.profileObj;
    console.log("minh",profile);
  };
  return (
    <>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID||''}
        buttonText="Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default ButtonGoogleLogin
