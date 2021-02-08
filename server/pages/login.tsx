import nookies from 'nookies'
import LoginForm, { LoginFormValues } from '../client/components/loginForm'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()
  const onSubmit = async (values: LoginFormValues) => {
    const res = await fetch('http://localhost:3000/api/jwt', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((response) => response.json())

    if (!res.accessToken) {
      nookies.set(undefined, 'token', '')
    } else {
      nookies.set(undefined, 'token', res.accessToken)
      alert('login success, token is:' + res.accessToken)
      router.push('/')
    }
  }
  return <LoginForm isRegister={false} onSubmit={onSubmit} />
}
export default Login
