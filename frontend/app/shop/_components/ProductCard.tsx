import Image from "next/image";

export const ProductCard=(
    props:{
        name:string,
        description:string,
        price:number,
        stock:number,
        available:boolean,
        category:string,
        imageUrl:string})=>{

    return(
        <div>
            <Image src={props.imageUrl} alt={props.name}/>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <p>{props.category}</p>
            <h3>{props.price}</h3>
            <p>{props.stock}</p>
            {
                props.available ?
                    <p>quantité disponible :{props.stock}</p>
                    :
                    <p>produit indisponible</p>
            }

        </div>
    )
}