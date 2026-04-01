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
import { useMutation, useQuery } from "@tanstack/react-query";
import { RouteService, TourService } from "~/queries/rest.js";
import type { User } from "~/models/user.js";

function InputField({
  value = "",
  label,
  placeholder = "",
  required = false,
  error = "",
  OnValueChanged,
}: {
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  OnValueChanged: (value: string) => void;
}): JSX.Element {
  // const [touched, SetTouched] = useState(false);
  const [valid, SetValid] = useState(false);

  function OnChange(
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    OnValueChanged(event.target.value);
  }

  return (
    <Field.Root required={required}>
      <Field.Label>
        {label}
        <FieldRequiredIndicator />
      </Field.Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={OnChange}
      />
      {/* <Field.ErrorText>{GetErrorMessage()}</Field.ErrorText> */}
    </Field.Root>
  );
}

export default function Login({ loaderData }: Route.ComponentProps) {
  const [user, setUser] = useState<User>({ username: "", password: "" })
  const mutation = useMutation({
    mutationKey: ['userData'],
    mutationFn: (user: User) =>
      TourService.post("/auth/login", user),
    onSuccess(data, variables, onMutateResult, context) {
      console.log("login was successfull!")
      navigation.navigate("/tours")
    },
  })


  return (
    <AbsoluteCenter>
      <Container minW="md" maxW="xl">
        <Flex direction="column" gap="5">
          <Flex justify="space-between">
            <Heading>Login</Heading>
            <Link href="register" variant="underline"> Register Account</Link>

          </Flex>
          {mutation.isError ? (<Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Login Failed</Alert.Title>
              <Alert.Description>
                Couldn't find any user account with provided E-Mail or Password.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>) : (null) }
          
          <Flex direction="column" gap="2.5">
            <InputField value={user.username}
              OnValueChanged={(v) => {
                setUser({ ...user, username: v })
              }}
              required={true}
              label="E-Mail"
              placeholder="your@mail.com"
            ></InputField>
            <InputField value={user.password}
              OnValueChanged={(v) => {
                setUser({ ...user, password: v })
              }}
              required={true}
              label="Password"
              placeholder="********"
            ></InputField>
          </Flex>
          <Flex direction="column" gap="5">
            <Separator></Separator>
            <Button loading={mutation.isPending} onClick={()=> mutation.mutate(user)}>Login</Button>
          </Flex>
        </Flex>
      </Container>
    </AbsoluteCenter>
  );
}
