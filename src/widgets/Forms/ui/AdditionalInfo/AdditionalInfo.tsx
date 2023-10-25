import { useState } from 'react';
import cls from './AdditionalInfo.module.scss';
import FormGroup from '@mui/material/FormGroup';
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useData } from 'app/providers/DataProvider/FormProvider';

export const AdditionalInfo = () => {

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
    } = useForm()

    const onSubmit = (datas: any) => {
        const newData = {
            ...data,
            ...datas
        }
        setValues(newData);
    }

    console.log(data)

    const names = [
        'React',
        'Redux',
        'TypeScript',
        'GraphQL',
        'Jest',
        'Next JS',
    ];

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <div className={cls.AdditionalInfo}>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="skills"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Навыки</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={field.value}
                                onChange={field.onChange}
                                required
                                input={<OutlinedInput label="Навыки" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                sx={{
                                    width: '100%'
                                }}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={field.value.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />

                <Button
                    type='submit'
                    variant="outlined"
                >
                    Отправить
                </Button>
            </form>
        </div>
    );
};

