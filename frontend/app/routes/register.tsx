import type { Route } from "./+types/register.tsx";
import { Separator, Flex, Spacer, Heading, Field, Input, Link, Button, ButtonGroup, Box, Container, Center, AbsoluteCenter, type JsxElement } from "@chakra-ui/react"
import { useState, type ChangeEvent } from "react";
import { PasswordInput } from "~/components/ui/password-input.js";
import { FormStates, stateReducer } from "~/reducer/form.js";
import { useReducer } from "react";
import InputField, { InputState, type InputModel } from "~/components/input.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Login } from "~/queries/user.js";
import type { RegisterModel, UserModel } from "~/models/user.js";
import type { Register } from "react-router";
import axios from "axios";

// TODO: move to separate file 




// Register component 
export default function Register({ loaderData }: Route.ComponentProps,) {
    const [usernameInput, setUsernameInput] = useState<InputModel>({id:"Username",placeholder:"mail@domain.com",required:true,state:InputState.Untouched,value:""}) ;
    const [passwordInput, setPasswordInput] = useState<InputModel>({id:"Password",required:true,confidential:true,placeholder:"********",state:InputState.Untouched,value:""}) ;
    const [user, setUser] = useState<RegisterModel>({username: "", password : ""})

    async function onSubmit(){
        let u = {username : usernameInput.value, password : passwordInput.value};
        setUser(u);

        // const mutation = useMutation({
        //     mutationFn: (register : RegisterModel) => {
        //         return axios.post("http://localhost:2406/auth/register", user)
        //     }
        // })
        let response = await axios.post("http://localhost:2406/auth/register", u)
        setUser({username : response.data.id, password : passwordInput.value})
    }

    const [form, formDispatcher] = useReducer(stateReducer, { state: FormStates.Untouched, inputs: [usernameInput,passwordInput]});

    // model

    // if(isPending) return 'loading...'

    // if(error) return 'An error has occurred: ' + error.message
    
    return (
        <AbsoluteCenter>
            <Container maxW="md">
                <Flex gap="5" direction="column">
                    <Heading>Register {user.username}</Heading>
                    <Separator />
                    <InputField model={usernameInput} onChange={(m)=> {setUsernameInput(m); formDispatcher({type: "changeInputState", input:m})}}></InputField>
                    <InputField model={passwordInput} onChange={(m)=> {setPasswordInput(m); formDispatcher({type: "changeInputState", input:m})}}></InputField>
                    <Link href="">Go to Login here</Link>
                    <Button onClick={() => formDispatcher({type: "submit", action: onSubmit})} disabled={!(form.state==FormStates.Valid)}>Register</Button>
                </Flex>
            </Container>
        </AbsoluteCenter>
    );
}