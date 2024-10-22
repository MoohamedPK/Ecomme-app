import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

const getTotalQuantity = createSelector((state: RootState) => state.cart.items, (items) => {
    const totalQuantity = Object.values(items).reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0);
    return totalQuantity
})

export {getTotalQuantity};