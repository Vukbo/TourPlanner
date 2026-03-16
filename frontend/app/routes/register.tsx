import type { Route } from "./+types/register.tsx";
import { Separator, Flex, Spacer, Heading, Field, Input, Link, Button, ButtonGroup, Box, Container, Center, AbsoluteCenter} from "@chakra-ui/react"
import { useState, type ChangeEvent } from "react";
import { PasswordInput } from "~/components/ui/password-input.js";

enum InputFieldState {
    Untouched,
    Valid,
    Invalid,
}

interface RegisterProperties {
    username: string;
    password: string;
}



// one single component - input field
function InputField({
    label,
    placeholder = "email",
    required = false,
    confidential = false,
    onValidate }:{
        label: string,
        placeholder?: string,
        required?: boolean,
        confidential?: boolean,
        onValidate?:
        (value: string) => {
            isValid: boolean, 
            errorMessage: string
        }
    }) {

    // values/variable for the component
    const [currentState, setCurrentState] = useState(InputFieldState.Untouched);
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

        setCurrentState(state);
    }

    // logic inside component
    function OnChange(event: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        setValue(event.target.value);
    }

    function GetInputComponent(confidential : boolean){
        if(confidential){
            return <PasswordInput placeholder={placeholder} onBlur={OnBlur} value={value} onChange={OnChange} ></PasswordInput>;
        } else{
            return <Input placeholder={placeholder} onBlur={OnBlur} value={value} onChange={OnChange} />;
        }
    }

    // view of the component
    return (
        < Field.Root required={required} invalid={currentState == InputFieldState.Invalid && required}>
            <Field.Label>
                {label}
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
                    <InputField label="E-Mail" required onValidate={onValidate}></InputField>
                    <InputField label="Password" required confidential></InputField>
                    <Link href="">Go to Login here</Link>
                    <Button onClick={() => console.log("Register clicked")}>Register</Button>
                </Flex>
            </Container>
        </AbsoluteCenter>
    );
}