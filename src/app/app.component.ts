import { Component } from '@angular/core';
import { ProductsService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private productService: ProductsService) {

  }

  products = null;
  formHeader = "Add Product";
  name = "";
  price: Number;
  stock: Number;
  showForm = false;
  id: Number;

  ngOnInit(): void {
    this.getProducts()
  }
  getProducts() {
    this.productService.fetchProducts().subscribe(
      (data) => {
        this.products = data
      },
      (error) => {
        console.log("error")
      }
    )
  }
  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(
      (res) => {

        this.getProducts()

      }
    )
  }
  openForm(data = null) {
    this.clearForm();
    this.showForm = true;
    if (data) {
      this.name = data.name;
      this.price = data.price;
      this.stock = data.stock;
      this.id = data.id;
      this.formHeader = "Update Product"
    }
    else {
      this.id = null;
      this.formHeader = "Add Product"

    }
  }

  closeForm() {
    this.showForm = false;
    this.clearForm()
  }

  clearForm() {
    this.name = null;
    this.price = null;
    this.stock = null;


  }

  saveProduct() {

    this.showForm = false;

    let body = {
      name: this.name,
      price: this.price,
      stock: this.stock,
    }

    if (this.id) {
      body['id'] = this.id;
      this.productService.updateProduct(body).subscribe(
        (res) => {
          this.getProducts()
        },

      )
    }

    else {
      this.productService.createProduct(body).subscribe(
        (res) => {
          this.getProducts()
        },
      )
    }

  }

}
