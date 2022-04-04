

import React, { useState, useEffect } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios"
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
        margin: "50px",
        backgroundColor: "red"
    },
    cardContent: {
        textAlign: "center",
    },
}));

interface PokemonDetails {
    name: string,
    id: number,
    height: string,
    weight: string,
    types: { type: { name: string } }[],
    sprites: { front_default: string }
}

const Pokemon = (props: { match: any, history: any }) => {
    const classes = useStyles();
    const { match, history } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/pokemon/${pokemonId}/`)
            .then(response => {
                const { data } = response
                setPokemon(data);
            })
    }, [pokemonId]);

    const detailsPokemon = (pokemon: PokemonDetails) => {
        const { name, id, height, weight, types, sprites } = pokemon;
        const { front_default } = sprites;
        return (
            <>
                <Card className={classes.pokedexContainer}>
                    <Grid container spacing={2}>
                        <Grid item md={3}>
                            <CardContent>
                                {`Numero ${id}:`} {name}
                            </CardContent>
                            <CardMedia
                                image={front_default}
                                style={{ width: "150px", height: "150px" }}
                            />

                        </Grid>
                        <Grid item md={3}>
                            <CardContent>
                                <Typography>
                                    {`Heigth : ${height} m`}
                                </Typography>
                                <Typography>
                                    {`Weight : ${weight} kg`}
                                </Typography>
                                <div>
                                    TYPE:
                                    {types.map((type, index) => <Typography key={index}>{type.type.name}</Typography>)}
                                </div>
                            </CardContent>
                        </Grid>
                    </Grid>
                    {pokemon && (
                        <Button variant="contained" onClick={() => history.push("/")}>
                            back to pokedex
                        </Button>
                    )}
                </Card>
            </>
        )
    }
    return (
        <div>
            {pokemon && detailsPokemon(pokemon)}
        </div>
    );
};

export default withRouter(Pokemon);