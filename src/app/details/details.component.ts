import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public product: any;
  public buttonText = 'Add to Cart';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HttpService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.service.getProductById(Number(productId)).subscribe(data => {
        this.product = data;
        // Adding sample reviews for demonstration
        this.product.reviews = [
          { author: 'John Doe', comment: 'Great product!', rating: 5 },
          { author: 'Jane Doe', comment: 'Good quality.', rating: 4 }
        ];
      });
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.buttonText = 'Item Added to Cart';
    setTimeout(() => {
      this.buttonText = 'Add to Cart';
    }, 2000);

  }
}
