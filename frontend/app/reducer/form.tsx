import { InputState, type InputModel } from "~/components/input";

export enum FormStates{
    Untouched,
    Invalid,
    Valid,
    Submitted,
    Canceled
}

export interface FormModel {
    state : FormStates;
    inputs: InputModel[];
}

export type FormActions =
|   { type: "changeInputState", input: InputModel }
|   {type: "submit", action: () => void}
|   {type: "cancel", action: () => void}


export function stateReducer(current: FormModel, action: FormActions): FormModel {
    switch (action.type) {
        case "changeInputState":
            current.inputs.forEach((e) => {
                if (e.id == action.input.id) {
                    e.state = action.input.state;
                }
            });

            let requiredInputs = current.inputs.filter((e) => e.required);

            current.state = requiredInputs.every((e) => {
                if (e.state == InputState.Valid)
                    return true;
                return false;
            }) ? FormStates.Valid : FormStates.Invalid;

            return { ...current };

        case "submit":
            current.state = FormStates.Submitted;
            action.action();
            return {...current};
        case "cancel":
            current.state = FormStates.Canceled;
            return {...current};

        default:
            throw new Error("Unknown action type");
    }
}