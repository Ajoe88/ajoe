import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from 'next/link.js';
import * as Yup from "yup";

export type LoginFormValues = {
  username: string,
  password: string,
};

export type onSubmitFunction = (values: LoginFormValues) => Promise<void>;
export type LoginFormProps = {
  isRegister: boolean,
  onSubmit: onSubmitFunction
};

const authLink = (isRegister: boolean) => (<Link href={isRegister ? '/login' : '/register'}>
  <a className="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
    {isRegister ? 'Login' : 'Register'}
  </a>
</Link>)

const LoginForm = ({isRegister = false, onSubmit}: LoginFormProps) => (
  <div>
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        password: Yup.string().required("Required"),
        passwordConfirmation: isRegister ? 
          Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match') : 
          Yup.string().nullable()
      })}
      onSubmit={async (values, { setSubmitting }) => {
        if (onSubmit) {
          onSubmit(values)
        }
        setSubmitting(false);
      }}
    >
      {() => (
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
          <style jsx>{`
            .login {
              background-color: #eee;
            }
          `}</style>
          <div className="w-full max-w-lg">
            <div className="leading-loose">
              <Form className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                <div className="h-screen font-sans login bg-cover">
                  <p className="text-white font-medium text-center text-lg font-bold">
                    LOGIN
                  </p>
                  <div className="">
                    <label className="block text-sm text-white">E-mail</label>
                    <Field
                      className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                      name="username"
                      placeholder="username"
                    />
                    <ErrorMessage name="username" component="div" />
                  </div>
                  <div className="mt-2">
                    <label className="block  text-sm text-white">
                      Password
                    </label>
                    <Field
                      className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" component="div" />
                  </div>
                  { isRegister &&
                    <div className="mt-2">
                    <label className="block  text-sm text-white">
                      Password Confirmation
                    </label>
                    <Field
                      className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                      type="password"
                      name="passwordConfirmation"
                      placeholder="passwordConfirmation"
                    />
                    <ErrorMessage name="passwordConfirmation" component="div" />
                  </div>}

                  <div className="mt-4 items-center flex justify-between">
                    <button
                      className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                      type="submit"
                    >
                      Enter
                    </button>
                    <a
                      className="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-red-400"
                      href="#"
                    >
                      Forget Password?
                    </a>
                  </div>
                  <div className="text-center">
                    {authLink(isRegister)}
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  </div>
);

export default LoginForm;
