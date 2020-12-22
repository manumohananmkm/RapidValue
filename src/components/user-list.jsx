import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 2,
        width: '90%',
        padding: '50px'
    },
    paper: {
        padding: theme.spacing(2),
       // textAlign: 'center',
    },
    nameGrid: {
        margin: '12px',
        textAlign: 'left',
        color: 'white'
    },
    avatarStyles: {
        color: 'hsl(210deg 79% 46%)',
        backgroundColor: 'white',
        width: '60px',
        height: '60px',
    },
    textStyles: {
        color: 'white'
    },
    row: {
        backgroundColor: 'hsl(210deg 79% 46%)',
        margin: '25px',
        fontWeight: "600"

    },
    textColor:{
        color:'hsl(210deg 79% 46%)',
        paddingLeft:'22px'
    }
}));

export default function GetUsers() {
    const [userList, setUserList] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(results => results.json())
            .then(data => {
                setUserList(data);
            });
    }, []);

    const getAvatarName = (value) => {
        let nameParts = value.split(" ");
        let initials = nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase();
        return initials
    }
    const classes = useStyles();

    const goToUserIfo = (value) => {
        history.push(`/UserInfo/${value}`);
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid>
                    <Typography className={classes.textColor} variant="h4" noWrap> Users</Typography>
                </Grid>
                <List >
                    {userList?.map((value) => {
                        return (
                            <Grid onClick={() => goToUserIfo(value.id)} item xs={6} className={classes.row} key={value.id} container wrap="nowrap" spacing={2}>
                                <ListItem button>
                                    <Grid item>
                                        <Avatar className={classes.avatarStyles}>{getAvatarName(value.name)}</Avatar>
                                    </Grid>
                                    <Grid className={classes.nameGrid} item xs zeroMinWidth>
                                        <Typography variant="h6" noWrap> {value.name}</Typography>
                                        <Typography variant="h6" noWrap> {value.email}</Typography>
                                    </Grid>
                                </ListItem>
                            </Grid>
                        )
                    })}
                </List>
            </Paper>
        </div>
    );
}


