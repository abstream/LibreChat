import { useNavigate } from 'react-router-dom';
import ResetPassword from '../components/Auth/ResetPassword';

function Logged() {
  const navigate = useNavigate();

  let redirect = '/c/new';
  const intendedRedirect = sessionStorage.getItem('intendedRedirect');
  if (intendedRedirect && intendedRedirect !== '/logged') {
    redirect = intendedRedirect;
  }

  setTimeout(() => {
    window.location.href = redirect;
  }, 1000);

  return <></>;
}

export default Logged;
