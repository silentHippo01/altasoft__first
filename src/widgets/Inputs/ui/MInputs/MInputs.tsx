import { TextField, Input, Tooltip, Typography } from '@mui/material';
import cls from './MInputs.module.scss'
import { ChangeEvent, useState } from 'react';
import { number, object, string } from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"

export const MInputs = () => {
    const [length, setLength] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');

    const validateSchema = object().shape({
        first: string().required('Обязательное поле').max(20, 'Слишком много символов'),
        age: number().required().positive().integer(),
        phone: string().matches(/^\+[0-9]{1,4}\s?[0-9]+$/,
            'Некорректный номер телефона. Пожалуйста, используйте формат +1234567890').required('Обязательное поле'),
        email: string()
            .email('Некорректный формат email')
            .required('Поле email обязательно для заполнения'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first: "",
            email: "",
            phone: "",
        },
        resolver: yupResolver(validateSchema)
    })

    const onSubmit = (data: any) => console.log(data);

    const phoneHandlerInput = (event: any) => {
        console.log(phoneNumber);
        let value = event.target.value;
        value = value.replace(/\D/g, '');

        if (value.length >= 11) {
            value = value.slice(0, 11);
        }

        if (value === "7" && phoneNumber.length === 0) {
            value = "+7 ";
            console.log('first ' + value[0]);
        }

        setPhoneNumber(phoneNumber);
    }

    return (
        <div className={cls.inputs}>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={cls.input__box}>
                    <h3 className={cls.input__label}>Обычный input: </h3>
                    <div className={cls.input__container}>
                        {errors.first && errors.first.message}
                        <TextField
                            required
                            id="basic"
                            variant="outlined"
                            helperText="Ограничение 10 символов"
                            inputProps={{ maxLength: 10 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Первое поле"
                            name='first'
                            error={Boolean(errors.first)}
                            fullWidth
                            {...register('first')}
                        />
                    </div>
                </div>

                <div className={cls.input__box}>
                    <h3 className={cls.input__label}>Поле для чисел: </h3>
                    <div className={cls.input__container}>
                        <TextField
                            type="number"
                            label="Число"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            helperText="Можно как целочисленные, так и дробные"
                        />
                    </div>
                </div>

                <div className={cls.input__box}>
                    <h3 className={cls.input__label}>Дата и время (1): </h3>
                    <div className={cls.input__container}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Дата"
                                format='DD/MM/YYYY'
                                sx={{
                                    width: '100%',
                                    mb: '15px'
                                }}
                            />
                            <TimePicker />
                        </LocalizationProvider>
                    </div>
                </div>


                <div className={cls.input__box}>
                    <h3 className={cls.input__label}>Дата (2): </h3>
                    <div className={cls.input__container}>
                        <TextField
                            type="date"
                            fullWidth
                        />
                    </div>
                </div>

                <div className={cls.input__box}>
                    <h3 className={cls.input__label}>Дата (3): </h3>
                    <div className={cls.input__container}>
                        <TextField
                            type="datetime-local"
                        />
                    </div>
                </div>

                <div className={cls.input__box}>
                    <h3 className={cls.input__label}>Дата (4): </h3>
                    <div className={cls.input__container}>
                        <TextField
                            type="week"
                        />
                    </div>
                </div>

                <div className={cls.input__box}>
                    <h3 className={cls.input__label}>Номер телефона: </h3>
                    <div className={cls.input__container}>
                        <TextField
                            type="tel"
                            name="phone"
                            fullWidth
                            {...register('phone')}
                        />
                    </div>
                </div>

                <input
                    type="tel"
                    placeholder="Введите номер телефона"
                    value={phoneNumber}
                    onChange={phoneHandlerInput}
                />

                <div className={cls.input__box}>
                    <h3 className={cls.input__label}>Почта: </h3>
                    <div className={cls.input__container}>
                        <TextField
                            type="email"
                            name="email"
                            fullWidth
                            {...register('email')}
                        />
                    </div>
                </div>

                <input type='submit' />
            </form>
        </div >
    );
};
