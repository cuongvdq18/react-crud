import axios from 'axios';

const Product_API_BASE_URL = "http://34.124.251.21:8000/api/v1/admin/products";
var retrievedObject = localStorage.getItem('token');
		const token = retrievedObject;
        console.log(token)
		const config = {
			headers: { Authorization: `Bearer ${token}` }
		}

class ProductService {

    getProducts(PageNumber){
        return axios.get(Product_API_BASE_URL + '/?page=' +PageNumber,config);
    }

    createProduct(Product){
        return axios.post(Product_API_BASE_URL, Product,config);
    }

    getProductById(ProductId){
        return axios.get(Product_API_BASE_URL + '/' + ProductId,config);
    }

    updateProduct(Product, ProductId){
        return axios.post(Product_API_BASE_URL + '/' + ProductId, Product,config);
    }

    deleteProduct(ProductId){
        return axios.delete(Product_API_BASE_URL + '/' + ProductId,config);
    }
}

export default new ProductService()