import { useState, type ChangeEvent } from "react";
import { PasswordInput } from "./ui/password-input";
import { Field, Input } from "@chakra-ui/react";

type Validate = (value: string) => {valid: boolean, errorMessage: string}; 

export enum InputState {
    Untouched,
    Valid,
    Invalid,
}

export interface InputModel {
    id: string;
    required: boolean;
    state: InputState;
    value: string;
    placeholder?: string;
    confidential?: boolean;
}

interface InputProps {
    model : InputModel,
    onValidate?:Validate,
    onChange: (model: InputModel) => void
}



// one single component - input field
export default function InputField({ model,onChange, onValidate }: InputProps) {
    // values/variable for the component
    const [errorMessage, setErrorMessage] = useState("");

    const IsEmpty : Validate = (value) => {
        
        if(value.trim() === "") return {valid: false, errorMessage: `${model.id} is required!`}
        return {valid: true, errorMessage: ""};
    };

    // logic inside component
    function OnBlur() {

        if (onValidate)
        { 
            let isValid = onValidate(model.value);
            if (!isValid.valid) {
                model.state = InputState.Invalid;
                setErrorMessage(isValid.errorMessage);
            }else
            {
                model.state = InputState.Valid;
            }
        } 
        
        let isValid = IsEmpty(model.value);
        if (!isValid.valid) {
            model.state = InputState.Invalid;
            setErrorMessage(`${model.id} is required!`);
        }else
        {
            model.state = InputState.Valid;
        }

        onChange(model);
    }

    // logic inside component
    function Change(event: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        onChange({...model, value: event.target.value});
    }

    function GetInputComponent(confidential: boolean) {
        if (confidential) {
            return <PasswordInput placeholder={model.placeholder} onBlur={OnBlur} value={model.value} onChange={Change} ></PasswordInput>;
        } else {
            return <Input placeholder={model.placeholder} onBlur={OnBlur} value={model.value} onChange={Change} />;
        }
    }

    // view of the component
    return (
        < Field.Root required={model.required} invalid={model.state == InputState.Invalid && model.required}>
            <Field.Label>
                {model.id}
                <Field.RequiredIndicator />
            </Field.Label>
            {GetInputComponent(model.confidential ? model.confidential : false)}
            <Field.HelperText />
            <Field.ErrorText >
                {errorMessage}
            </Field.ErrorText >
        </ Field.Root >
    )
}