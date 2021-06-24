import * as React from 'react';
import {
    FormControl,
    Typography,
    Button,
    Container,
    Grid,
    OutlinedInput,
    TextField,
    InputAdornment
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Clipboard from './Clipboard';
import Label from './Label';
import Copy from 'react-clipboard.js';
import Key from '@material-ui/icons/VpnKeyOutlined';
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';


// Class Component
class MethodTwo extends React.Component {

    // Props
    constructor(props) {
        super(props)

        // Set initial state
        this.state = {
            mnemonic: '',
            btcAddress: '',
            publicKey: '',
            privateKey: ''
        }

        // Binding this keyword
        this.handleClick = this.handleClick.bind(this)
    }

    // Handler method
    handleClick() {
        
        // Define the network
        const network = bitcoin.networks.bitcoin

        // default Path for SegWit method
        const path = `m/84'/0'/0`

        // Generate random words via Mnemonic method
        const mnemonic = bip39.generateMnemonic()

        // Create Seed from Mnemonic
        const seed = bip39.mnemonicToSeedSync(mnemonic)

        // Use seed to calculate Root
        const root = bip32.fromSeed(seed, network)

        // Account derivation from root
        const account = root.derivePath(path)

        // Node to create accound derivation
        const node = account.derive(0).derive(0)

        // Publik Key
        const publicKey = node.publicKey.toString('hex')

        // Private Key
        const privateKey = node.toWIF()

        // Using p2wpkh which is used for native segWit
        const btcAddress = bitcoin.payments.p2wpkh({
            pubkey: node.publicKey,
            network: network,
        }).address

        // Changing state
        this.setState({ mnemonic })
        this.setState({ btcAddress })
        this.setState({ publicKey })
        this.setState({ privateKey })
    }

    render() {

        // Component Styles prop
        const { classes } = this.props;

        return (
            
            <Container
                className={classes.margin}
                fixed maxWidth="m">

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
                            HD SigWit BTC Address
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
                            Generate a Hierarchical Deterministic
                            <span className={classes.marked} > SegWit </span> 
                            bitcoin address
                            <Button
                                id="generate-btn-method-two"
                                className={classes.marginLeft}
                                variant="outlined"
                                color="primary"
                                onClick={this.handleClick}>
                                Generate
                            </Button>
                        </Typography>
                    </Grid>

                </Grid>

                {/** btcAddress Grid - Starts here */}
                <Grid
                    container
                    spacing={3}>

                    {/** First Column - btcAddress */}
                    <Grid
                        item
                        xs={12}
                        sm={3}>
                        <Typography
                            variant="h6"
                            className={classes.right}>
                            BTC Address
                        </Typography>
                    </Grid>

                    {/** Second Column - btcAddress */}
                    <Grid
                        item
                        xs={12}
                        sm={8}>
                        <FormControl
                            fullWidth
                            className={classes.margin}
                            variant="outlined">
                            <Label />
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={this.state.btcAddress}
                                labelWidth={75}
                                startAdornment={<Copy data-clipboard-text={this.state.btcAddress}><Clipboard /></Copy>}
                            />
                        </FormControl>
                    </Grid>

                </Grid>

                {/** Mnemonic Grid - Starts here */}
                <Grid
                    container
                    spacing={3}>

                    {/** First Column - Mnemonic */}
                    <Grid
                        item xs={12}
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
                                startAdornment={<Copy data-clipboard-text={this.state.mnemonic}><Clipboard /></Copy>}
                            />
                        </FormControl>
                    </Grid>

                </Grid>

                {/** publicKey Grid - Starts here */}
                <Grid
                    container
                    spacing={3}>

                    {/** First Column - publicKey */}
                    <Grid
                        item
                        xs={12}
                        sm={3}>
                        <Typography
                            variant="h6"
                            className={classes.right}>
                            Public Key
                        </Typography>
                    </Grid>

                    {/** Second Column - publicKey */}
                    <Grid
                        item
                        xs={12}
                        sm={8}>
                        <TextField
                            id="filled-full-width"
                            label="Read Only"
                            fullWidth
                            defaultValue=" "
                            className={classes.margin}
                            variant="filled"
                            value={this.state.publicKey}
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Key />
                                    </InputAdornment>
                                ),
                            }}
                        >
                        </TextField>
                    </Grid>

                </Grid>

                {/** privateKey Grid - Starts here */}
                <Grid
                    container
                    spacing={3}>

                    {/** First Column - privateKey */}
                    <Grid
                        item
                        xs={12}
                        sm={3}>
                        <Typography
                            variant="h6"
                            className={classes.right}>
                            Private Key
                        </Typography>
                    </Grid>

                    {/** Second Column - privateKey */}
                    <Grid
                        item
                        xs={12}
                        sm={8}>
                        <TextField
                            id="filled-full-width"
                            label="Read Only"
                            fullWidth
                            defaultValue=" "
                            className={classes.margin}
                            variant="filled"
                            value={this.state.privateKey}
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Key />
                                    </InputAdornment>
                                ),
                            }}
                        >
                        </TextField>
                    </Grid>

                </Grid>
            </Container>
        )
    }
}

// Component custom styling
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

export default withStyles(useStyles)(MethodTwo)