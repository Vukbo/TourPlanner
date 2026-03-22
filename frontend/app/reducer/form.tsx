export enum InputFieldState {
    Untouched,
    Valid,
    Invalid,
}

interface State {
    canSubmit: boolean;
    inputs: InputField[];
}

export interface InputField {
    label: string;
    required: boolean;
    state: InputFieldState;
}

type Actions =
    { type: "changeInputState", value: InputField }

// Initial state of the form
const initialState: State = {
    canSubmit: false,
    inputs: [],
}

export function stateReducer(currentState: State, action: Actions): State {
    switch (action.type) {
        case "changeInputState":
            currentState.inputs.forEach((e) => {
                if (e.label == action.value.label) {
                    e.state = action.value.state;
                }
            });

            let requiredInputs = currentState.inputs.filter((e) => e.required);

            currentState.canSubmit = requiredInputs.every((e) => {
                if (e.state == InputFieldState.Valid)
                    return true;
                return false;
            })

            return { ...currentState };

        default:
            throw new Error("Unknown action type");
    }
}