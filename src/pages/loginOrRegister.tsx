// module
import { FC, HTMLInputTypeAttribute, ReactNode, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import * as yup from "yup";
import styled from "@emotion/styled";
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
// custom
import Form from "../components/form/form";
import LoginForm from "../models/forms/login";
import StringInput from "../components/form/elements/string-input";
import Button from "../components/form/elements/button";
import { Toaster } from "../components/notices/toaster";
import useStore from "../state-management/store";
import { Store } from "../models/store";

const LoginOrRegister = (): ReactNode => {
    const [pageType, setPageType] = useState<'Login' | 'Register'>('Login')
    const [inputType, setInputType] = useState<HTMLInputTypeAttribute>('password')

    const formInitialValue: LoginForm = { email: '', password: '' }
    const LoginFormValidation = yup.object({
        email: yup
            .string()
            .required('field required')
            .email('invalid E-mail'),
        password: yup
            .string()
            .required('field required')
            .test(
                'check-regex',
                'password must contain at least six characters and numbers, at least one number and at least one character',
                (value: string) => {
                    const regex = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,}$')
                    return regex.test(value)
                }),
    }).required();

    const setToken = useStore((store: Store) => store.setToken)

    const onFormSubmit = (data: { reactHookFormObject: UseFormReturn<LoginForm>; defaultValue: LoginForm }) => {
        data.reactHookFormObject.handleSubmit(
            (data: LoginForm) => onSuccess(data),
            () => onError()
        )()
    }

    const onSuccess = (data: LoginForm) => {
        Toaster.success(
            pageType === 'Login' ? 'You logged in successfully' : 'You registered & logged in successfully',
            { toastId: 'valid-data' }
        )
        setToken(`${data.email}-${data.password}`)
    }

    const onError = () => {
        Toaster.error('E-mail or Password invalid, please check and try again', { toastId: 'invalid-data' })
    }

    const onPageTypeChange = (data: { reactHookFormObject: UseFormReturn<LoginForm>; defaultValue: LoginForm }) => {
        data.reactHookFormObject.reset()
        setPageType('Register')
    }

    return (
        <LoginWrapper>
            <Title>{pageType}</Title>
            <Form<LoginForm>
                formType='CREATE'
                defaultValue={formInitialValue}
                validation={LoginFormValidation}
                fieldsRenderer={(data: { reactHookFormObject: UseFormReturn<LoginForm>; defaultValue: LoginForm }) => {
                    return <FormWrapper>
                        <StringInput<LoginForm>
                            label={<EmailLabel />}
                            name='email'
                            data={data}
                        />
                        <StringInput<LoginForm>
                            label={<PasswordLabel inputType={inputType} setInputType={setInputType} />}
                            name='password'
                            data={data}
                            type={inputType}
                        />
                        <Button
                            title={pageType}
                            disable={!data.reactHookFormObject.formState.isValid}
                            onClick={() => onFormSubmit(data)}
                        />
                        {
                            pageType === 'Login' &&
                            <RegisterSwitcherWrapper>
                                <RegisterSwitcher onClick={() => onPageTypeChange(data)}>
                                    Register
                                </RegisterSwitcher>
                            </RegisterSwitcherWrapper>
                        }
                    </FormWrapper>
                }}
            />
        </LoginWrapper>
    );
};

export default LoginOrRegister;

const EmailLabel: FC<{}> = () => {
    return <>
        <span style={{ paddingRight: '3px' }}>E-mail</span>
        <span style={{ color: 'red' }}>*</span>
    </>
}

const PasswordLabel: FC<{
    inputType: HTMLInputTypeAttribute,
    setInputType: (value: React.SetStateAction<HTMLInputTypeAttribute>) => void
}> = ({ inputType, setInputType }) => {
    return <>
        <span style={{ paddingRight: '3px' }}>Password</span>
        <span style={{ color: 'red' }}>*</span>
        <span style={{ paddingInline: '7px' }}>
            {
                inputType === 'password'
                    ? <BsEyeFill style={{ cursor: 'pointer' }} onClick={() => setInputType('text')} />
                    : <BsEyeSlashFill style={{ cursor: 'pointer' }} onClick={() => setInputType('password')} />
            }
        </span>
    </>
}

const LoginWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '10px',
}));

const Title = styled.h1(() => ({
    fontWeight: 900,
    fontSize: '35px',
    textTransform: 'capitalize',
}));

const FormWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '35%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px,'
}))

const RegisterSwitcherWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    paddingBlock: '15px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
}))

const RegisterSwitcher = styled.span(() => ({
    cursor: 'pointer',
    width: '100px',
    textAlign: 'center',
    ':hover': {
        color: 'blue',
    }
}))
