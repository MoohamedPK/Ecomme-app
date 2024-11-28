export type TProduct = {
    id: number,
    title: string,
    price: number,
    img: string,
    cat_prefix: string,
    quantity? : number,
    max: number,
    isLiked?: boolean,
    isAuthenticated?: boolean
}