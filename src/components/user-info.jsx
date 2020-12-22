import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        padding: '50px'
    },
    paper: {
        // padding: theme.spacing(2),
        // textAlign: 'center',
    },
    heading: {
        fontSize: theme.typography.pxToRem(22),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: 'white'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(18),
        color: theme.palette.text.secondary,
    },
    detailsGrid: {
        paddingTop: '20px'
    },
    accordion: {
        backgroundColor: 'hsl(210deg 79% 46%)',
        color:'white'
    },
    accordionSummary: {
        backgroundColor: 'white'
    },
    buttonStyle:{
        backgroundColor: 'hsl(210deg 79% 46%)',
        color:'white'
    },
    textColor:{
        color:'hsl(210deg 79% 46%)'
    },
    headingGrid:{
        display:'flex',
        justifyContent:' space-between'
    }
}));

export default function ControlledAccordions() {
    const classes = useStyles();
    const [user, setUserInfo] = useState();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(results => results.json())
            .then(data => {
                console.log('data', data)
                setUserInfo(data);
            });
    }, [id]);
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const backToHome = ()=>{
        history.push('/');
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid className={classes.headingGrid}>
                    <Typography className={classes.textColor} variant="h4" noWrap> User Information</Typography>
                    <Button onClick={()=> backToHome()} variant="contained" className={classes.buttonStyle}>
                        Back To Home
                    </Button>
                </Grid>
                <Grid className={classes.detailsGrid}>
                <Accordion className={classes.accordion} expanded={expanded === 'panel0'} onChange={handleChange('panel0')}>
                        <AccordionSummary 
                            expandIcon={<ExpandMoreIcon className={classes.buttonStyle}/>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography className={classes.heading}>Name</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionSummary}>
                            <Typography className={classes.textColor}>
                                {user?.name}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className={classes.buttonStyle} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography variant="h2" className={classes.heading}>Address</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionSummary}>
                            <Typography className={classes.textColor}>
                                {user?.address.street}, {user?.address.suite} {user?.address.city}, {user?.address.zipcode}
                                {user?.address.geo.lat} {user?.address.geo.lng}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary 
                            expandIcon={<ExpandMoreIcon className={classes.buttonStyle}/>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography className={classes.heading}>Phone</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionSummary}>
                            <Typography className={classes.textColor}>
                                {user?.phone}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className={classes.buttonStyle}/>}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography className={classes.heading}>Website</Typography>

                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionSummary}>
                            <Typography className={classes.textColor}>
                                {user?.website}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className={classes.buttonStyle}/>}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography className={classes.heading}>Company</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionSummary}>
                            <Typography className={classes.textColor}>
                                {user?.company.name}  {user?.company.catchPhrase} {user?.company.bs}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

            </Paper>
        </div>
    );
}
