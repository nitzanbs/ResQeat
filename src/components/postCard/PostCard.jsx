import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { getDocs, collection, query, where } from "firebase/firestore";
import { dataBase } from "../../Config/firebaseConfig"
import { UserContext } from '../../context/UserContext';
import './PostCard.css'






const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const {postCards, setPostCards, image, setImage} = props
 

    const { user } = useContext(UserContext);
    const postCardsCollectionRef = collection(dataBase, 'PostCollection');


    const getPostCards = async () => {
        try {
            if (!user) {
                return;
            }
            console.log(user);
            const q = query(postCardsCollectionRef,
                // where("user", "==", user.uid),
            );
            const rowDocs = await getDocs(q);
            console.log(rowDocs);
            const docs = rowDocs.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
            setPostCards(docs);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getPostCards();
    }, [user]);

    // console.log(postCards);

    return (
        <>
            {postCards?.map((item, i) => (
                <Card  sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar src={`https://i.pravatar.cc/300?param=${item.userName}`} sx={{ bgcolor: red[500] }} aria-label="recipe">
                              {item.email && item.email.substring(0, item.email.indexOf('@'))}
                            </Avatar>

                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={item.userName}
                        subheader={item.date}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image= {item.image}
                        alt={item.dishName}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        {item.dishName}
                            

                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>More detalis:</Typography>
                            <Typography paragraph>
                                pickup time: {item.pickupTime}
                            </Typography>
                            <Typography paragraph>
                                category: {item.category}
                            </Typography>
                            <Typography paragraph>
                            Notes: <br />{item.notes}
                            </Typography>
                            <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
        </>
    );
}
