import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import {
    FormControl,
    Typography,
    Button,
    Container,
    Grid,
    OutlinedInput
} from '@material-ui/core';
import Clipboard from './Clipboard';
import Label from './Label';
import Copy from 'react-clipboard.js';
import * as bip39 from 'bip39';

// Class Component
class MethodOne extends React.Component {

    // Props
    constructor(props) {
        super(props)

        // Set initial state
        this.state = {
            mnemonic: ''
        }

        // Binding this keyword
        this.handleClick = this.handleClick.bind(this)
    }

    // Handler
    handleClick() {

        // Generate a random mnemonic (uses crypto.randomBytes under the hood), defaults to 128-bits of entropy
        const mnemonic = bip39.generateMnemonic()

        // Changing state
        this.setState({ mnemonic })
    }

    render() {

        // Component Styles prop
        const { classes } = this.props;

        return (

            <Container
                className={classes.margin}
                fixed
                maxWidth="m">

                {/** Main Container - Starts here */}
                <Grid
                    container
                    spacing={3}>

                    {/** First Column - Intro */}
                    <Grid
                        item
                        xs={12}
                        sm={3}>
                        <Typography
                            variant="h4"
                            className={classes.right}>
                            Mnemonic
                        </Typography>
                    </Grid>

                    {/** Second Column - Intro 
                     * Set click handler */}
                    <Grid
                        className={classes.bottom}
                        item xs={12}
                        sm={8}>
                        <Typography
                            className={classes.right}>
                            Generate a random <span className={classes.marked}>mnemonic</span> words following <span className={classes.marked}>bip39</span> standard
                            <Button
                                id="generate-btn"
                                className={classes.marginLeft}
                                variant="outlined"
                                color="primary"
                                onClick={this.handleClick}>
                                Generate
                            </Button>
                        </Typography>
                    </Grid>

                </Grid>

                {/** Mnemonic Grid - Starts here */}
                <Grid
                    container
                    spacing={3}>

                    {/** First Column - Mnemonic */}
                    <Grid
                        item
                        xs={12}
                        sm={3}>
                        <Typography
                            variant="h6"
                            className={classes.right}>
                            BIP39 Mnemonic
                        </Typography>
                    </Grid>

                    {/** Second Column - Mnemonic */}
                    <Grid
                        className={classes.right}
                        item xs={12}
                        sm={8}>
                        <FormControl
                            fullWidth
                            className={classes.margin}
                            variant="outlined">
                            <Label />
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={this.state.mnemonic}
                                labelWidth={75}
                                startAdornment={<Copy onSuccess={this.onSuccess} data-clipboard-text={this.state.mnemonic}><Clipboard /></Copy>}
                            />
                        </FormControl>
                    </Grid>

                </Grid>
            </Container>
        )
    }
}

// Component Style
const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    marginLeft: {
        marginLeft: theme.spacing(1),
        marginRight: '-0.4rem'
    },
    right: {
        textAlign: 'right',
    },
    bottom: {
        alignSelf: 'flex-end',
    },
    left: {
        textAlign: 'left',
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    marked: {
        color: '#e83e8c',
        background: '#e83e8c08',
        fontFamily: 'Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace'
    }
});

export default withStyles(useStyles)(MethodOne);