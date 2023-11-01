import { TextField } from '@mui/material';
import React, { useState } from 'react';

export const PhoneInput = () => {
    const [inputValue, setInputValue] = useState('');

    const getInputNumbersValue = (input: string) => {
        return input.replace(/\D/g, '');
    }

    const onPhonePaste = (e: any) => {
        const input = e.target;
        const inputNumbersValue = getInputNumbersValue(input.value);
        const pastedText = e.clipboardData.getData('Text');

        if (/\D/g.test(pastedText)) {
            input.value = inputNumbersValue;
            return;
        }
    }

    const onPhoneInput = (e: any) => {
        const input = e.target;
        let inputNumbersValue = getInputNumbersValue(input.value);

        if (!inputNumbersValue) {
            setInputValue('');
            return;
        }

        //если значения не равны, то ввод был не в конце строки
        // if (input.value.length !== input.selectionStart) {
        //     if (e.data && /\D/g.test(e.data)) {
        //         input.value = inputNumbersValue;
        //     }
        //     return;
        // }

        if (["7", "8", "9"].includes(inputNumbersValue[0])) {
            console.log(inputNumbersValue)
            if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue;
            const firstSymbols = inputNumbersValue[0] === "8" ? "8" : "+7";
            let formattedInputValue = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
            setInputValue(formattedInputValue);
        } else {
            setInputValue('+' + inputNumbersValue.substring(0, 16));
        }
    }

    const onPhoneKeyDown = (e: any) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode === 8 && inputValue.length === 1) {
            setInputValue('');
        }
    }

    return (
        <TextField
            type="text"
            label="Телефон"
            value={inputValue}
            onKeyDown={onPhoneKeyDown}
            onInput={onPhoneInput}
            onPaste={onPhonePaste}
        />
    );
}