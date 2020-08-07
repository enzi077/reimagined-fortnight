import React,{useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Grid, Card, CardActionArea, CardContent,
 Box, CardMedia, Typography, CircularProgress, Tooltip } from '@material-ui/core';
import data from '../data'

const useStyles=makeStyles(theme=>({
    title:{
        marginRight: theme.spacing(5),
        flexGrow:"1"
    },
    searchContainer:{
        display:"flex",
        padding:"5px 5px 20px 5px",
    },
    searchIcon:{
        alignSelf:"flex-end",
        paddingBottom:"2px"
    },
    textField:{
        margin:"2px"
    },
    containerMain:{
        padding:"20px"
    },
    cardStyles:{
        backgroundColor:theme.palette.primary.light,
        height:"300px"
    },
    media: {
        height: "100px",
        width:"100px",
        margin:"auto"
    },
    cardHead:{
        padding:"20px",
        textAlign:"center",
        height:"50px"
    },
    description:{
        bottom:"0"
    }
}))

const Main=(props)=>{
    const {history}=props
    const classes=useStyles()
    const [cityData,setCityData]=useState(data)
    const [filter,setFilter]=useState('')
    const handleChange=(e)=>{
      setFilter(e.target.value)
    }
    const getCityCard=(city)=>{
        const {id,name,description,imageUrl}=cityData[city]
        return (
            <Grid item xs={12} sm={6} md={3} key={id}>
                <CardActionArea>
                    <Card onClick={()=>history.push(`/${id}`)} className={classes.cardStyles}>
                        <Typography
                            className={classes.cardHead}
                            variant="h6"
                        >
                            {name}
                        </Typography>
                        <CardMedia
                            className={classes.media}
                            image={imageUrl}
                            title="image"
                        />
                        <CardContent className={classes.description}>
                            <Typography variant="body2" component="p">
                                {description}
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Grid>
        )
    }
    
    return (
        <React.Fragment>
            <Box overflow="hidden">
                <AppBar 
                    position="static" 
                    color="primary" 
                >
                    <Toolbar>
                        <Typography 
                            className={classes.title}
                            variant="h5"
                        >Jobs' List</Typography>
                        <div className={classes.searchContainer}>
                            <SearchIcon className={classes.searchIcon}/>
                            <Tooltip title="State names are case sensitive" arrow>
                                <TextField 
                                    className={classes.textField}
                                    onChange={handleChange}
                                    label="State"
                                    inputProps={{style:{color:"white"}}}
                                />
                            </Tooltip>
                        </div>
                    </Toolbar>
                </AppBar>
                {cityData?(
                    <Grid container spacing={2} className={classes.containerMain}>
                        {Object.keys(cityData).map(city=>
                            cityData[city].name.includes(filter) &&
                            getCityCard(city)
                        )}
                    </Grid>
                ):(
                    <CircularProgress/>
                )}
            </Box>
        </React.Fragment>
    )
}

export default Main
