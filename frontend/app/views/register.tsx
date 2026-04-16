import type { Route } from "./+types/register.tsx";
import {
  Separator,
  Flex,
  Spacer,
  Heading,
  Field,
  Input,
  Link,
  Button,
  ButtonGroup,
  Box,
  Container,
  Center,
  AbsoluteCenter,
  type JsxElement,
  type ConditionalValue,
  FieldRequiredIndicator,
} from "@chakra-ui/react";
import { useState, type ChangeEvent } from "react";
import { FormStates, stateReducer } from "~/reducer/form.js";
import { useReducer } from "react";
import InputField, { InputState, type InputModel } from "~/components/input.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Login } from "~/queries/user.js";
import { Navigate, redirect, useNavigate, type Register } from "react-router";
import axios from "axios";
import { Alert } from "@chakra-ui/react";
import { TourService } from "~/queries/rest.js";
import type { User } from "~/models/user.js";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "~/components/ui/password-input.js";

// TODO: move to separate file

export interface ViewModel {
  username: string;
  password: string;
}



// Register component
export default function Register({ loaderData }: Route.ComponentProps) {
  const [vm, setVM] = useState<ViewModel>({ username: "", password: "" });
  const [canSubmit, setCanSubmit] = useState(false);

  let navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (user: ViewModel) => {
      try {
        let response = await TourService.post("/users", user);
        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
        setTimeout(()=> navigate("/"),10000)
    },
  });

function updateModel(model: ViewModel) {
    let canSubmit = false;
    if (model.username !== "" && model.password !== "") canSubmit = true;

    setCanSubmit(canSubmit);
    setVM(model);
  }
  

  return (
    <AbsoluteCenter>
      <Container minW="md" maxW="xl">
        <Flex gap="6" direction="column">
          <Flex gap="3" direction="column">
            <Heading>Register</Heading>
            <Separator />
          </Flex>

          {mutation.isError ? (
            <Alert.Root status="error">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Registration Failed!</Alert.Title>
                <Alert.Description>
                  Username already taken. Please use another one.
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          ) : null}
                    {mutation.isSuccess ? (<Alert.Root status="success">
                      <Alert.Indicator />
                      <Alert.Content>
                        <Alert.Title>Registration Successfull!</Alert.Title>
                        <Alert.Description>
                          Registration was successfull. Please login with your credentials.
                          Navigating to Login in a few moments...
                        </Alert.Description>
                      </Alert.Content>
                    </Alert.Root>) : (null) }
          <Flex gap="3" direction="column">
            <Field.Root required>
              <Field.Label>
                Username
                <FieldRequiredIndicator />
              </Field.Label>
              <Input
                placeholder="user@mail.com"
                onChange={(e) =>
                  updateModel({ ...vm, username: e.target.value })
                }
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Password
                <FieldRequiredIndicator />
              </Field.Label>
              <PasswordInput
                placeholder="********"
                onChange={(e) =>
                  updateModel({ ...vm, password: e.target.value })
                }
              />
              <Field.ErrorText></Field.ErrorText>
            </Field.Root>
          </Flex>

          <Flex gap="3" direction="column">
            <Button
              disabled={!canSubmit}
              loading={mutation.isPending}
              onClick={() => mutation.mutate(vm)}
            >
              Register
            </Button>

            <Link href="/">Account Login</Link>
          </Flex>
        </Flex>
      </Container>
    </AbsoluteCenter>
  );
}
