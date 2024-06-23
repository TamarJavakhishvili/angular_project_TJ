import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  public productList:any[] = [];
  public query:any;
  public filteredList:any[] = [];

  public minPrice:String = '';
  public maxPrice:String = '';

  constructor(public service:HttpService, private route:ActivatedRoute) {

    this.route.queryParams.subscribe(info => this.query = info)

    this.service.getAllProducts().subscribe(data => {
      // console.log(data);
      this.productList = data;

      this.filteredList = this.productList.filter(item => item.category == this.query.test)
   
      if (this.filteredList.length == 0) {
        this.filteredList = this.productList;
      }
   
    })
    
  }

   
  filterByPrice() {
    
    if (this.minPrice.length == 0) {
      this.minPrice = "0";
    }

    if (this.maxPrice.length == 0) {
      this.maxPrice = "10000";
    }

    if (this.query.test == undefined) {
      this.filteredList = this.productList.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice)  
    }

    else {
      this.filteredList = this.productList.filter(item => item.category == this.query.test && item.price >= this.minPrice && item.price <= this.maxPrice)

    }

  }

  

}
