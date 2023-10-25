import { useRef, useState } from 'react';
import cls from './EInputs.module.scss'
import { Form, FormField, TextBox, CheckBox, ComboBox, LinkButton, NumberBox, TimePicker, MaskedBox, DateBox, Calendar } from 'rc-easyui';


export const EInputs = () => {
    const [user, setUser] = useState({
        name: null,
        email: null,
        hero: null,
        accept: true,
        age: null,
    });

    const [rules, setRules] = useState({
        name: ['required', 'lenght[5,10]'],
        age: ['required'],
        email: "email"
    })

    const [errors, setErrors] = useState({});

    const [date, setDate] = useState(new Date());
    console.log(date);

    let form: any = null;

    //@ts-ignore
    const handleChange = (name, value) => {
        let newUser = Object.assign({}, user);
        //@ts-ignore
        newUser[name] = value;
        //@ts-ignore
        setUser({ user })
    }

    const handleSubmit = () => {
        //@ts-ignore
        form.validate(errors => {
            console.log(errors);
        })

    }
    //@ts-ignore
    const formatDate = (date) => {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        return [m, d, y].join('/')
    }

    //@ts-ignore
    const handleSelectionChange = (selection) => {
        //@ts-ignore
        setDate({ selection })
    }

    return (
        <div>
            <Form
                ref={ref => form = ref}
                model={user}
                rules={rules}
                onChange={handleChange.bind(this)}
            >
                <FormField name="name" label="name: ">
                    <TextBox></TextBox>
                </FormField>

                <FormField name="age" label="Age:">
                    <NumberBox value={user.age}></NumberBox>
                </FormField>

                <FormField>
                    <LinkButton onClick={handleSubmit}>Submit</LinkButton>
                </FormField>
            </Form>

            <TimePicker
                placeholder="Time"
                name="time"
                panelStyle={{ width: 200, height: 300 }}
            />

            <MaskedBox inputId="m1" mask="+7 (999) 999-9999"></MaskedBox>

            <DateBox
                panelStyle={{ width: 250, height: 300 }}
                value={date}
                //@ts-ignore
                onChange={(value) => setDate(value)}
            />

            <Calendar
                style={{ width: 250, height: 250 }}
                selection={date}
                //@ts-ignore
                onSelectionChange={handleSelectionChange.bind(this)}
            />
        </div>
    );
};
