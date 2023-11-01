import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";

export const PhoneInput2 = () => {

    const [value, setValue] = useState<string>('');

    const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        let phone = inputValue.replace(/\D/g, '');

        if (["7", "8", "9"].indexOf(phone[0]) > -1) {
            phone += '+7' + phone;
            console.log(value)
        }

        setValue(phone);
    }

    return (
        <div>
            <input
                type="tel"
                value={value}
                onChange={phoneHandler}
            />
        </div>
    );
};
