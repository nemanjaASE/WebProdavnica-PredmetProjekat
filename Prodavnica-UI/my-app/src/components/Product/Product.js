import React, { useState, useEffect } from "react";

import NavBar from "../NavBar/NavBar";
import NewProduct from "./NewProduct/NewProduct";
import UpdateProduct from "./UpdateProduct/UpdateProduct.js";

import {
  Box,
  Button,
  Avatar,

} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import {
  deleteProduct,
  getMyProducts,
  getProductById,
} from "../../services/ProizvodService";

const Product = () => {
  
  const [newProductOpen, setNewProductOpen] = useState(false);
  const [updateProductOpen, setUpdateProductOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [change, setChange] = useState(false);

  const img = "data:image/*;base64,";
  const imgUrl = process.env.PUBLIC_URL + "/proizvod.jpg";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyProducts();
        setProducts(response.data);
      } catch (error) {
       if (error) alert(error.response.data);
        return;
      }
    };

    fetchData();
  }, [change]);

  const handleAddProduct = () => {
    setNewProductOpen(true);
  };

  const handleCloseNewProduct = () => {
    setNewProductOpen(false);
    setChange(!change);
  };

  const handleUpdateProduct = (id) => {
    setUpdateProductOpen(true);
    const fetchData = async () => {
      try {
        const response = await getProductById(id);
        setSelectedProduct(response.data);
      } catch (error) {
        if (error) alert(error.response.data);
        return;
      }
    };

    fetchData();
  };


  const handleCloseUpdateProduct = () => {
    setUpdateProductOpen(false);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id);
      setChange(!change);
    } catch (error) {
      if (error) alert(error.response.data);
      return;
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80, type: "number", flex: 1, maxWidth: 40},
    {
      field: "slika",
      headerName: "Slika",
      width: 250,
      sortable: false,
      renderCell: (params) => {

        return (
          <div>
            <Avatar
              src={params.row.slika !== "" ? img + params.row.slika : imgUrl}
              style={{ width: "100px", height: "100px" }}
              sx={{
                borderRadius: 0
              }}
            ></Avatar>
          </div>
        );
      },
    },
    { field: "naziv", headerName: "Naziv", maxWidth: 150, flex: 1 },
    { field: "opis", headerName: "Opis", maxWidth: 200, flex: 1 },
    { field: "kolicina", headerName: "Količina", maxWidth: 90, flex: 1 },
    { field: "cena", headerName: "Cena", maxWidth: 100, flex: 1 },
    {
      field: 'productButton',
      headerName: '',
      mxWidth: 120,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'right',
      renderHeader: () => (
        <Button
          variant="filled"
          color="success"
          onClick={() => handleAddProduct()}
          sx={{ marginRight: "200px",color: "crimson", backgroundColor: "white",
          '&:hover': {
            backgroundColor: 'lightgray',
            color: "green"}}}
        >
          Dodaj novi
        </Button>
      ),
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <div>
            <Button
              style={{ marginRight: "10px", width: "100px", height: "30px"}}
              variant="outlined"
              color="success"
              onClick={() => handleUpdateProduct(id)}
            >
              Izmeni
            </Button>
            <Button
              style={{ marginRight: "14px", width: "100px", height: "30px"}}
              variant="outlined"
              color="error"
              onClick={() => handleDeleteProduct(id)}
            >
              Obriši
            </Button>
          </div>
        );
      },
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
          height: "100vh",
          backgroundColor: "lightgray",
        }}
      >
        <NewProduct open={newProductOpen} onClose={handleCloseNewProduct}/>
        {selectedProduct && (
          <UpdateProduct
            open={updateProductOpen}
            onClose={handleCloseUpdateProduct}
            product={selectedProduct}/>
        )}
        <DataGrid
          localeText={{ noRowsLabel: "Nemate nijedan dodat proizvod"}}
          rows={products}
          columns={columns}
          rowHeight={200}
          sx={{ color: "black",textAlign: "center", BorderAllSharp: "1px", marginTop:"100px"
          ,"& .MuiDataGrid-row": {
             fontSize: 18,
             border: "1px solid white",
             borderRadius: "5px",
             backgroundColor: "white",
           },
           '& .MuiDataGrid-cell:hover': {
             color: 'crimson',
           },
           "& .MuiDataGrid-columnHeader": {
             border: "1px solid crimson",
             borderRadius: "1px",
             backgroundColor: "crimson",
             color: "white"
           },}}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </>
  );
};

export default Product;