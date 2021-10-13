import React, { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Axios } from "../../../core/axios";

import styles from "./ChooseAvatarStep.module.scss";

import { WhiteBlock } from "../../WhiteBlock";
import { Button } from "../../Button";
import { StepInfo } from "../../StepInfo";
import { Avatar } from "../../Avatar";
import { MainContext } from "../../../pages";

type uploadFileType = {
    url: string;
};

const uploadFile = async (file: File): Promise<uploadFileType> => {
    const formData = new FormData();
    formData.append("photo", file);

    const { data }: { data: uploadFileType } = await Axios.post(
        "/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return data;
};

export const ChooseAvatarStep: React.FC = () => {
    const { onNextStep, setFieldValue, userData } = useContext(MainContext);
    const [avatarUrl, setAvatarUrl] = useState<string>(
        "https://sun2-3.userapi.com/s/v1/if1/CAR1Aao3yIica7xq77xIIMMTn29CME-cE5JSJBc8OTNVt29JQjnhR0ZsX_9IO-AzgwVbfgB6.jpg?size=200x0&quality=96&crop=138,44,1048,1048&ava=1"
    );

    const inputFileRef = useRef<HTMLInputElement>(null);
    const stepInfoTitle = userData !== undefined ? userData.fullname : "NoName";

    useEffect(() => {
        if (inputFileRef.current) {
            inputFileRef.current.addEventListener("change", handleChangeImage);
        }
    }, []);

    const handleChangeImage = async (event: Event): Promise<void> => {
        const file = (event.target as HTMLInputElement).files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);
            const data = await uploadFile(file);
            setAvatarUrl(data.url);
            setFieldValue("avatarUrl", data.url);
        }
    };

    return (
        <div className={styles.block}>
            <StepInfo
                icon="/static/celebration.png"
                title={`Okay, ${stepInfoTitle}!`}
                description="How’s this photo?"
            />
            <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
                <div>
                    <Avatar width="120px" height="120px" src={avatarUrl} />
                </div>
                <div className="mb-30">
                    <label htmlFor="image" className="link cup">
                        Choose a different photo
                    </label>
                </div>
                <input id="image" ref={inputFileRef} type="file" hidden />
                <Button onClick={onNextStep}>
                    Next
                    <img className="d-ib ml-10" src="/static/arrow.svg" />
                </Button>
            </WhiteBlock>
        </div>
    );
};
