import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>(this.getCartFromLocalStorage());
  cart$ = this.cart.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  private getCartFromLocalStorage(): any[] {
    if (this.isBrowser()) {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  private saveCartToLocalStorage(cart: any[]): void {
    if (this.isBrowser()) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
  }

  getCart() {
    return this.cart.value;
  }

  addToCart(product: any) {
    const currentCart = this.getCart();
    const existingProductIndex = currentCart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      currentCart[existingProductIndex].quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    this.cart.next(currentCart);
    this.saveCartToLocalStorage(currentCart);
  }

  removeFromCart(productId: number) {
    let currentCart = this.getCart();
    currentCart = currentCart.filter(item => item.id !== productId);

    this.cart.next(currentCart);
    this.saveCartToLocalStorage(currentCart);
  }

  clearCart() {
    this.cart.next([]);
    this.saveCartToLocalStorage([]);
  }
}
