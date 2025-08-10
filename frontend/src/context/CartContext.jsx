import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return [];
};

const initialState = {
  cartItems: loadCartFromStorage(),
};

function cartReducer(state, action) {
  console.log('Cart action:', action.type, action.payload);
  
  switch (action.type) {
    case 'ADD_TO_CART':
      const existing = state.cartItems.find(item => item._id === action.payload._id);
      if (existing) {
        console.log('Incrementing existing item');
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item._id === existing._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        console.log('Adding new item to cart');
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item._id !== action.payload),
      };
    case 'INCREMENT':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case 'DECREMENT':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item._id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case 'CLEAR_CART':
      console.log('Clearing cart');
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.cartItems]);
  
  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
