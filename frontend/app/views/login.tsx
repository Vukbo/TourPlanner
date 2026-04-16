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
import type { ViewModel } from "./register.js";
import { useNavigate } from "react-router";
import { PasswordInput } from "~/components/ui/password-input.js";



export default function Login() {
  const [vm, setVM] = useState<ViewModel>({ username: "", password: "" });
  const [canSubmit, setCanSubmit] = useState(false);
  let navigate = useNavigate();


  const mutation = useMutation({
    mutationFn: async (user: ViewModel) => {
      try {
        let response = await TourService.post("/auth/login", user);
        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
        setTimeout(()=> navigate("/tours"),5000)
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
                <Heading>Login</Heading>
                <Separator />
              </Flex>
    
              {mutation.isError ? (
                <Alert.Root status="error">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>Login Failed!</Alert.Title>
                    <Alert.Description>
                      Username or Password was incorrect. Please try again.
                    </Alert.Description>
                  </Alert.Content>
                </Alert.Root>
              ) : null}
                        {mutation.isSuccess ? (<Alert.Root status="success">
                          <Alert.Indicator />
                          <Alert.Content>
                            <Alert.Title>Login Successfull!</Alert.Title>
                            <Alert.Description>
                              Navigating to Dashboard.
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
                  Login
                </Button>
    
                <Link href="/register">Account Registration</Link>
              </Flex>
            </Flex>
          </Container>
        </AbsoluteCenter>
  );
}
