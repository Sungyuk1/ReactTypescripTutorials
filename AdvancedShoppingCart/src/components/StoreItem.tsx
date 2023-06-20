import {Button, Card} from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/ShoppingCartContext"

//here we are giving the props of StoreItem types since we are using typescript
type StoreItemProps = {
    id: number, 
    name: string, 
    price: number,
    imgUrl: string
}
//Here we are defining types for our props (StoreItemProps) and we are giving the {} which holds our props the type of StoreItemProps
//mt-auto : fill all the possible space above it
export function StoreItem({id, name, price, imgUrl}: StoreItemProps){
    //using context to get the functions to change properties about an item using the item id. 
    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
    const quantity = getItemQuantity(id)

    return(
    <Card className="h-100">
        <Card.Img variant="top" src={imgUrl} height="200px" style={{objectFit: "cover"}}/>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-2">
                    {name}
                </span>
                <span className="ms-2 text-muted">
                    {formatCurrency(price)}
                </span>

            </Card.Title>

            <div className="mt-auto">
                {quantity === 0 ?(
                <Button className="w-100" onClick={()=> increaseCartQuantity(id)}>
                    + Add to Cart
                </Button>) : 
                <div className="d-flex align-items-center flex-column" style={{gap: ".5rem"}}>
                    <div className="d-flex align-items-center justify-content-center" style={{gap: ".5rem"}}>
                        <Button onClick={()=> decreaseCartQuantity(id)}>
                            -
                        </Button>
                        <div>
                            <span className="fs-3">{quantity+" "}</span>
                             in cart
                        </div>
                        <Button onClick={()=> increaseCartQuantity(id)}>
                            +
                        </Button>

                    </div>

                    <Button variant="danger" size="sm" onClick={()=> removeFromCart(id)}>
                        Remove

                    </Button>

                </div>
                    }

            </div>

        </Card.Body>

    </Card>)

}