import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: '10% 20%',
        backgroundColor: 'rgba(255,255,255,0.14)',
        boxShadow: 'box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'
    },

    title: {
        letterSpacing: '8px',
        textAlign: "center",
        paddingBottom: '10px',
    },
    list: {
        listStyleType: 'none',
    },
    hr: {
        backgroundColor: '#fff',
        borderWidth: '.1em',
        marginBottom: '50px'
    }
}));

//Guideline list
const guideLines = [
    {
        list: [
            "The purpose of the game KnowMe is to see how well the players know each other.",
            "This is a 2 player game and each player will first have to create an account to play.",
            "After creating an account, players are asked to log in to start playing.",
            'Once players are logged-in, they can start the game by pressing "start game".',
            'The first player to press "find game" will become the partyleader, and now will be waiting for the next player.',
            'The second player to press "find game" can see there is already a player that started a game.',
            'Now each player can press "start game" and start answering questions.',
            "Players are given multiple choice questions for a given amount of time for each question.",
            "Every question has a randomized category, but will be provided to each player.",
            "Players do not have to answer if they do not know the answer, but their score will be counted as a zero",
            "Once players are done answering the questions, players will be given their scores at the end.",
            "Scores are displayed across the board so every player can see and compare who won."
        ]
    }
]
// console.log(guideLines[0].list)

const GuideLines = () => {
    const classes = useStyles();
    const guideList = guideLines[0].list;

    return (
        <Paper className={classes.root}>
            <Typography
                className={classes.title}
                variant="h3"
            >
                Guidelines
        </Typography>
            <hr className={classes.hr}></hr>
            {guideList.map((g, i) => {
                return (
                    <ul className={classes.list} key={i}>
                        <li>
                            <div>{g}</div>
                        </li>
                    </ul>
                )
            })}
        </Paper>

    );
}

export default GuideLines
