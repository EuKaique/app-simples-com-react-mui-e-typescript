import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type TVTextFieldProps = TextFieldProps & {
    name: string;
}

export const VTextField = ({name, ...rest}: TVTextFieldProps) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
    const [value, setValue] = useState(defaultValue || '');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
        });
    }, [fieldName, registerField, value, clearError]);

    return (
        <TextField 
            {...rest}
            error={!!error}
            helperText={error}
            value={value}
            defaultValue={defaultValue}
            onKeyDown={(event) => { error && clearError(); rest.onKeyDown?.(event) }}
            onChange={event => { setValue(event.target.value); rest.onChange?.(event) }}
        />
    );
}