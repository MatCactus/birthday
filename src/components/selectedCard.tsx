import { FC, LiHTMLAttributes, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { mdiCheckboxMarked, mdiDeleteEmpty } from "@mdi/js";
import Cards, { createItem, deleteCard, getCardData } from "./cards";
import Icon from "@mdi/react";
import TextInput from "./TextInput";
import Item from "./item";

type ValueOfArray<T> = T extends Array<infer Item> ? Item : never;

const SelectedCard: FC<
    JSX.IntrinsicElements["div"] & { cardId: string }
> = props => {
    const { cardId } = props;

    const [isHovered, setIsHovered] = useState(false);

    const [newItem, setNewItem] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState("");
    const [card, setCard] = useState(null as ValueOfArray<Cards>);

    useEffect(() => {
        getCardData(cardId).then(e => setCard(e));
    });

    return (
        <motion.div>
            {!card ? null : (
                <div className="flex flex-col gap-2 justify-items-start items-start">
                    <div className="flex flex-row gap-1 justify-center font-semibold text-lg items-center">
                        {card.name}
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
                            whileHover={{ scale: 1.2, rotate: 20 }}
                            onClick={() => {
                                deleteCard(cardId);
                            }}
                            whileTap={{
                                scale: 0.9,
                                rotate: -45,
                                borderRadius: "100%",
                            }}
                        >
                            <Icon path={mdiDeleteEmpty} size={1} />
                        </motion.button>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col gap-1">
                            <ul className="flex flex-col gap-1">
                                <AnimatePresence>
                                    {card.data.length > 0 ? (
                                        card.data.map((e, i) => (
                                            <div key={e.id + "-component"}>
                                                <Item
                                                    key={e.id}
                                                    id={e.id}
                                                    e={e}
                                                    i={i}
                                                    cardId={card.id}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="italic">
                                            Rien à Afficher
                                        </div>
                                    )}
                                </AnimatePresence>
                            </ul>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    createItem({
                                        data: {
                                            name: newItem,
                                            quantity: newItemQuantity,
                                        },
                                        id: cardId,
                                    });
                                    setNewItem("");
                                    setNewItemQuantity("");
                                }}
                                className="flex flex-row justify-between items-center w-full"
                            >
                                <AnimatePresence>
                                    <div className="flex flex-row gap-1">
                                        <TextInput
                                            onChange={e =>
                                                setNewItem(e.target.value)
                                            }
                                            value={newItem}
                                            label="Nom"
                                        />
                                        <TextInput
                                            onChange={e =>
                                                setNewItemQuantity(
                                                    e.target.value
                                                )
                                            }
                                            style={{
                                                width: "40%",
                                            }}
                                            value={newItemQuantity}
                                            label="Quantité"
                                        />
                                    </div>
                                    {newItem.length > 0 &&
                                    newItemQuantity.length > 0 ? (
                                        <motion.button
                                            initial={{
                                                opacity: 0,
                                                width: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                width: "auto",
                                                marginLeft: "12px",
                                                transition: {
                                                    duration: 0.2,
                                                },
                                            }}
                                            exit={{
                                                opacity: 0,
                                                width: 0,
                                                marginLeft: 0,
                                                transition: {
                                                    duration: 0.2,
                                                },
                                            }}
                                            type="submit"
                                            whileHover={{
                                                scale: 1.2,
                                                rotate: 20,
                                            }}
                                            key="itemFormSubmit"
                                            whileTap={{
                                                scale: 0.9,
                                                rotate: -45,
                                                borderRadius: "100%",
                                            }}
                                        >
                                            <Icon
                                                path={mdiCheckboxMarked}
                                                size={1}
                                            />
                                        </motion.button>
                                    ) : null}
                                </AnimatePresence>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default SelectedCard;
