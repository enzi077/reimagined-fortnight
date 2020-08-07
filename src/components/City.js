import React,{useState} from 'react'
import data from '../data'
import { Typography, CircularProgress, 
AppBar, Toolbar, IconButton, Box,
Grid, 
makeStyles,
Card,
CardActionArea,
CardActions,
Collapse,
CardContent,
CardHeader} from '@material-ui/core'
import clsx from 'clsx'
import BackArrow from '@material-ui/icons/ArrowBackIosOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles=makeStyles(theme=>({
    containerCity:{
        padding:"20px"
    },
    cardStyles:{
        backgroundColor:theme.palette.primary.light,
    },
    cardHead:{
        padding:"20px",
        textAlign:"center",
    },
    expand:{
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen:{
        transform: 'rotate(180deg)',
    }
}))

const City=(props)=>{
    const {history,match}=props
    const {params}=match
    const {cityId}=params
    const classes=useStyles()
    const [city, setCity] = useState(data)
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    const generateInfo=()=>{
        const {name,description,jobSites,staySites}=city[cityId]
        return (
            <>
                <Box overflow="hidden">
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                onClick={()=>history.push("/")}
                            >
                            <BackArrow style={{color:"white"}}/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Grid container className={classes.containerCity}>
                        <Grid item xs={12} sm={6} md={3} key={cityId}>
                            <Card className={classes.cardStyles}>
                                <CardActionArea>
                                    <Typography
                                        className={classes.cardHead}
                                        variant="h6"
                                    >
                                        {name}
                                    </Typography>
                                    <CardContent>
                                        <Typography><b>About</b></Typography>
                                        <Typography>
                                            {description}
                                        </Typography>
                                        <Typography><b>Job sites</b></Typography>
                                        {jobSites.map(jobInfo=>{
                                            const {urlJob}=jobInfo
                                            return(
                                                <Typography>
                                                    <a 
                                                        style={{textDecoration:"none"}}
                                                        href={urlJob}
                                                    >
                                                        {urlJob}
                                                    </a>
                                                </Typography>
                                            )
                                        })}
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: expanded,
                                            })}
                                        >
                                            <ExpandMoreIcon/>
                                        </IconButton>
                                    </CardActions>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography><b>Stay (Hostels and PGs)</b></Typography>
                                            {staySites.map(stayInfo=>{
                                                const {urlStay}=stayInfo
                                                return(
                                                    <Typography>
                                                        {urlStay}
                                                    </Typography>
                                                )
                                            })}
                                        </CardContent>
                                    </Collapse>
                                </CardActionArea>
                            </Card> 
                        </Grid>
                    </Grid>
                </Box>
            </>
        )
    }
    
    return(
        <>
            {city===undefined && <CircularProgress/>}
            {city!==undefined && city && generateInfo()}
            {city===false && <Typography>City information not found</Typography>}
        </>
    )
}

export default City
