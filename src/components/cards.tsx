import { FC, useEffect, useState } from "react";

import { mdiCheckboxMarked } from "@mdi/js";

// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import TextInput from "./TextInput";
import Icon from "@mdi/react";

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

type Cards =
    | {
          name: string;
          id: string;
          data: { name: string; id: string; quantity: string }[];
      }[];

const createCard = data => {
    console.log(data);
};

const Cards = props => {
    const [cardsList, setCardsList] = useState([] as Cards);
    const [newCard, setNewCard] = useState("");

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "our-birthday", "list"), doc => {
            const cards: Cards = doc.data().cards;
            setCardsList(cards);
        });
        return () => {
            unsub();
        };
    }, []);

    return (
        <div className="flex flex-col gap-1">
            <ul className="flex flex-col gap-1">
                <AnimatePresence>
                    {cardsList.length > 0 ? (
                        cardsList.map((e, i) => (
                            <motion.li
                                variants={{
                                    hidden: i => ({
                                        opacity: 0,
                                        y: -50 * i,
                                    }),
                                    visible: i => ({
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: i * 0.05,
                                        },
                                    }),
                                    removed: {
                                        opacity: 0,
                                        height: 0,
                                    },
                                }}
                                initial="hidden"
                                animate="visible"
                                exit="removed"
                                custom={i}
                                className="flex flex-row justify-between hover:bg-bg transition-colors duration-150 p-1 px-2 rounded-lg cursor-pointer"
                                key={e.id}
                            >
                                <div>{e.name}</div>
                                <motion.div
                                    variants={{
                                        hidden: () => ({
                                            opacity: 0,
                                            x: -25,
                                        }),
                                        visible: () => ({
                                            opacity: 1,
                                            x: 0,
                                            transition: {
                                                delay: 0.05,
                                                type: "spring",
                                            },
                                        }),
                                        removed: {
                                            opacity: 0,
                                            x: 25,
                                        },
                                    }}
                                    initial="hidden"
                                    animate="visible"
                                    exit="removed"
                                    key={`${e.id}-${e.data.length}`}
                                >
                                    {e.data.length}
                                </motion.div>
                            </motion.li>
                        ))
                    ) : (
                        <div className="italic">Rien à Afficher</div>
                    )}
                </AnimatePresence>
            </ul>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    createCard(newCard);
                    setNewCard("");
                }}
                className="flex flex-row justify-between items-center gap-3 w-full"
            >
                <AnimatePresence>
                    <TextInput
                        onChange={e => setNewCard(e.target.value)}
                        value={newCard}
                        label="Compléter la Liste"
                    />
                    {newCard.length > 0 ? (
                        <motion.button
                            initial={{ opacity: 0, width: 0 }}
                            animate={{
                                opacity: 100,
                                width: "auto",
                                transition: { duration: 0.2 },
                            }}
                            exit={{
                                opacity: 0,
                                width: 0,
                                transition: { duration: 0.2 },
                            }}
                            type="submit"
                            whileHover={{ scale: 1.2, rotate: 20 }}
                            key="formSubmit"
                            whileTap={{
                                scale: 0.9,
                                rotate: -45,
                                borderRadius: "100%",
                            }}
                        >
                            <Icon path={mdiCheckboxMarked} size={1} />
                        </motion.button>
                    ) : null}
                </AnimatePresence>
            </form>
        </div>
    );
};

export default Cards;
