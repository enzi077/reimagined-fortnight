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
CardContent,} from '@material-ui/core'
import clsx from 'clsx'
import BackArrow from '@material-ui/icons/ArrowBackIosOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {dispFirstThirtyChars} from '../Constants'

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
    },
    listDisplay:{
        marginBottom:"20px"
    }
}))

const City=(props)=>{
    const {history,match}=props
    const {params}=match
    const {cityId}=params
    const classes=useStyles()
    const [city] = useState(data[cityId])
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    const generateInfo=()=>{
        const {name,description,jobSites,cities,staySites}=city
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
                                        {description.map((state,index)=>{
                                            const {type,value}=state
                                            return(
                                                <>
                                                    <Typography variant="body1" key={index}>
                                                        {`${type}=${value}`}
                                                    </Typography>
                                                </>
                                            )
                                        })}
                                        <br/>
                                        <Typography><b>Job sites</b></Typography>
                                        {jobSites.map((jobInfo,index)=>{
                                            const {urlJob}=jobInfo
                                            return(
                                                <>
                                                    <Typography 
                                                    className={classes.listDisplay} key={index}>
                                                        <a  
                                                            style={{
                                                                textDecoration:"underline black",
                                                                color:"black"
                                                            }}
                                                            href={urlJob}
                                                        >
                                                            {`${dispFirstThirtyChars(urlJob)}...`}
                                                        </a>
                                                    </Typography>
                                                </>
                                            )
                                        })}
                                    </CardContent>
                                </CardActionArea>
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
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography><b>Important Cities</b></Typography>
                                            {cities.map((cityInfo,index)=>{
                                                const {cityName}=cityInfo
                                                return(
                                                    <Typography key={index}>
                                                        {cityName}
                                                    </Typography>
                                                )
                                            })}
                                            <br/>
                                            <Typography><b>Stay (Hostels and PGs)</b></Typography>
                                            {staySites.map((stayInfo,index)=>{
                                                const {urlStay}=stayInfo
                                                if(urlStay)
                                                {return(
                                                    <>
                                                        <Typography key={index} className={classes.listDisplay}>
                                                            <a
                                                                style={{
                                                                    textDecoration:"underline black",
                                                                    color:"black"
                                                                }}
                                                                href={urlStay}
                                                            >
                                                                {`${dispFirstThirtyChars(urlStay)}...`}
                                                            </a>
                                                        </Typography>
                                                    </>
                                                )}else{
                                                    return(
                                                        <>
                                                            <Typography>
                                                                No data
                                                            </Typography>
                                                        </>
                                                    )
                                                }
                                            })}
                                        </CardContent>
                                    </CardActionArea>
                                </Collapse>
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
