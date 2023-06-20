import { ReactNode, createContext, useContext, useState} from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

//ReactNode is just what you give the children property in react
type ShoppingCartProviderProps = {
    children: ReactNode
}

//No add to cart since adding to cart is the same as increasing our quantity from 0 to 1
type ShoppingCartContext = {
    openCart: () => void,
    closeCart: () => void,
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number,
    cartItems: CartItem[]
}

type CartItem = {
    id: number,
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){

    //The format below is giving the cartItems state the type of CartItem []
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("Shopping-cart", [])

    const [isOpen, setIsOpen] = useState(false)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    //All this is doing is counting up all the different quantities of the different items 
    const cartQuantity = cartItems.reduce((quantity, item)=> item.quantity + quantity, 0)

    function getItemQuantity(id: number){
        //return quantity if we have that item, else return 0
        //syntax - if we find something return quantity, if we don't return 0
        return cartItems.find(item => item.id === id)?.quantity|| 0
    }

    function increaseCartQuantity(id: number){
        setCartItems(currItems =>{
            if (currItems.find(item => item.id === id) == null){
                //Case if that item does not exist
                return [...currItems, {id, quantity: 1}]
            }else {
                //If the item does exist, map through all the items, and if it is the right item, then increase the quantity by 1
                //If it is not the right item, the do nothing to it
                //Seems like the code could be optimized, but its just a tutorial lol
                return currItems.map(item =>{
                    if (item.id == id){
                        return {...item, quantity: item.quantity+1}
                    }else{
                        return item
                    }
                })

            }
        })
    }

    function decreaseCartQuantity(id: number){
        setCartItems(currItems =>{
            if (currItems.find(item => item.id === id)?.quantity === 1){
                //If the quantity is 1, remove it from the lsit
                return currItems.filter(item => item.id !== id)
            }else {
                //If the item does exist, map through all the items, and if it is the right item, then increase the quantity by 1
                //If it is not the right item, the do nothing to it
                //Seems like the code could be optimized, but its just a tutorial lol
                return currItems.map(item =>{
                    if (item.id == id){
                        return {...item, quantity: item.quantity-1}
                    }else{
                        return item
                    }
                })

            }
        })
    }

    function removeFromCart(id: number){
        setCartItems(currItems =>{
            return currItems.filter(item => item.id !== id)
        })
    }

    return <ShoppingCartContext.Provider 
    value={{getItemQuantity, 
    increaseCartQuantity, 
    decreaseCartQuantity, 
    removeFromCart, 
    openCart, 
    closeCart, cartItems, cartQuantity}}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
}