import { FC, LiHTMLAttributes, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { mdiDeleteEmpty } from "@mdi/js";
import Cards, { deleteCard, deleteItem } from "./cards";
import Icon from "@mdi/react";

type ValueOfArray<T> = T extends Array<infer Item> ? Item : never;

const Item: FC<
    LiHTMLAttributes<HTMLInputElement> & {
        e: {
            name: string;
            id: string;
            quantity: string;
        };
        i: number;
        cardId: string;
    }
> = props => {
    const { e, i, cardId } = props;

    const [isHovered, setIsHovered] = useState(false);

    return (
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
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onTap={() => setIsHovered(true)}
        >
            <div className="break-all">{e.name}</div>
            <div className="flex items-center ml-3">
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
                    key={`${e.id}-${e.quantity}`}
                >
                    {e.quantity}
                </motion.div>
                {!isHovered ? (
                    ""
                ) : (
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
                        key={`formSubmit-${i}`}
                        onClick={() => {
                            deleteItem(cardId, e.id);
                        }}
                        whileTap={{
                            scale: 0.9,
                            rotate: -45,
                            borderRadius: "100%",
                        }}
                    >
                        <Icon path={mdiDeleteEmpty} size={1} />
                    </motion.button>
                )}
            </div>
        </motion.li>
    );
};

export default Item;
