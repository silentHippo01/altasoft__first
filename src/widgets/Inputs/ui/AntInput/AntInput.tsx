import { Calendar, Input, InputNumber, Select } from 'antd';
import cls from './AntInput.module.scss'


const options = [
    {
        value: 'один',
        label: 'один',
    },
    {
        value: 'два',
        label: 'два',
    },
    {
        value: 'три',
        label: 'три',
    },
]

export const AntInput = () => {
    return (
        <div className={cls.form}>
            <div className={cls.input__box}>
                <h3 className={cls.input__label}>Обычный input с ограничением (10): </h3>
                <div className={cls.input__container}>
                    <Input
                        maxLength={10}
                    />
                </div>
            </div>

            <div className={cls.input__box}>
                <h3 className={cls.input__label}>Инпут с числами (мин: 0, макс: 10, по умолчанию: 5): </h3>
                <div className={cls.input__container}>
                    <InputNumber
                        min={0}
                        max={10}
                        defaultValue={5}
                    />
                </div>
            </div>

            <div className={cls.input__box}>
                <h3 className={cls.input__label}>Календарь: </h3>
                <div className={cls.input__container}>
                    <Calendar
                        fullscreen={false}
                        style={{
                            width: '300px'
                        }}
                    />
                </div>
            </div>

            <div className={cls.input__box}>
                <h3 className={cls.input__label}>Select: </h3>
                <div className={cls.input__container}>
                    <Select
                        options={options}
                    />
                </div>
            </div>

        </div>
    );
};
