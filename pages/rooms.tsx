import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ConversationCard } from "../components/ConversationCard";
import { Header } from "../components/Header";
import Axios from "../core/axios";

export default function RoomsPage() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await Axios.get("/rooms.json");
            console.log(data);
            setRooms(data);
        })();
    }, []);

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
                        <Link key={obj.id} href="/rooms/test-room">
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
