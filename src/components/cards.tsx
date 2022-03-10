import { useEffect, useState } from "react";

import { mdiCheckboxMarked } from "@mdi/js";

// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import {
    collection,
    doc,
    getDoc,
    getFirestore,
    setDoc,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import TextInput from "./TextInput";
import Icon from "@mdi/react";
import Card from "./card";
import SelectedCard from "./selectedCard";

const firebaseApp = initializeApp(
    {
        apiKey: "AIzaSyCuBChI8GKNM7AIdrafw3bu-izwAeHddxs",
        authDomain: "notre-anniv.firebaseapp.com",
        projectId: "notre-anniv",
    },
    "FireBaseApp"
);

const db = getFirestore(firebaseApp);

type Cards =
    | {
          name: string;
          id: string;
          data: { name: string; id: string; quantity: string }[];
      }[];

const createCard = async data => {
    const docRef = doc(db, "db/list");
    const cards: Cards = await (await getDoc(docRef)).data().cards;
    cards.push({
        id: `${Math.floor(Math.random() * 10000)}`,
        name: data,
        data: [],
    });
    await setDoc(docRef, { cards: cards });
};

export const createItem = async (data: {
    data: { name: string; quantity: string };
    id: string;
}) => {
    const docRef = doc(db, "db/list");
    const cards: Cards = await (await getDoc(docRef)).data().cards;
    cards
        .find(e => e.id === data.id)
        .data.push({
            id: `${Math.floor(Math.random() * 10000)}`,
            name: data.data.name,
            quantity: data.data.quantity,
        });
    await setDoc(docRef, { cards: cards });
};

export const deleteCard = async data => {
    const docRef = doc(db, "db/list");
    const cards: Cards = await (await getDoc(docRef)).data().cards;
    const newCards = cards.filter(e => e.id !== data);
    await setDoc(docRef, { cards: newCards });
};

export const getCardData = async data => {
    const docRef = doc(db, "db/list");
    const cards: Cards = await (await getDoc(docRef)).data().cards;
    const card = cards.find(e => e.id === data);
    return card;
};

const Cards = props => {
    const [cardsList, setCardsList] = useState([] as Cards);
    const [newCard, setNewCard] = useState("");

    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "db", "list"), doc => {
            const cards: Cards = doc.data().cards;
            setCardsList(cards);
        });
        return () => {
            unsub();
        };
    }, []);

    useEffect(() => {
        if (document.getElementById(selectedCard) === null)
            return setSelectedCard(null);
        console.log(selectedCard);
    }, [cardsList]);

    return (
        <>
            <div className="flex flex-col justify-center text-text-ice text-sm w-full py-4 px-10 bg-box rounded-xl">
                <div className="flex flex-col gap-1">
                    <ul className="flex flex-col gap-1">
                        <AnimatePresence>
                            {cardsList.length > 0 ? (
                                cardsList.map((e, i) => (
                                    <div
                                        onClick={() => {
                                            setSelectedCard(e.id);
                                        }}
                                        key={e.id + "-component"}
                                    >
                                        <Card
                                            key={e.id}
                                            id={e.id}
                                            e={e}
                                            i={i}
                                        />
                                    </div>
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
                        className="flex flex-row justify-between items-center w-full"
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
                                        opacity: 1,
                                        width: "auto",
                                        marginLeft: "12px",
                                        transition: { duration: 0.2 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        width: 0,
                                        marginLeft: 0,
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
            </div>
            <AnimatePresence>
                {selectedCard !== null ? (
                    <motion.div
                        className="flex flex-col gap-6 w-full justify-center items-center"
                        variants={{
                            hidden: () => ({
                                opacity: 0,
                                y: -50,
                            }),
                            visible: () => ({
                                opacity: 1,
                                y: 0,
                            }),
                            removed: {
                                opacity: 0,
                                height: 0,
                            },
                        }}
                        initial="hidden"
                        animate="visible"
                        exit="removed"
                    >
                        <div className="border-b" style={{ width: 250 }}></div>
                        <div className="flex flex-col justify-center text-text-ice text-sm w-full py-4 px-10 bg-box rounded-xl">
                            <SelectedCard
                                key={selectedCard}
                                id={selectedCard}
                            />
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    );
};

export default Cards;
