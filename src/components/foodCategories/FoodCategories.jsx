import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CardActionArea } from "@mui/material";
import "./FoodCategories.css";

const cards = [
  {
    title: "Fast Food",
    description:
      "Discover quick and delicious meals for pickup or donation to share with those in need!",
    image:
      "https://media.istockphoto.com/id/694189032/photo/hand-held-bbq-favorites.jpg?s=612x612&w=0&k=20&c=mBxrLzHHyV8jtCypC5asdDwxQgDe5prwRCumFt4dVRo=",
  },
  {
    title: "Italian",
    description:
      "Explore authentic and rich flavors available for pickup or donate to support the community!",
    image:
      "https://media.istockphoto.com/id/1220017909/photo/top-view-table-full-of-food.jpg?s=612x612&w=0&k=20&c=UzzJrIttGJbjHoXHRrKNVimV-cBzZmKdvUpJel3g7Ns=",
  },
  {
    title: "Asian",
    description:
      "Embark on a culinary journey with diverse and exotic flavors. Choose to pick up or donate to make a difference!",
    image:
      "https://media.istockphoto.com/id/545286388/photo/chinese-food-blank-background.jpg?s=612x612&w=0&k=20&c=pqOIy07YKO5PlU5VxjscwTGRrrZ8PluKMUjSOz-II60=",
  },
  {
    title: "Vegan",
    description:
      "Experience the joy of healthy and nourishing plant-based delights. Pick up or donate to support sustainable and delicious causes!",
    image:
      "https://media.istockphoto.com/id/1409236261/photo/healthy-food-healthy-eating-background-fruit-vegetable-berry-vegetarian-eating-superfood.jpg?s=612x612&w=0&k=20&c=kYZKgwsQbH_Hscl3mPRKkus0h1OPuL0TcXxZcO2Zdj0=",
  },
  {
    title: "Vegetarian",
    description:
      "Explore a world of delicious meat-free leftover options. Pick up or donate to contribute to a sustainable cause!",
    image:
      "https://media.istockphoto.com/id/1241880776/photo/woman-preparing-tasty-vegan-tacos.jpg?s=612x612&w=0&k=20&c=RJypyil962Kzg08DJxdTVTi4bV4AQ8IcIWXVcxfolEE=",
  },
  {
    title: "Carnivore",
    description:
      "Indulge in a selection of assorted raw meat delights. Consider picking up or donating to support a good cause!",
    image:
      "https://media.istockphoto.com/id/1310910433/photo/selection-of-assorted-raw-meat-food-for-zero-carb-carnivore-diet-uncooked-beef-steak-ground.jpg?s=612x612&w=0&k=20&c=AVBOK6YOiR4tTbXA-2a7m-HKjxEBFEEFKGJCvparLnM=",
  },
];


const defaultTheme = createTheme();

export default function Category({navigateToFeed}) {

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="imageContainer">
        <br />
        <br />
        <br />
        <br />
        <p>
          ResQeat is a website that helps share extra food from people and
          restaurants with those who need it. You can post any extra food you
          have, and together we can reduce food waste. Join us to make food
          distribution more sustainable and efficient!
        </p>
        <img
          className="ImageOfFoodHome"
          src="../../images/foodImageHome.png"
          alt=""
        />
      </div>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Food Categories
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Choose your favorite food
            </Typography>
            <Stack
              sx={{ pt: 2 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button className="btnForFeed" component={RouterLink} to="/feed" variant="contained">
                All Foods
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}> 
               <Link
                                component={RouterLink}
                                to={`/feed?category=${encodeURIComponent(card.title)}`}
                                color="inherit"
                                className="foodLink"
                                onClick={() => navigateToFeed(card.title)}
                              >
                <CardActionArea>
                  {" "}
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "26rem",
                      maxHeight: "26rem",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "80.25%",
                        backgroundSize: "cover",
                        backgroundImage: `url(${card.image})`,
                      }}
                    />{" "}
                    <CardActions>
                    <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                              {/* Wrap the title in a link */}
                            
                                {card.title}
                              
                            </Typography>
                            <Typography>{card.description}</Typography>
                          </CardContent>

                      {/* Additional actions if needed */}
                    </CardActions>
                  </Card>{" "}
                </CardActionArea>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container> 
      </main>
    
    </ThemeProvider>
  );
}