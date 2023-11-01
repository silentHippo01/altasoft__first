import { Button, MenuItem, Select, TextField } from '@mui/material';
import cls from './MainInfo.module.scss';
import { useForm } from "react-hook-form";
import { useData } from 'app/providers/DataProvider/FormProvider';
import { useState } from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

interface MainInfoProps {
    changeTab: (newValue: number) => void;
}

export const MainInfo = (props: MainInfoProps) => {

    const { changeTab } = props;

    //@ts-ignore
    const { setValues, data } = useData();

    const schema = yup.object({
        name: yup.string()
            .matches(/^([^0-9]*)$/, "Имя не может содержать цифры")
            .required("Введите имя"),
        surname: yup.string()
            .matches(/^([^0-9]*)$/, "Фамилия не может содержать цифры")
            .required("Введите фамилию"),
        email: yup.string()
            .email('Некорректный формат email')
            .required('Поле email обязательно для заполнения'),
    })

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            name: data.name,
            surname: data.surname,
            email: data.email,
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        setValues(data);
        changeTab(1)
    }

    console.log(data);

    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <h3 className={cls.title}>Расскажите о себе</h3>
            <TextField
                label="Имя:"
                name="name"
                {...register('name')}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                fullWidth
                error={!!errors.name}
                helperText={errors?.name?.message}
            />

            <TextField
                label="Фамилия:"
                name="Surname"
                {...register('surname')}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                fullWidth
                error={!!errors.surname}
                helperText={errors?.surname?.message}
            />

            <TextField
                label="Email:"
                type="email"
                name="email"
                {...register('email')}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                fullWidth
                error={!!errors.email}
                helperText={errors?.email?.message}
            />


            <Button
                type='submit'
                variant='outlined'
            >
                Следующий шаг
            </Button>
        </form >
    );
};
