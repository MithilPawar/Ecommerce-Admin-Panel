import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSingleProduct,
  fetchAllCategories,
  updateProduct,
} from "../../services/dashboardService";
import ProductForm from "../../features/products/ProductForm";

import {
  Card,
  CardMedia,
  Typography,
  Grid,
  Button,
  IconButton,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch product details
  const loadProduct = async () => {
    setLoading(true);
    const data = await fetchSingleProduct(id);
    setProduct(data);
    setSelectedImage(data.images?.[0]?.url || "/placeholder.jpg");
    setLoading(false);
  };

  // Fetch category list
  const loadCategories = async () => {
    const data = await fetchAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadProduct();
    loadCategories();
    // eslint-disable-next-line
  }, [id]);

  // Handle update from form
  const handleUpdate = async (formData) => {
    await updateProduct(id, formData);
    await loadProduct();
    setIsEditing(false);
  };

  if (loading)
    return (
      <Stack alignItems="center" mt={10}>
        <CircularProgress size={48} color="primary" />
        <Typography variant="h6" mt={2}>
          Loading...
        </Typography>
      </Stack>
    );

  if (!product)
    return (
      <Typography align="center" mt={10} color="error">
        Product not found
      </Typography>
    );

  return (
    <Grid container justifyContent="center" py={4}>
      <Grid item xs={12} md={8}>
        {/* Page Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4" color="primary.dark" fontWeight={700}>
            Product Details
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/products")}
          >
            Back to Products
          </Button>
        </Stack>

        {/* Main Content */}
        {isEditing ? (
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>
              Edit Product
            </Typography>
            <ProductForm
              onSubmit={handleUpdate}
              initialData={product}
              categories={categories}
              onCancel={() => setIsEditing(false)}
            />
          </Card>
        ) : (
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 3 }}>
            <Grid container spacing={3}>
              {/* Image Section */}
              <Grid item xs={12} sm={5}>
                {/* Main Image */}
                <CardMedia
                  component="img"
                  height="220"
                  image={selectedImage}
                  alt={product.name}
                  sx={{
                    borderRadius: 2,
                    objectFit: "cover",
                    mb: 2,
                    width: "100%",
                    maxHeight: 220,
                  }}
                />

                {/* Thumbnails */}
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {product.images?.map((img, i) => (
                    <CardMedia
                      key={i}
                      component="img"
                      image={img.url}
                      alt={`Thumbnail ${i + 1}`}
                      onClick={() => setSelectedImage(img.url)}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        objectFit: "cover",
                        cursor: "pointer",
                        border:
                          img.url === selectedImage
                            ? "2px solid #1976d2"
                            : "1px solid #ccc",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Grid>

              {/* Product Info Section */}
              <Grid item xs={12} sm={7}>
                <Stack direction="row" alignItems="center" mb={1}>
                  <Typography variant="h5" fontWeight={600} flexGrow={1}>
                    {product.name}
                  </Typography>
                  <IconButton
                    color="warning"
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit"
                  >
                    <EditIcon />
                  </IconButton>
                </Stack>

                <Typography variant="body1" mb={1}>
                  {product.description}
                </Typography>

                <Typography variant="h6" color="success.dark" mb={2}>
                  ₹ {product.price}
                </Typography>

                <Stack direction="row" spacing={2} mb={1}>
                  <Chip
                    label={product.category?.name || "N/A"}
                    icon={<CategoryIcon />}
                    color="info"
                    variant="outlined"
                  />
                  <Chip
                    label={`Stock: ${product.stock}`}
                    icon={<InventoryIcon />}
                    color={product.stock > 0 ? "success" : "error"}
                    variant="outlined"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}

export default ProductDetailsPage;
