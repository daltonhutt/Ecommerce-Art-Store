import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";
import { FormatItalic, StarBorderOutlined, Stars, StarsOutlined } from "@mui/icons-material";

const importAll = (r) =>
r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
}, {});

const bunnyImports = importAll(
    require.context("../../assets/bunny", false, /\.(png|jpe?g|svg)$/)
);
const catsImports = importAll(
  require.context("../../assets/cats", false, /\.(png|jpe?g|svg)$/)
);
const motherImports = importAll(
  require.context("../../assets/mother", false, /\.(png|jpe?g|svg)$/)
);
const weddingImports = importAll(
  require.context("../../assets/wedding", false, /\.(png|jpe?g|svg)$/)
);

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      `http://localhost:1337/api/items?populate=image`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box width="80%" m="70px auto" borderRadius="50px">
      <Box display="flex" flexWrap="wrap" columnGap="20px">
        {/* IMAGES */}
        <Box flex="1 1 40%" borderRadius="50px" >
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="10px">
          <Box display="flex" justifyContent="space-between">
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3"><b>{item?.attributes?.name}</b></Typography>
            <Typography sx={{ mt: "10px" }}><b>${item?.attributes?.price}</b></Typography>
            <Typography sx={{ mt: "10px" }}>
              {item?.attributes?.shortDescription}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
              borderRadius="50px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: "50px",
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
            </Box>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="TESTIMONIALS" value="testimonials" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === "testimonials" && 
        <div>
          <Typography><h5>Average Rating: </h5><div><h2><strong>5.0 / 5.0</strong></h2></div><div></div><Stars /><Stars /><Stars /><Stars /><Stars /><h8>&nbsp;&nbsp;(4) Verified Reviews</h8></Typography>
          <Box pt="30px">
          <Box display="flex" mr="10px" pb="5px"><h6><u>Dawson&nbsp;Hunt</u>:</h6><Box pl="10px"><Stars /><Stars /><Stars /><Stars /><Stars /></Box></Box>
          <Box flex="1 1 40%" borderRadius="50px" >
          <Box>
          {Object.values(weddingImports).map((texture, index) => (
                <Box key={`wedding-image-${index}`}>
                    <img
                        src={texture}
                        alt={`wedding-${index}`}
                        style={{
                            width: "60%",
                            height: "300px",
                            objectFit: "cover",
                            backgroundAttachment: "fixed"
                        }}
                        />
                </Box>
            ))}
            </Box>
        </Box>
          <Box pb="8px"><h8>Product Ordered: <b>Custom Card</b></h8></Box>
          <Box pb="35px"><h7><i>"I ordered a custom card for my wife and I's anniversary. Once the order was placed Kalli reached out to me very quickly asking about the details. After some back and forth (and even some revisions!) the card was delivered and my wife loved it!"</i></h7></Box>
          <Box display="flex" mr="10px" pb="5px"><h6><u>J.&nbsp;Defranco</u>:</h6><Box pl="10px"><Stars /><Stars /><Stars /><Stars /><Stars /></Box></Box>
          <Box flex="1 1 40%" borderRadius="50px" >
          {Object.values(motherImports).map((texture, index) => (
                <Box key={`mother-image-${index}`}>
                    <img
                        src={texture}
                        alt={`mother-${index}`}
                        style={{
                            width: "60%",
                            height: "300px",
                            objectFit: "cover",
                            backgroundAttachment: "fixed"
                        }}
                        />
                </Box>
            ))}
          
        </Box>
          <Box pb="8px"><h8>Product Ordered: <b>Custom Card</b></h8></Box>
          <Box pb="35px"><h7><i>"My card arrived fast and was exactly what i wanted! Will definitely order another for my next occasion!"</i></h7></Box>
          <Box display="flex" mr="10px" pb="5px"><h6><u>Marilynne&nbsp;Nobelle</u>:</h6><Box pl="10px"><Stars /><Stars /><Stars /><Stars /><Stars /></Box></Box>
          <Box flex="1 1 40%" borderRadius="50px" >
          {Object.values(bunnyImports).map((texture, index) => (
                <Box key={`bunny-image-${index}`}>
                    <img
                        src={texture}
                        alt={`bunny-${index}`}
                        style={{
                            width: "60%",
                            height: "300px",
                            objectFit: "cover",
                            backgroundAttachment: "fixed"
                        }}
                        />
                </Box>
            ))}
        </Box>
          <Box pb="8px"><h8>Product Ordered: <b>Custom Painting</b></h8></Box>
          <Box pb="35px"><h7><i>"The painting came on time and very well packaged. It was beautiful and looks exactly like the photo. Thanks!"</i></h7></Box>
          <Box display="flex" mr="10px" pb="5px"><h6><u>James&nbsp;B</u>:</h6><Box pl="10px"><Stars /><Stars /><Stars /><Stars /><Stars /></Box></Box>
          <Box flex="1 1 40%" borderRadius="50px" >
          {Object.values(catsImports).map((texture, index) => (
                <Box key={`cats-image-${index}`}>
                    <img
                        src={texture}
                        alt={`cats-${index}`}
                        style={{
                            width: "60%",
                            height: "300px",
                            objectFit: "cover",
                            backgroundAttachment: "fixed"
                        }}
                        />
                </Box>
            ))}
        </Box>
          <Box pb="8px"><h8>Product Ordered: <b>Custom Card</b></h8></Box>
          <Box pb="35px"><h7><i>"Very personable experience. Kalli was very flexible with my requests and I am so happy with the results."</i></h7></Box>
          </Box>
            </div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;