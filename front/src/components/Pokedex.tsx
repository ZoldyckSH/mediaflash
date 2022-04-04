import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress,
    Toolbar,
    AppBar,
    TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios"
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    },
    searchContainer: {
        display: "flex",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },
}));

interface InfosPokemon {
    id: number,
    name: string,
    sprite: string,
}

interface PokemonData {
    [key:string]: InfosPokemon
}

const Pokedex = (props: {history: any}) => {
    const classes = useStyles();
    const { history } = props;
    const [pokemonData, setPokemonData] = useState<PokemonData>({});
    const [filterPokemon, setFilterPokemon] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/pokedex`)
            .then(response => {
                const { data: { results } } = response;
                const newPokemonData = results.reduce((currentPokemon: [InfosPokemon], pokemon: {name: string}, index: number) => {
                    currentPokemon[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1
                            }.png`,
                    };
                    return currentPokemon;
                }, {})
                setPokemonData(newPokemonData);
            });
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterPokemon(e.target.value);
    };

    const getPokemonCard = (pokemonId: string) => {
        const { id, name, sprite } = pokemonData[pokemonId];
        return (
            <Grid item xs={2} key={pokemonId}>
                <Card onClick={() => history.push(`/${id}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: "130px", height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>{`${id}. ${name}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    };


    return (
        <div style={{ 
      backgroundImage: `url("https://st2.depositphotos.com/3213441/12022/v/950/depositphotos_120226584-stock-illustration-pokemon-go-pokeball-seamless-texture.jpg")` 
    }}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField
                            onChange={handleSearchChange}
                            label="Pokemon"
                            variant="standard"
                        />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map(
                        (pokemonId) =>
                            pokemonData[pokemonId].name.includes(filterPokemon) &&
                            getPokemonCard(pokemonId)
                    )}
                </Grid>
            ) : (
                <CircularProgress />
            )}
        </div>
    );
};

export default withRouter(Pokedex);