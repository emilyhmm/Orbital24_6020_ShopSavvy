import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import '../App.css'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const handleNavigation = (link) => {
    window.location.href = `${link}`;
};

function Productlist() {
    const query = useQuery();
    const searchTerm = query.get('search');
    console.log(searchTerm);
    const [products, setProducts] = useState([]);

    useEffect((searchTerm) => {
        const fetchProducts = async (searchTerm) => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/product/scrape`, {"searchTerm": query.get('search')});
                setProducts(response.data.result);
                console.log(response.data.result);
            } catch (error) {
                console.error('Error fetching products:', error.response ? error.response.data : error.message);
            }
        };
            fetchProducts(searchTerm);
        }, [searchTerm]);

  return (
    <div>
      <h1> Searching for: {searchTerm}</h1>
      {products.length > 0 ? (
        <div className = "product__cardsdisplay" style={{background: "CDCDCD"}} >
          {products.map(product => (
              <Card sx={{ maxWidth: 345, margin:0.46
               }}>
              <CardActionArea>
                <div style={{background: "CDCDCD"}}>
                  <CardMedia
                      component="img"
                      height="200"
                      image= {product.image}
                      alt= {product.title}
                      sx={{ padding: "1em 1em 0 1em", objectFit: "contain" } }
                  />
                </div>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography gutterBottom variant="h4" component="div">
                    {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default Productlist;
