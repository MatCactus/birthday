import type { NextPage } from "next";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyD7V9qSwCeh7ZBDx8zpEW9tPvspvbBLZ-M",
    authDomain: "our-birthday.firebaseapp.com",
    databaseURL: "https://our-birthday-default-rtdb.firebaseio.com",
    projectId: "our-birthday",
    storageBucket: "our-birthday.appspot.com",
    messagingSenderId: "136022329746",
    appId: "1:136022329746:web:363450a97e710e850a994b",
    measurementId: "G-MZP257C4GV",
});

const db = getFirestore();

const Home: NextPage = () => {
    const [cardsList, setCardsList] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "our-birthday", "list"), doc => {
            const cards: { name: string; count: string }[] = doc.data().cards;
            let newCardsList = [];
            cards.forEach((e, i) =>
                newCardsList.push(
                    <div
                        key={i}
                        className="flex flex-row justify-between hover:bg-bg transition-colors duration-150 p-1 px-2 rounded-lg"
                    >
                        <div>{e.name}</div>
                        <div>{e.count}</div>
                    </div>
                )
            );
            if (newCardsList.length === 0)
                newCardsList = [
                    <div key="0" className="italic p-2">
                        Nothing to see Here ..
                    </div>,
                ];
            setCardsList(newCardsList);
        });
        return () => {
            unsub();
        };
    }, []);

    return (
        <div className="flex flex-col gap-6 w-full justify-center items-center p-6">
            <div className="flex flex-col justify-center text-text-ice text-sm w-full py-4 px-10 bg-box rounded-xl">
                {cardsList}
            </div>
            <div className="border-b" style={{ width: 250 }}></div>
            <div
                className="flex flex-col justify-between items-center gap-4"
                style={{ width: 300 }}
            >
                <iframe
                    src="https://embed.waze.com/iframe?zoom=17&lat=46.8388593&lon=-0.621037&pin=1"
                    width="300"
                    className="rounded-t-xl"
                    height="380"
                    title="11, Rue de la Fontaine, Cirières. 79140"
                ></iframe>
                <a
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-center items-center text-text-ice underline italic text-sm w-full p-4 bg-box"
                    href="https://www.google.fr/maps/place/11+Rue+Sainte-Radegonde,+79140+Ciri%C3%A8res/@46.8388314,-0.6217533,19.25z/data=!4m5!3m4!1s0x4807aa95f62a96a9:0x1725130cbd3dc528!8m2!3d46.8389303!4d-0.621256"
                >
                    <motion.p
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        11, Rue Sainte Radegonde, 79140, Cirières
                    </motion.p>
                </a>
                <iframe
                    className="rounded-b-xl"
                    src="https://open.spotify.com/embed/playlist/1v7ivWXEULN754Brx37NxU?utm_source=generator&theme=0"
                    width="300"
                    height="380"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
            </div>
        </div>
    );
};

export default Home;
