import { useState } from "react";
import type { Route } from "./+types/login.tsx";
import {
  AbsoluteCenter,
  Alert,
  Button,
  Container,
  Field,
  FieldRequiredIndicator,
  Flex,
  Heading,
  Input,
  Link,
  Separator,
  type JsxElement,
} from "@chakra-ui/react";
import type { JSX } from "@emotion/react/jsx-runtime";

function InputField({
  value,
  state = "Untouched",
  label,
  placeholder = "",
  required = false,
  error = "",
  OnValueChanged,
  OnStateChanged,
  Validate = (input: string) => true,
}: {
  value: string;
  state: "Untouched" | "Valid" | "Invalid";
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  OnStateChanged: (state: "Untouched" | "Valid" | "Invalid") => void;
  OnValueChanged: (value: string) => void;
  Validate?: (input: string) => boolean;
}): JSX.Element {
  // const [touched, SetTouched] = useState(false);
  const [valid, SetValid] = useState(false);

  function IsValid(): boolean {
    if (required && value.trim() == "") return false;
    if (!Validate(value)) return false;
    return true;
  }

  function OnBlur() {
    SetValid(IsValid());
    OnStateChanged(IsValid() ? "Valid" : "Invalid");
  }

  function OnChange(
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    OnValueChanged(event.target.value);
    SetValid(IsValid());
    OnStateChanged(IsValid() ? "Valid" : "Invalid");
  }

  function GetErrorMessage(): string {
    if (required && value.trim() == "") return `${label} is required.`;
    if (!Validate(value)) return error;
    return "";
  }

  return (
    <Field.Root required={required} invalid={state != "Untouched" && !valid}>
      <Field.Label>
        {label}
        <FieldRequiredIndicator />
      </Field.Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={OnChange}
        onBlur={OnBlur}
      />
      <Field.ErrorText>{GetErrorMessage()}</Field.ErrorText>
    </Field.Root>
  );
}

export default function Login({ loaderData }: Route.ComponentProps) {
  const [usernameValue, setUsernameValue] = useState("");
  const [usernameState, setUsernameState] = useState<
    "Untouched" | "Valid" | "Invalid"
  >("Untouched");

  const [passwordValue, setPasswordValue] = useState("");
  const [passwordState, setPasswordState] = useState<
    "Untouched" | "Valid" | "Invalid"
  >("Untouched");

  const [isLoginPossible, setIsLoginPossible] = useState(false);

  function GetButtonState(): boolean {
    if (usernameState == "Valid" && passwordState == "Valid") return true;
    return false;
  }

  return (
    <AbsoluteCenter>
      <Container minW="md"maxW="xl">
        <Flex direction="column" gap="5">
          <Flex justify="space-between">
          <Heading>Login</Heading>
            <Link href="register" variant="underline"> Register Account</Link>

          </Flex>
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Login Failed</Alert.Title>
              <Alert.Description>
                Couldn't find any user account with provided E-Mail or Password.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
          <Flex direction="column" gap="2.5">
            <InputField
              value={usernameValue}
              state={usernameState}
              OnStateChanged={(state) => {
                setUsernameState(state);
                setIsLoginPossible(GetButtonState());
              }}
              OnValueChanged={(v: string) => {
                setUsernameValue(v);
              }}
              required={true}
              label="E-Mail"
              placeholder="your@mail.com"
            ></InputField>
            <InputField
              value={passwordValue}
              state={passwordState}
              OnStateChanged={(state) => {
                setPasswordState(state);
                setIsLoginPossible(GetButtonState());
              }}
              OnValueChanged={(v: string) => {
                setPasswordValue(v);
                setIsLoginPossible(GetButtonState());
              }}
              required={true}
              label="Password"
              placeholder="********"
            ></InputField>
          </Flex>
          <Flex direction="column" gap="5">
            <Separator></Separator>
            <Button disabled={!isLoginPossible}>Login</Button>
          </Flex>
        </Flex>
      </Container>
    </AbsoluteCenter>
  );
}
