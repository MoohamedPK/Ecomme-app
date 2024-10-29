export type TProduct = {
    id: number,
    title: string,
    price: string,
    img: string,
    cat_prefix: string,
    quantity? : number,
    max: number,
    isLiked?: boolean
}