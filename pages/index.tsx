import React, { useState } from "react";

import { WelcomeStep } from "../components/steps/WelcomeStep";
import { EnterNameStep } from "../components/steps/EnterNameStep";
import { GithubStep } from "../components/steps/GithubStep";
import { ChooseAvatarStep } from "../components/steps/ChooseAvatarStep";
import { EnterPhoneStep } from "../components/steps/EnterPhoneStep";
import { EnterCodeStep } from "../components/steps/EnterCodeStep";

const stepsComponents = {
    0: WelcomeStep,
    1: GithubStep,
    2: EnterNameStep,
    3: ChooseAvatarStep,
    4: EnterPhoneStep,
    5: EnterCodeStep,
};

export type UserDataType = {
    id: number;
    fullname: string;
    avatarUrl: string;
    isActive: number;
    username: string;
    phone: string;
};

type MainContextProps = {
    step: number;
    userData: UserDataType;
    onNextStep: () => void;
    setFieldValue: (field: keyof UserDataType, value: string) => void;
    setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
};

export const MainContext = React.createContext<MainContextProps>(
    {} as MainContextProps
);

export default function Home() {
    const [step, setStep] = useState<number>(1);
    const [userData, setUserData] = useState<UserDataType>();
    const Step = stepsComponents[step];

    const onNextStep = () => {
        setStep((prev) => prev + 1);
    };

    // меняем конкретное свойство в userData
    // в steps мы можем поменять данные, которые мы получили от GitHub
    const setFieldValue = (field: keyof UserDataType, value: string) => {
        setUserData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <MainContext.Provider
            value={{ step, onNextStep, userData, setUserData, setFieldValue }}
        >
            <Step />
        </MainContext.Provider>
    );
}
