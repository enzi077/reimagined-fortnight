import React,{useState,useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Grid, Card, CardActionArea, CardContent,
 Box, CardMedia, Typography, CircularProgress, Tooltip, IconButton, 
 Menu, MenuItem, Dialog, DialogTitle, List, ListItem, ListItemText, 
 ListItemAvatar, Avatar, Divider, Slide} from '@material-ui/core';
import data from '../data'
import contributors from '../contributors'
import {text,textUsage,textContrib} from '../aboutText'
import reactLogo from '../assets/png/reactLogo.png'
import materialLogo from '../assets/png/materialLogo.png'
import addIcon from '../assets/png/addIcon.png'

const useStyles=makeStyles(theme=>({
    menuButton:{
        marginRight: theme.spacing(2),
    },
    dialog:{
        backgroundColor:theme.palette.primary.light
    },
    avatar:{
        color:theme.myColors.greyShades.light,
        backgroundColor:theme.myColors.greyShades.dark
    },
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
        height:"280px"
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Main=(props)=>{
    const {history}=props
    const classes=useStyles()
    const [cityData,setCityData]=useState({})
    const [contribData, setContribData]=useState({})
    const [filter,setFilter]=useState('')
    const [anchorEl, setAnchorEl]=useState(null)
    const [openAttrib,setOpenAttribDialog]=useState(false)
    const [openCreator,setOpenCreatorDialog]=useState(false)
    const [openAbout, setOpenAboutDialog]=useState(false)
    
    const handleDialogAttrib=()=>{
        setOpenAttribDialog(true)
        handleMenuClose()
    }
    const handleDialogCreator=()=>{
        setOpenCreatorDialog(true)
        handleMenuClose()
    }
    const handleDialogClose=()=>{
        setOpenAttribDialog(false)
        setOpenCreatorDialog(false)
        setAnchorEl(null)
    }
    
    const handleAbout=()=>{
        setOpenAboutDialog(true)
    }
    const handleAboutClose=()=>{
        setOpenAboutDialog(false)
        setAnchorEl(null)
    }
    
    const handleMenuClick=(e)=>{
        setAnchorEl(e.currentTarget)
    }
    const handleMenuClose=()=>{
        setAnchorEl(null)
    }
    const handleChange=(e)=>{
      setFilter(e.target.value)
    }
    
    useEffect(() => {
        setCityData(data)
        setContribData(contributors)
    }, [])
    
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
                        <IconButton 
                            edge="start" 
                            className={classes.menuButton} 
                            color="inherit" 
                            aria-label="main menu"
                            aria-controls="menuOptions"
                            onClick={handleMenuClick}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menuOptions"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleAbout}>About</MenuItem>
                            <MenuItem onClick={handleDialogAttrib}>Attributions and Contributors</MenuItem>
                            <MenuItem onClick={handleDialogCreator}>Creator</MenuItem>
                            <MenuItem>
                                <a 
                                href="https://github.com/enzi077/reimagined-fortnight"
                                style={{
                                        textDecoration:"underline black",
                                        color:"black"
                                    }}
                                >
                                    Contribute (GitHub)
                                </a>
                            </MenuItem>
                        </Menu>
                        <Dialog fullScreen open={openAbout} onClose={handleAboutClose} TransitionComponent={Transition}>
                            <AppBar className={classes.appBar} position="static">
                            <Toolbar>
                                <Typography variant="h5" className={classes.title}>
                                About
                                </Typography>
                                <IconButton edge="start" color="inherit" onClick={handleAboutClose} aria-label="close">
                                <CloseIcon />
                                </IconButton>
                            </Toolbar>
                            </AppBar>
                            <List>
                            <ListItem button>
                                <ListItemText primary="About the site" secondary={text}/>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="How to use" secondary={textUsage}/>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Contributions" secondary={textContrib}/>
                            </ListItem>
                            <Divider />
                            <Typography style={{
                                textAlign:"center",
                                padding:"20px",
                                display:"block"
                            }}>
                                <a href="https://reactjs.org/" style={{textDecoration:"none"}}>
                                    <img 
                                        src={reactLogo} 
                                        alt="React Logo"
                                        style={{
                                            height:"50px",
                                            width:"50px"
                                        }}
                                    />
                                </a>
                                <img 
                                    src={addIcon} 
                                    alt="Plus"
                                    style={{
                                        height:"10px",
                                        width:"10px",
                                        padding:"15px"
                                    }}
                                />
                                <a href="https://material-ui.com/" style={{textDecoration:"none"}}>
                                    <img 
                                        src={materialLogo} 
                                        alt="Material Ui Logo"
                                        style={{
                                            height:"50px",
                                            width:"63px"
                                        }}
                                    />
                                </a>
                            </Typography>
                            </List>
                        </Dialog>
                        <Dialog 
                            onClose={handleDialogClose} 
                            aria-labelledby="dialog-title"
                            open={openAttrib}
                        >
                            <div className={classes.dialog}>
                                <DialogTitle 
                                    id="dialog-title"
                                    className={classes.dialog}
                                >Attributions and Contributors</DialogTitle>
                                <List>
                                    {Object.keys(contribData).map((person)=>{
                                        const {id,name,type,linkUrl}=contribData[person]
                                        return(
                                            <div key={id}>
                                                <a 
                                                        href={linkUrl}
                                                        style={{
                                                            textDecoration:"none",
                                                            color:"black"
                                                        }}
                                                    >
                                                <ListItem button>
                                                    <ListItemText 
                                                        primary={name} 
                                                        secondary={type}
                                                    />
                                                </ListItem>
                                                </a>
                                            </div>
                                        )
                                    })}
                                </List>
                            </div>
                        </Dialog>
                        <Dialog 
                            onClose={handleDialogClose} 
                            aria-labelledby="dialog-title"
                            open={openCreator}
                        >
                            <div className={classes.dialog}>
                                <DialogTitle id="dialog-title">Creator</DialogTitle>
                                <List>
                                    <a 
                                        href="https://github.com/enzi077"
                                        style={{
                                            textDecoration:"none",
                                            color:"black"
                                        }}
                                    >
                                        <ListItem button>
                                            <ListItemAvatar>
                                                <Avatar className={classes.avatar}>
                                                    <GitHubIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Prateek Mitra"/>
                                        </ListItem>
                                    </a>
                                </List>
                            </div>
                        </Dialog>
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
                                    label="State/UT"
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
                    <CircularProgress color="primary" thickness={4}/>
                )}
                {cityData===undefined && <Typography>No data present to display</Typography>
                }
            </Box>
        </React.Fragment>
    )
}

export default Main
