import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public categories:String[] = ["men's clothing", "women's clothing", "jewelery", "electronics"];


  // getIconClass(category: String) {
  //   switch (category) {
  //     case "men's clothing":
  //       return 'fas fa-male';
  //     case "women's clothing":
  //       return 'fas fa-female';
  //     case "jewelery":
  //       return 'fas fa-gem';
  //     case "electronics":
  //       return 'fas fa-tv';
  //     default:
  //       return '';
  //   }
  // }

  getCategoryImage(category: any): any {
    switch (category) {
      case "men's clothing":
        return 'assets/images/mens-clothing.jpg';
      case "women's clothing":
        return 'assets/images/womens-clothing.jpg';
      case "jewelery":
        return 'assets/images/jewellery.jpg';
      case "electronics":
        return 'assets/images/electronics.jpg';
      default:
        return 'assets/images/default.jpg';
    }
  }

}
