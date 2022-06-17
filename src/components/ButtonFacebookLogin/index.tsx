import FacebookLogin from 'react-facebook-login';

const ButtonFacebookLogin = () => {
  return (
    <>
      <FacebookLogin
        appId="1088597931155576"
        autoLoad={true}
        fields="name,email,picture"
        onClick={()=>{}}
        callback={()=>{}} 
      />
    </>
  )
}

export default ButtonFacebookLogin
