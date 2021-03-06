import Link from "next/link";
import React from "react";
import { Axios } from "../core/axios";

import { Button } from "../components/Button";
import { ConversationCard } from "../components/ConversationCard";
import { Header } from "../components/Header";

export default function RoomsPage({ rooms }) {
    return (
        <>
            <Header />
            <div className="container">
                <div className="mt-40 d-flex align-items-center justify-content-between">
                    <h1>All conversations</h1>
                    <Button color="green">+ Start room</Button>
                </div>

                <div className="grid mt-20">
                    {rooms.map((obj) => (
                        <Link key={obj.id} href={`/rooms/${obj.id}`}>
                            <a>
                                <ConversationCard
                                    title={obj.title}
                                    avatars={obj.avatars}
                                    guests={obj.guests}
                                    guestsCount={obj.guestsCount}
                                    speakersCount={obj.speakersCount}
                                />
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = async () => {
    try {
        const { data } = await Axios.get("/rooms.json");
        return {
            props: {
                rooms: data,
            },
        };
    } catch (error) {
        console.error("Error: " + error);
        return {
            props: {
                rooms: [],
            },
        };
    }
};
