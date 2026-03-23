import type { Route } from "./+types/register.tsx";
import { Separator, Flex, Spacer, Heading, Field, Input, Link, Button, ButtonGroup, Box, Container, Center, AbsoluteCenter, type JsxElement } from "@chakra-ui/react"
import { useState, type ChangeEvent } from "react";
import { PasswordInput } from "~/components/ui/password-input.js";
import { FormStates, stateReducer } from "~/reducer/form.js";
import { useReducer } from "react";
import InputField, { InputState, type InputModel } from "~/components/input.js";
import { useQuery } from "@tanstack/react-query";
import { Login } from "~/queries/user.js";

// TODO: move to separate file 



// Register component 
export default function Register({ loaderData }: Route.ComponentProps,) {
    const [usernameInput, setUsernameInput] = useState<InputModel>({id:"Username",placeholder:"mail@domain.com",required:true,state:InputState.Untouched,value:""}) ;
    const [passwordInput, setPasswordInput] = useState<InputModel>({id:"Password",required:true,confidential:true,placeholder:"********",state:InputState.Untouched,value:""}) ;

    const [form, formDispatcher] = useReducer(stateReducer, { state: FormStates.Untouched, inputs: [usernameInput,passwordInput] });

    const {isPending, error, data, isFetching} = useQuery({
        queryKey: ['login'], queryFn: () => Login({id: "1", password: "AVeryLongPassword_2000"})
    })

    if(isPending) return 'loading...'

    if(error) return 'An error has occurred: ' + error.message

    // if(data) return data.id
    
    // return (
    //     <AbsoluteCenter>
    //         <Container maxW="md">
    //             <Flex gap="5" direction="column">
    //                 <Heading>Register</Heading>
    //                 <Separator />
    //                 <InputField model={usernameInput} onChange={(m)=> {setUsernameInput(m); formDispatcher({type: "changeInputState", input:m})}}></InputField>
    //                 <InputField model={passwordInput} onChange={(m)=> {setPasswordInput(m); formDispatcher({type: "changeInputState", input:m})}}></InputField>
    //                 <Link href="">Go to Login here</Link>
    //                 <Button onClick={() => console.log("Register clicked")} disabled={!(form.state==FormStates.Valid)}>Register</Button>
    //             </Flex>
    //         </Container>
    //     </AbsoluteCenter>
    // );
}