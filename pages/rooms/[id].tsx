import React from "react";
import Axios from "../../core/axios";

import { BackButton } from "../../components/BackButton";
import { Header } from "../../components/Header";
import { Room } from "../../components/Room";

export default function RoomPage({ room }) {
    return (
        <>
            <Header />
            <div className="container mt-30">
                <BackButton title="All rooms" href="/rooms" />
                <Room title={room.title} />
            </div>
        </>
    );
}

interface IRoom {
    id: string;
    avatars: string[];
    guestsCount: number;
    speakersCount: number;
    title: string;
    guests: string[];
}

export const getServerSideProps = async (ctx) => {
    try {
        const { data }: { data: IRoom[] } = await Axios.get("/rooms.json");
        const roomId = ctx.query.id;
        const room = data.find((obj) => obj.id === roomId);

        return {
            props: {
                room,
            },
        };
    } catch (error) {
        console.error("Error: " + error);
        return {
            props: {
                room: {},
            },
        };
    }
};
