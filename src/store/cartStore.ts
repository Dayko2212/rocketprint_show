import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    imageUrl?: string | null
}

interface CartState {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (itemId: string) => void
    updateQuantity: (itemId: string, quantity: number) => void
    clearCart: () => void
    getCartTotal: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (newItem) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === newItem.id)
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === newItem.id
                                    ? { ...i, quantity: i.quantity + newItem.quantity }
                                    : i
                            ),
                        }
                    }
                    return { items: [...state.items, newItem] }
                })
            },
            removeItem: (itemId) => {
                set((state) => ({
                    items: state.items.filter((i) => i.id !== itemId),
                }))
            },
            updateQuantity: (itemId, quantity) => {
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i
                    ),
                }))
            },
            clearCart: () => set({ items: [] }),
            getCartTotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                )
            },
        }),
        {
            name: 'ecommerce-cart-storage',
        }
    )
)
