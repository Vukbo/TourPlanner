import type { Route } from "./+types/register.tsx";
import { Separator, Flex, Spacer, Heading, Field, Input, Link, Button, ButtonGroup, Box, Container, Center, AbsoluteCenter, type JsxElement } from "@chakra-ui/react"
import { useState, type ChangeEvent } from "react";
import { PasswordInput } from "~/components/ui/password-input.js";
import { stateReducer } from "~/reducer/form.js";
import { useReducer } from "react";
import type { InputField } from "~/reducer/form.js";
import { InputFieldState } from "~/reducer/form.js";

// TODO: move to separate file 

interface inputFieldProperties {
    label: string,
    placeholder?: string,
    required?: boolean,
    state: InputFieldState,
    confidential?: boolean,
    onValidate?:
    (value: string) => {
        isValid: boolean,
        errorMessage: string
    },
    onStateChange?: (ifs: InputField) => void
}



// one single component - input field
function InputField({ label, placeholder = "email", required = false, state = InputFieldState.Untouched, confidential = false, onValidate, onStateChange }: inputFieldProperties) {

    // values/variable for the component
    const [errorMessage, setErrorMessage] = useState("");
    const [value, setValue] = useState("Jaspher");

    // logic inside component
    function OnBlur() {
        let state: InputFieldState = InputFieldState.Valid;

        if (onValidate) {
            let validationResult = onValidate(value);
            if (!validationResult.isValid) {
                state = InputFieldState.Invalid;
                setErrorMessage(validationResult.errorMessage);
            }
        }

        if (value == "") {
            state = InputFieldState.Invalid;
            setErrorMessage(`${label} is required!`);
        }

        if (onStateChange)
            onStateChange({ label: label, required: required, state: state }) ;
    }

    // logic inside component
    function OnChange(event: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        setValue(event.target.value);
    }

    function GetInputComponent(confidential: boolean) {
        if (confidential) {
            return <PasswordInput placeholder={placeholder} onBlur={OnBlur} value={value} onChange={OnChange} ></PasswordInput>;
        } else {
            return <Input placeholder={placeholder} onBlur={OnBlur} value={value} onChange={OnChange} />;
        }
    }

    // view of the component
    return (
        < Field.Root required={required} invalid={state == InputFieldState.Invalid && required}>
            <Field.Label>
                {label} / {state}
                <Field.RequiredIndicator />
            </Field.Label>
            {GetInputComponent(confidential)}
            <Field.HelperText />
            <Field.ErrorText >
                {errorMessage}
            </Field.ErrorText >
        </ Field.Root >
    )
}

// Register component 
export default function Register({ loaderData }: Route.ComponentProps,) {
    const [unif, setUnif] = useState({ label: "E-Mail", required: false,  state: InputFieldState.Untouched }) ;
    const [pwif, setPwif] = useState({ label: "Password", required: true, state: InputFieldState.Untouched}) ;

    const [state, dispatch] = useReducer(stateReducer, { canSubmit: false, inputs: [unif, pwif] });
    // function in01(l:string,r:boolean) {
    //     return (
    //                 <InputField label={l} required={r} onValidate={onValidate} onStateChange={onStageChange}></InputField>
    //     );
    // }


    function onStageChangeUnif(ifs: InputField) {
        dispatch({ type: "changeInputState", value: ifs })
        //return state.inputs.find((e) => e.label == ifs.label)!.state;
        setUnif({...unif, state: ifs.state});
    }

    function onStageChangePwif(ifs: InputField) {
        dispatch({ type: "changeInputState", value: ifs })
        //return state.inputs.find((e) => e.label == ifs.label)!.state;
        setPwif({...pwif, state: ifs.state});
    }

    function onValidate(value: string) {
        return {
            isValid: value == 'a',
            errorMessage: "Must be 'a'",
        }
    }

    return (
        <AbsoluteCenter>
            <Container maxW="md">
                <Flex gap="5" direction="column">
                    <Heading>Register</Heading>
                    <Separator />
                    <InputField label={unif.label} required={unif.required} state={unif.state} onValidate={onValidate} onStateChange={onStageChangeUnif}></InputField>
                    <InputField label={pwif.label} required={pwif.required} state={pwif.state} onValidate={onValidate} onStateChange={onStageChangePwif} confidential></InputField>
                    <Link href="">Go to Login here</Link>
                    <Button onClick={() => console.log("Register clicked")} disabled={!state.canSubmit}>Register</Button>
                </Flex>
            </Container>
        </AbsoluteCenter>
    );
}