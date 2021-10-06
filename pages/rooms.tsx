import Link from "next/link";
import { Button } from "../components/Button";
import { ConversationCard } from "../components/ConversationCard";
import { Header } from "../components/Header";

export default function RoomsPage() {
    const guests = [
        "Sasha Beliy",
        "Ilyuha CHAOSHORSE",
        "TATSTSSSSSSSSSSSSSSSSSSSS",
    ];

    return (
        <>
            <Header />
            <div className="container">
                <div className="mt-40 d-flex align-items-center justify-content-between">
                    <h1>All conversations</h1>
                    <Button color="green">+ Start room</Button>
                </div>

                <div className="mt-20">
                    <Link href="/rooms/test-room">
                        <a>
                            <ConversationCard
                                title="Create clubhouse-clone"
                                avatars={[
                                    "https://i.pinimg.com/originals/3c/4b/fd/3c4bfd9273bfc4827e76709e3db4deec.jpg",
                                    "https://slovnet.ru/wp-content/uploads/2018/12/6-65.jpg",
                                ]}
                                guests={guests}
                                guestsCount={guests.length}
                                speakersCount={2}
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
}
