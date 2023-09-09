import React, { useContext, useState, useEffect } from "react";
import Cart from "./Cart/Cart";
import NavBar from "../NavBar/NavBar";

import { Box, Button, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { getAllProducts } from "../../services/ProizvodService";
import CartContext from "../../contexts/cart-context";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';


const Shop = () => {

  const exceptionRead = (value) => value.split(":")[1].split("at")[0];  
  
  const cartCtx = useContext(CartContext);

  const [products, setProducts] = useState([]);

  const [openCart, setOpenCart] = useState(false);

  const img = "data:image/*;base64,";
  const imgUrl = process.env.PUBLIC_URL + "/product.jpg";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
        
      } catch (error) {
        if (error) alert(exceptionRead(error.response.data));
        return;
      }
    };

    fetchData();
  }, [openCart]);

  const openCartHandler = () => {
    setOpenCart(true);
  };

  const closeCartHandler = () => {
    setOpenCart(false);
  };

  const handleAddProduct = (id, name, price) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: 1,
      price: price,
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      type: "number",
      headerAlign: "center",
    },
    {
      field: "slika",
      headerName: "Slika",
      width: 250,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div>
            <Avatar
              src={params.row.slika !== "" ? img + params.row.slika : imgUrl}
              style={{ width: "150px", height: "150px", marginLeft: "50px"}}
              sx={{
                borderRadius: 0
              }}
            ></Avatar>
          </div>
        );
      },
    },
    { field: "naziv", headerName: "Naziv", width: 130 },
    { field: "opis", headerName: "Opis", width: 170 },
    { field: "kolicina", headerName: "Količina", width: 100 },
    { field: "cena", headerName: "Cena", width: 100 },
    {
      field: "",
      headerName: "",
      width: 250,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {

        return (
          <div>
            <Button
            sx={{'&:hover': {
                backgroundColor: 'crimson',
                color: 'white',
            }}}
              variant="contained"
              color="info"
              style={{ width: "150px", height: "30px", borderRadius: "10px" }}
              onClick={() => handleAddProduct(params.row.id,params.row.naziv, params.row.cena)}
            >
            Dodaj u korpu
            </Button>
          </div>
        );
      },
    },
    {
      field: 'cartButton',
      headerName: '',
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'right',
      renderHeader: () => (
        <Button
          variant="contained"
          onClick={() => openCartHandler()}
          style={{ width: "150px", height: "30px", borderRadius: "10px" }}
          sx={{ m: 1, backgroundColor: "white", color: "crimson",
          '&:hover': {
            backgroundColor: 'crimson',
            color: 'white',
        }}}
        >
          <Badge badgeContent={cartCtx.items.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </Button>
      ),
    },
  ];

  return (
    <>      
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          margin: 10,
          marginTop: 5,
          marginBottom: 1,
          backgroundColor: "white",
          
        }}
      >
        <DataGrid
          hideScrollbar={true} 
          rows={products}
          columns={columns}
          rowHeight={180}
          sx={{ color: "black",textAlign: "center"
          ,"& .MuiDataGrid-row": {
            border: "1px solid white",
            borderRadius: "5px",
            backgroundColor: "lightgray",
            marginBottom: 2,
            hideScrollbar: "true",
            border: 3,
            borderRadius: 2,
            borderColor: "white",
            fontSize: "16px",
            fontFamily: "bold"
          },
          "& .MuiDataGrid-columnHeader": {
            border: "1px solid crimson",
            borderRadius: "1px",
            backgroundColor: "crimson",
            color: "white",
            fontSize: "14px",
            textAlign: "center",
            fontFamily: "bold"
          }, 
          '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {display: 'none' }}}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            }
            ,
            
          }
        }
          pageSizeOptions={[5, 10]}
        />
      </Box>
      <Cart open={openCart} onClose={closeCartHandler} />
    </>
  );
};

export default Shop;