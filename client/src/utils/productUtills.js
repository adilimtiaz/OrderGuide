export const getProductQuantityDisplayValue = product => {
    let displayValue;

    if(product.orderQuantity === 0){
        return "Skip";
    }

    if(product.orderQuantity){
        // If product has an orderQuantity display that
        displayValue = product.orderQuantity;
    } else {
        // Else display minOrder
        displayValue = product.minQuantity;
    }


    displayValue += product.unitQuantity.toUpperCase();

    displayValue = "  " + displayValue + "  ";

    return displayValue;
};
