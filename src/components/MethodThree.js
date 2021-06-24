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
import Clipboard from './Clipboard';
import Label from './Label';
import Key from '@material-ui/icons/VpnKeyOutlined';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Copy from 'react-clipboard.js';
import { withStyles } from '@material-ui/core/styles';
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';

// Class Component
class MethodThree extends React.Component {

    // Props
    constructor(props) {
        super(props)

        // Set initial state
        this.state = {
            mnemonics: '',
            p2wshAddress: '',
            p2shAddress: '',
            publicKeys: '',
            privateKeys: ''
        }

        // Binding this keyword
        this.handleClick = this.handleClick.bind(this)
    }

    // Handler
    handleClick() {

        // Define the network
        const network = bitcoin.networks.bitcoin // Use networks.testnet for testnet

        // Derivation path
        const path = `m/84'/0'/0` // Use m/44'/0'/0' for testnet

        // Define multisig parameters
        let M = 2
        let N = 3

        // Mnemonics method for MultiSig
        const mnemonics = new Array(N).fill(0).map(() => bip39.generateMnemonic())

        // Create Seed from Mnemonic
        const seeds = mnemonics.map(mnemonic => bip39.mnemonicToSeedSync(mnemonic))

        // Use seed to calculate Root
        const roots = seeds.map((seed) => bip32.fromSeed(seed, network))

        // Account derivation from root
        const accounts = roots.map(root => root.derivePath(path))

        // Node to create accound derivation
        const nodes = accounts.map(account => account.derive(0).derive(0))

        // Publik Key
        const publicKeys = nodes.map(node => node.publicKey)

        // Private Key
        const privateKeys = nodes.map(node => node.toWIF())
        // console.log('> publicKeys: ', publicKeys)

        // P2WSH address (bc1..)
        const p2wshAddress = bitcoin.payments.p2wsh({
            redeem: bitcoin.payments.p2ms({ m: M, pubkeys: publicKeys })
        }).address

        // P2SH "legacy" address (3..)
        const p2shAddress = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2ms({ m: M, pubkeys: publicKeys })
        }).address

        // Changing state
        this.setState({ mnemonics })
        this.setState({ p2wshAddress })
        this.setState({ p2shAddress })
        this.setState({ publicKeys })
        this.setState({ privateKeys })
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
                            MultiSig - P2SH BTC Address
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
                            Generate an <span className={classes.marked} > n-out-of-m </span> multisignature <span className={classes.marked} > p2sh </span> bitcoin address
                            <Button
                                id="generate-btn-method-three"
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
                        <Tabs
                            className={classes.left}>

                            {/** Tabs Options */}
                            <TabList>
                                <Tab>
                                    <Typography>
                                        P2SH
                                    </Typography>
                                </Tab>
                                <Tab>
                                    <Typography>
                                        P2WSH
                                    </Typography>
                                </Tab>
                            </TabList>

                            {/** Tabs List */}
                            <TabPanel>
                                <FormControl
                                    fullWidth
                                    className={classes.margin}
                                    variant="outlined">
                                    <Label />
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={this.state.p2shAddress}
                                        labelWidth={75}
                                        startAdornment={<Copy data-clipboard-text={this.state.p2shAddress}><Clipboard /></Copy>}
                                    />
                                </FormControl>
                            </TabPanel>
                            <TabPanel>
                                <FormControl
                                    fullWidth
                                    className={classes.margin}
                                    variant="outlined">
                                    <Label />
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={this.state.p2wshAddress}
                                        labelWidth={75}
                                        startAdornment={<Copy data-clipboard-text={this.state.p2wshAddress}><Clipboard /></Copy>}
                                    />
                                </FormControl>
                            </TabPanel>

                        </Tabs>
                    </Grid>
                </Grid>

                {/** mnemonics Grid - Starts here */}
                {this.state.mnemonics
                    ?
                    <Grid
                        container
                        spacing={3}>

                        {/** First Column - mnemonics */}
                        <Grid
                            item
                            xs={12}
                            sm={3}>
                            <Typography
                                variant="h6"
                                className={classes.right}>
                                Mnemonics
                            </Typography>
                        </Grid>

                        {/** Second Column - mnemonics */}
                        <Grid
                            item
                            xs={12}
                            sm={8}>
                            <Tabs
                                className={classes.left}>

                                {/** Tabs Option */}
                                <TabList>
                                    {this.state.mnemonics.map((mnemonics, index) => (
                                        <Tab key={mnemonics}>
                                            <Typography>
                                                MK{index}
                                            </Typography>
                                        </Tab>
                                    ))}
                                </TabList>

                                {/** Tabs List */}
                                {this.state.mnemonics.map((mnemonics) => (
                                    <TabPanel key={mnemonics}>
                                        <FormControl
                                            fullWidth
                                            className={classes.margin}
                                            variant="outlined">
                                            <Label />
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                value={mnemonics}
                                                labelWidth={75}
                                                startAdornment={<Copy data-clipboard-text={mnemonics}><Clipboard /></Copy>}
                                            />
                                        </FormControl>
                                    </TabPanel>
                                ))}
                            </Tabs>
                        </Grid>
                    </Grid>
                    : <></>}

                {/** publicKey Grid - Starts here */}
                {this.state.publicKeys
                    ?
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
                            <Tabs
                                className={classes.left}>

                                {/** Tabs Options */}
                                <TabList>
                                    {this.state.publicKeys.map((publicKey, index) => (
                                        <Tab key={publicKey}>
                                            <Typography>
                                                PK{index}
                                            </Typography>
                                        </Tab>
                                    ))}
                                </TabList>

                                {/** Tabs List */}
                                {this.state.publicKeys.map((publicKey) => (
                                    <TabPanel key={publicKey}>
                                        <FormControl
                                            fullWidth
                                            className={classes.margin}
                                            variant="outlined">
                                            <TextField
                                                id="filled-full-width"
                                                label="Read Only"
                                                fullWidth
                                                defaultValue=" "
                                                variant="filled"
                                                value={publicKey.toString('hex')}
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
                                        </FormControl>
                                    </TabPanel>
                                ))}
                            </Tabs>
                        </Grid>
                    </Grid>
                    : <></>}

                {/** privateKey Grid - Starts here */}
                {this.state.privateKeys
                    ?
                    <Grid
                        container
                        spacing={3}>

                        {/** First Column - privateKeys */}
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

                        {/** Second Column - privateKeys */}
                        <Grid
                            item
                            xs={12}
                            sm={8}>
                            <Tabs
                                className={classes.left}>

                                {/** Tabs Options */}
                                <TabList>
                                    {this.state.privateKeys.map((privateKeys, index) => (
                                        <Tab key={privateKeys}>
                                            <Typography>
                                                PK{index}
                                            </Typography>
                                        </Tab>
                                    ))}
                                </TabList>

                                {/** Tabs List */}
                                {this.state.privateKeys.map((privateKeys) => (
                                    <TabPanel key={privateKeys}>
                                        <FormControl
                                            fullWidth
                                            className={classes.margin}
                                            variant="outlined">
                                            <TextField
                                                id="filled-full-width"
                                                label="Read Only"
                                                fullWidth
                                                defaultValue=" "
                                                variant="filled"
                                                value={privateKeys}
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
                                        </FormControl>
                                    </TabPanel>
                                ))}
                            </Tabs>
                        </Grid>
                    </Grid>
                    : <></>}
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

export default withStyles(useStyles)(MethodThree)