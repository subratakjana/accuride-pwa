import React, { createContext, useState, useEffect } from 'react';

export const ProductCompareContext = createContext({
    cProducts: [],
    setCProducts: () => null,
});

export const ProductCompareProvider = (props) => {
    const initialValue = [];

    const [cProducts, setCProducts] = useState(() => {
        try {
            const item = window.localStorage.getItem('compareProducts');
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    useEffect(() => {
        window.localStorage.setItem('compareProducts', JSON.stringify(cProducts));
    }, [cProducts]);

    const provider = {
        cProducts,
        setCProducts: (products, isReplace) => {
            if (!isReplace && products) {
                const existingIds = cProducts.map((product) => product.product_sku);
                if (!existingIds.includes(products.product_sku)) {
                    setCProducts((oldCProducts) => [...oldCProducts, products]);
                }
            }
            if (isReplace) {
                setCProducts(products);
            }
            if (isReplace && !products) setCProducts([]);
        },

        clearCProducts: () => {
            setCProducts([]);
        },

        sliceProduct: (products) => {
            let existingIds = cProducts.map((product) => product.product_sku);
            existingIds = existingIds.indexOf(products.product_sku);
            const newObj = [...cProducts];
            newObj.splice(existingIds, 1);
            setCProducts(newObj);
        },

    };

    return (
        <ProductCompareContext.Provider value={provider}>
            {props.children}
        </ProductCompareContext.Provider>
    );
};
