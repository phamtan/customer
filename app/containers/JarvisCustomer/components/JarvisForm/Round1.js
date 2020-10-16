import React from 'react';
import JarvisFormStyle from './JarvisFormStyle';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import Header from './Header';

const schema = yup.object().shape({
    auth_email: yup
        .string()
        .email('This field must be a valid email')
        .required('Email is required'),
    password: yup.string().required('Password is required'),
});

export default function Round1(props) {

    const { register, handleSubmit, errors } = useForm({
        reValidateMode: 'onChange',
        shouldFocusError: true,
        shouldUnregister: true,
        defaultValues: {},
        resolver: yupResolver(schema),
    });

    function onSubmitForm() {

    }

    return (
        <JarvisFormStyle>
            <Header className="header" />
            <div className="roundTitle">BƯỚC 1:</div>
            <div className="roundName">THÔNG TIN CƠ BẢN</div>
            <form className="formWrapper" onSubmit={handleSubmit(onSubmitForm)}>
                <div className="formWrapper">
                    <div className="form-group">
                        <label>Họ tên</label>
                        <input
                            className="form-control formControl"
                            name="fullName"
                            placeholder="Họ tên"
                            ref={register}
                        />
                        {errors.fullName && (
                            <span className="formError">{errors.fullName.message}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            name="phone"
                            className="form-control formControl"
                            placeholder="Số ĐT"
                            type="text"
                            ref={register}
                        />
                        {errors.phone && (
                            <span className="formError">{errors.phone.message}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            name="email"
                            className="form-control formControl"
                            placeholder="Email"
                            type="text"
                            ref={register}
                        />
                        {errors.email && (
                            <span className="formError">{errors.email.message}</span>
                        )}
                    </div>

                    <button
                        type="button"
                        className="btn btnSubmit"
                        onClick={() => props.setStep(1)}>
                        Tiếp tục
        </button>
                </div>
            </form>
        </JarvisFormStyle>
    )
}


