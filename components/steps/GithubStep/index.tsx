import clsx from "clsx";
import { WhiteBlock } from "../../WhiteBlock";
import { Button } from "../../Button";
import { StepInfo } from "../../StepInfo";

import styles from "./GithubStep.module.scss";
import React, { useEffect } from "react";
import { MainContext, UserDataType } from "../../../pages";

export const GithubStep: React.FC = () => {
    const { onNextStep, setUserData } = React.useContext(MainContext);

    useEffect(() => {
        window.addEventListener("message", ({ data, origin }) => {
            if (
                origin === "http://localhost:7000" &&
                typeof data === "string" &&
                data.includes("avatarUrl")
            ) {
                const user: UserDataType = JSON.parse(data);
                setUserData(user);
                onNextStep();
            }
        });
    }, []);

    const onClickAuth = () => {
        window.open(
            "http://localhost:7000/auth/github",
            "Auth",
            "width=420,height=230,resizable=yes,scrollbars=no,status=yes"
        );
    };

    return (
        <div className={styles.block}>
            <StepInfo
                icon="/static/connect.png"
                title="Do you want import info from GitHub?"
            />
            <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
                <div className={styles.avatar}>
                    <b>AD</b>
                    <svg
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.5 50C0.5 30.5091 3.25846 18.1987 10.7286 10.7286C18.1987 3.25846 30.5091 0.5 50 0.5C69.4909 0.5 81.8014 3.25846 89.2714 10.7286C96.7415 18.1987 99.5 30.5091 99.5 50C99.5 69.4909 96.7415 81.8014 89.2714 89.2714C81.8014 96.7415 69.4909 99.5 50 99.5C30.5091 99.5 18.1987 96.7415 10.7286 89.2714C3.25846 81.8014 0.5 69.4909 0.5 50Z"
                            fill="#E0E0E0"
                            stroke="#D6D6D6"
                        />
                    </svg>
                </div>
                <h2 className="mb-40">Sasha Beliy</h2>
                <Button
                    onClick={onClickAuth}
                    className={clsx(
                        styles.button,
                        "d-i-flex align-items-center"
                    )}
                >
                    <img
                        src="/static/github.svg"
                        alt="GitHub logo"
                        className={styles.githubLogo}
                    />
                    Import from GitHub
                    <img className="d-ib ml-10" src="/static/arrow.svg" />
                </Button>
                <div onClick={onNextStep} className="link mt-20 cup d-ib">
                    Enter my info manually
                </div>
            </WhiteBlock>
        </div>
    );
};
