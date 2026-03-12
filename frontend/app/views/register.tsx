import type { Route } from "./+types/register.tsx";
import { Separator, Flex, Spacer, Heading, Field, Input, Link, Button, ButtonGroup, Box, Container, Center, AbsoluteCenter, FieldErrorText } from "@chakra-ui/react"
import { useState } from "react";

interface RegisterProperties {
    username: string;
    password: string;
}


export default function Register({ loaderData }: Route.ComponentProps,) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

    function onUsernameChanged(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function onPasswordChanged(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function CheckUsername(): string {
        let errors: string[] = [];

        let usernameRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

        if (username === "") {
            errors.push("Username is required");
        }

        if (!usernameRegex.test(username)) {
            errors.push("Username must be a valid email address");
        }

        return errors.at(0) ?? "";
    }

    function onUsernameBlur() {
        if (CheckUsername() != "") {
            setIsUsernameEmpty(true);
        } else {
            setIsUsernameEmpty(false);
        }
    }

    function CheckPassword() : string {
        let errors: string[] = [];

        let passwordRegex = /\S{8,}/;

        if (password === "") {
            errors.push("Password is required");
        } 

        console.log(password.match(passwordRegex));

        if (password.match(passwordRegex) == null) {
            errors.push("Password must be at least 8 characters long");
        }

        return errors.at(0) ?? "";
    }

        function onPasswordBlur() {
        if (CheckPassword() != "") {
            setIsPasswordEmpty(true);
        } else {
            setIsPasswordEmpty(false);
        }
    }
    return (
        <AbsoluteCenter>
            <Container maxW="md">
                <Flex gap="5" direction="column">
                    <Heading>Register</Heading>
                    <Separator />
                    <Field.Root invalid={isUsernameEmpty}>
                        <Field.Label>
                            Username | {username}
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder="tour@guide.com" value={username} onChange={onUsernameChanged} onBlur={onUsernameBlur} />
                        <Field.HelperText />
                        <Field.ErrorText>{CheckUsername()}</Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={isPasswordEmpty}>
                        <Field.Label>
                            Password
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder="password" value={password} onChange={onPasswordChanged} onBlur={onPasswordBlur}/>
                        <Field.HelperText />
                        <Field.ErrorText>{CheckPassword()}</Field.ErrorText>
                    </Field.Root>
                    <Link href="">Go to Login here</Link>
                    <Button disabled={isUsernameEmpty || isPasswordEmpty} onClick={() => console.log("Register clicked")}>Register</Button>
                </Flex>
            </Container>
        </AbsoluteCenter>
    );
}