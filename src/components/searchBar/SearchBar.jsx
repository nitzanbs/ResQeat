import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { getDocs, collection, query, where } from "firebase/firestore";
import { dataBase } from "../../Config/firebaseConfig"



export default function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const { postCards, setPostCards } = props;

    const defaultProps = {
        options: categoryList,
        getOptionLabel: (option) => option.title,
      };
      const flatProps = {
        options: categoryList.map((option) => option.title),
      };
      const [value, setValue] = React.useState(null);
    

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        // לאחר שמשתנה קטגוריה, יש לבצע חיפוש
        performSearch(searchTerm, event.target.value);
    };
    
    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        // לאחר שמשתנה מחרוזת החיפוש, יש לבצע חיפוש
        performSearch(newSearchTerm, selectedCategory);
    };

    const postCardsCollectionRef = collection(dataBase, 'PostCollection');

    
    const performSearch = async (search, category) => {
        console.log(category);
        const q = query(postCardsCollectionRef,
            category !== ""? where("category", "==", category): undefined,
        );
        const rowDocs = await getDocs(q);
        console.log(rowDocs);
        const docs = rowDocs.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
        setPostCards(docs);

        // setPostCards(
        //     postCards.filter((val) => {
        //         if (!search && !category) {
        //             return val;
        //         }
        //         if (search && !category) {
        //             return val.dishName.toLowerCase().includes(search.toLowerCase());
        //         }
        //         if (!search && category) {
        //             return val.category === category;
        //         }
        //         return (
        //             val.dishName.toLowerCase().includes(search.toLowerCase()) &&
        //             val.category === category
        //         );
        //     })
        // );
    };

    return (
        <>
            <>
                <div className="templateContainer">
                    <div className="searchInput_Container">
                    {/* <Stack spacing={1} sx={{ width: 300 }}>
                    <Autocomplete
                      {...defaultProps}
                       id="clear-on-escape"
                        clearOnEscape
                        renderInput={(params) => (
                      <TextField {...params} 
                      name='searchInput'
                      label="Search here..." 
                      variant="standard"
                      value={selectedCategory}
                      onChange={handleSearchChange}  
                      />
                           )}
                        />  
                    </Stack> */}
                        
                    </div>
                    <div className="categorySelect_Container">
                        <label htmlFor="categorySelect">Select Category:</label>
                        <select
                            id="categorySelect"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">All</option>
                            <option value="FastFood">Fast Food</option>
                            <option value="Italian">Italian</option>
                            <option value="Asian">Asian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Carnivore">Carnivore</option>
                        </select>
                    </div>
                    {/* <div className="template_Container">
                        {postCards.map((val) => (
                            <div className="template" key={val.id}>
                                <h3>{val.category}</h3>
                            </div>
                        ))}
                    </div> */}
                </div>
            </>
        </>
    );


}

const categoryList = [
    { title: 'All',value:"" },
    { title: 'FastFood',value:"FastFood" },
    { title: 'Italian',value:"Italian"},
    { title: 'Asian' ,value:"Asian" },
    { title: 'Vegan',value:"Vegan" },
    { title: "Vegetarian" ,value:"Vegetarian"},
    { title: 'Carnivore',value:"Carnivore" },
  ]