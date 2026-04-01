import type { Route } from "./+types/register.tsx";
import { Separator, Flex, Spacer, Heading, Field, Input, Link, Button, ButtonGroup, Box, Container, Center, AbsoluteCenter, type JsxElement, type ConditionalValue } from "@chakra-ui/react"
import { useState, type ChangeEvent } from "react";
import { PasswordInput } from "~/components/ui/password-input.js";
import { FormStates, stateReducer } from "~/reducer/form.js";
import { useReducer } from "react";
import InputField, { InputState, type InputModel } from "~/components/input.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Login } from "~/queries/user.js";
import type { RegisterModel, UserModel } from "~/models/user.js";
import { Navigate, redirect, useNavigate, type Register } from "react-router";
import axios from "axios";
import { Alert } from "@chakra-ui/react"
import { TourService } from "~/queries/rest.js";

// TODO: move to separate file 

enum RegisterStates {
    Success,
    Error,
    Pending,
    Idle
}

interface RegisterState {
    title: string,
    description: string,
    state: RegisterStates,
}

// Register component 
export default function Register({ loaderData }: Route.ComponentProps,) {
    const [usernameInput, setUsernameInput] = useState<InputModel>({ id: "Username", placeholder: "mail@domain.com", required: true, state: InputState.Untouched, value: "" });
    const [passwordInput, setPasswordInput] = useState<InputModel>({ id: "Password", required: true, confidential: true, placeholder: "********", state: InputState.Untouched, value: "" });
    const [user, setUser] = useState<RegisterModel>({ username: "", password: "" })
    const [registerState, setRegisterState] = useState<RegisterState>({ title: "", description: "", state: RegisterStates.Idle })
    let navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (user: RegisterModel) => {
            try {
                let response = await TourService.post("/auth/register", user);
                return response;
            }
            catch (error) {
                throw error;
            }
        },
        onSuccess : () => {
            console.log("Hello!")
            navigate("/");
        }
    })

    async function onSubmit() {
        let u = { username: usernameInput.value, password: passwordInput.value };
        setUser(u);

        // const mutation = useMutation({
        //     mutationFn: (register : RegisterModel) => {
        //         return axios.post("http://localhost:2406/auth/register", user)
        //     }
        // })
        // let response = await axios.post("http://localhost:2406/auth/register", u)
        try {
            setRegisterState({ title: "", description: "", state: RegisterStates.Pending });
            let response = await mutation.mutateAsync(u);
            setUser({ username: response.data.id, password: passwordInput.value })
            setRegisterState({ title: "Registration successful!", description: "User registration was successful", state: RegisterStates.Success });
        } catch (error) {
            setRegisterState({ title: "Registration failed!", description: (error as Error).message, state: RegisterStates.Error });
        }
    }

    function ShowRegisterState(state: RegisterState) {

        type statusType = ConditionalValue<"info" | "success" | "warning" | "error" | "neutral" | undefined>
        let status: statusType = "info";

        let title
        let description

        if (state.state === RegisterStates.Idle || state.state === RegisterStates.Pending) {
            return;
        }

        if (state.state === RegisterStates.Success) {
            status = "success"
            title = state.title
            description = state.description
        }

        if (state.state === RegisterStates.Error) {
            status = "error"
            title = state.title
            description = state.description
        }

        return (
            <Alert.Root status={status}>
                <Alert.Indicator />
                <Alert.Content>
                    <Alert.Title >
                        {title}
                    </Alert.Title>
                    <Alert.Description>
                        {description}
                    </Alert.Description>
                </Alert.Content>
            </Alert.Root>
        )
    }

    const [form, formDispatcher] = useReducer(stateReducer, { state: FormStates.Untouched, inputs: [usernameInput, passwordInput] });

    // model

    // if(isPending) return 'loading...'

    // if(error) return 'An error has occurred: ' + error.message

    return (
        <AbsoluteCenter>
            <Container maxW="md">
                <Flex gap="5" direction="column">
                    <Heading>Register {user.username}</Heading>
                    <Separator />
                    {ShowRegisterState(registerState)}
                    <InputField model={usernameInput} onChange={(m) => { setUsernameInput(m); formDispatcher({ type: "changeInputState", input: m }) }}></InputField>
                    <InputField model={passwordInput} onChange={(m) => { setPasswordInput(m); formDispatcher({ type: "changeInputState", input: m }) }}></InputField>
                    <Link href="">Go to Login here</Link>
                    <Button loading={registerState.state == RegisterStates.Pending ? true : false} onClick={() => formDispatcher({ type: "submit", action: onSubmit })} disabled={!(form.state == FormStates.Valid)}>Register</Button>
                </Flex>
            </Container>
        </AbsoluteCenter>
    );
}