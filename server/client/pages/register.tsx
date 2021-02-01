import LoginForm from '../components/loginForm'
import { useRouter } from 'next/router'

const Regsiter = () => {
  const router = useRouter();
  return (<LoginForm isRegister onSubmit={async (values) => {
    
    const response = await fetch("http://localhost:3000/api/register", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(response => response.json());
      
      if(response.status) {
        alert(response.status);
      } else {
        alert('register success, will navigator to login')
        router.push('/login');
      }
    }
  } />)
}

export default Regsiter