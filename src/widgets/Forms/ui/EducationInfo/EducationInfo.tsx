import { FormControlLabel, Radio, RadioGroup, TextField, Button, FormLabel } from '@mui/material';
import cls from './EducationInfo.module.scss';
import { useForm, useFieldArray } from "react-hook-form";
import { useData } from 'app/providers/DataProvider/FormProvider';
import { useState } from 'react';

interface EducationInfoProps {
    changeTab: (newValue: number) => void;
}

export const EducationInfo = (props: EducationInfoProps) => {

    const {
        changeTab,
    } = props;

    //@ts-ignore
    const { setValues, data } = useData();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: {
            errors
        }
    } = useForm({
        defaultValues: {
            education: data.eductaion,
            anotherEducation: data.anotherEducation,
            refreshCourses: data.refreshCourses,
        }
    })

    const { fields, append } = useFieldArray({
        control,
        name: "refreshCourses"
    })

    const education = watch("education");
    const refreshCoursesWatch = watch("refreshCourses");

    const controlledFields = fields.map((field, index) => {
        return {
            ...field,
            //@ts-ignore
            ...refreshCoursesWatch[index]
        };
    });

    const onSubmit = (data: any) => {
        setValues(data);
        console.log(data);
        changeTab(2)
    }
    console.log(data);
    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            <FormLabel id="educationGroup">Укажите свое образование:</FormLabel>
            <RadioGroup
                className={cls.radioGroup}
                aria-labelledby="educationGroup"
                {...register('education')}
            >
                <FormControlLabel {...register('education')} value="secondary" control={<Radio />} label="Среднее" />
                <FormControlLabel {...register('education')} value="bachelor" control={<Radio />} label="Бакалавр" />
                <FormControlLabel {...register('education')} value="master" control={<Radio />} label="Магистр" />
                <FormControlLabel {...register('education')} value="Ph.D" control={<Radio />} label="Доктор наук" />
                <FormControlLabel {...register('education')} value="Another" control={<Radio />} label="Другое (указать)" />
            </RadioGroup>

            {
                education === "Another" ?
                    (
                        <TextField
                            label="Образование:"
                            name="education"

                            {...register('anotherEducation')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                mb: '30px'
                            }}
                            required
                            fullWidth
                        />
                    )
                    : null
            }


            <div className={cls.refreshCourses__list} >
                <Button
                    className={cls.refreshCourses__addBtn}
                    type='submit'
                    variant='text'
                    onClick={() => append({
                        name: '',
                    })}
                >
                    Добавить образование:
                </Button>
                {
                    //@ts-ignore
                    controlledFields.map((field, index) => {
                        return (
                            <div className={cls.refreshCourse} key={index}>
                                <TextField
                                    className={cls.refreshCourses__title}
                                    label="Курс:"
                                    name="refreshCourses"
                                    sx={{
                                        mb: '20px',
                                        mt: '20px'
                                    }}
                                    {...register(`refreshCourses.${index}.title` as const)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                />
                                <div className={cls.refreshCourses__dates}>
                                    <TextField
                                        className={cls.refreshCourses__date}
                                        label="Начало"
                                        type="date"
                                        sx={{
                                            width: '43%'
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                        {...register(`refreshCourses.${index}.start` as const)}
                                    />
                                    —
                                    <TextField
                                        className={cls.refreshCourses__date}
                                        label="Конец"
                                        sx={{
                                            width: '43%'
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        type="date"
                                        fullWidth
                                        {...register(`refreshCourses.${index}.end` as const)}
                                    />
                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <Button
                type='submit'
                variant="outlined"
            >
                Следующий шаг
            </Button>
        </form >
    );
};
