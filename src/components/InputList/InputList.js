import React, { useState } from 'react';
import {
    FormControl,
    Typography,
    Button,
    Container,
    Grid,
    OutlinedInput,
    TextField,
    IconButton,
    MenuItem,
    InputAdornment
} from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Label from '../Label';
import 'react-tabs/style/react-tabs.css';
import { makeStyles } from '@material-ui/core/styles';
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';

export default function InputList() {

    // functional component states
    const [inputList, setInputList] = useState([{ publicKeys: '' }]);
    const [number, setNumber] = useState(1);
    const [p2shAddress, setP2shAddress] = useState(1);

    // change handler
    const handleChange = (e) => {
        setNumber(e.target.value);
    };

    // Component Styles prop
    const classes = useStyles();

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);

        // change number
        setNumber(e.target.value);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { publicKeys: '' }]);
    };

    const handleClick = (e, index) => {
        // Define the network
        const network = bitcoin.networks.bitcoin // Use networks.testnet for testnet

        // Derivation path
        const path = `m/84'/0'/0` // Use m/44'/0'/0' for testnet

        // Define multisig parameters
        let M = 1
        let N = parseInt(number)
        setNumber(number)

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

        // Public Key Calculator
        const { name } = e.currentTarget;
        const list = [...inputList];
        list[index][name] = nodes.map(node => node.publicKey.toString('hex'));
        setInputList(list, { publicKeys: '' });

        // Public Key
        const publicKeys = nodes.map(node => node.publicKey)

        // P2SH "legacy" address (3..)
        const p2shAddress = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2ms({ m: M, pubkeys: publicKeys })
        }).address
        setP2shAddress(p2shAddress);
    }

    return (
        <Container
            aria-label="input-list-container"
            size="md"
            id="input-list-container"
            className={classes.margin}
            fixed>

            {/** Step 1 - Starts here */}
            <Grid
                container
                spacing={3}>

                {/** First Column - Step 1*/}
                <Grid
                    item
                    xs={12}
                    sm={3}>
                    <Typography
                        variant="h4"
                        className={classes.right}>
                        Generate MultiSig P2SH BTC Address
                    </Typography>
                </Grid>

                {/** Second Column - Step 1 */}
                <Grid
                    className={classes.bottom}
                    item
                    xs={12}
                    sm={8}>
                    <Typography
                        className={classes.right}>
                        <b>STEP 1: </b> Enter the public keys to
                        create a <span className={classes.marked} > n-out-of-m </span> multisignature
                        address.

                        {inputList.map((x, i) => {

                            return (
                                <span key={Math.random()}>
                                    {inputList.length - 1 === i && <Button
                                        key={`__key__${x}`}
                                        className={classes.marginLeft}
                                        id="generate-btn-method-three"
                                        variant="outlined"
                                        color="primary"
                                        name="publicKeys" onClick={handleAddClick}>Add</Button>}
                                </span>
                            ) || <></>
                        }
                        )}
                    </Typography>
                </Grid>
            </Grid>

            {/** Step 2- Starts here */}
            {inputList.map((x, i) => {
                return (

                    <Grid
                         key={i + '__key'}
                        container
                        spacing={3}>

                        {/** First Column - Step 2 */}
                        <Grid
                            item
                            xs={12}
                            sm={3}>
                            <Typography
                                variant="h6"
                                className={classes.right}>
                                PK{i}
                            </Typography>
                        </Grid>

                        {/** Second Column - Step 2 */}
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
                                    id="generate-btn-method-input"
                                    name="publicKeys"
                                    value={x.publicKeys}
                                    onChange={e => handleInputChange(e, i)}
                                    labelWidth={75}
                                    endAdornment={<Button id={`outlinedAdornmentAmount-${i}`} name="publicKeys"
                                        onClick={e => handleClick(e, i)} variant="outlined" color="secondary">
                                        Generate
                                    </Button>}
                                    startAdornment={<InputAdornment position="start">
                                        <IconButton
                                            onClick={() => { navigator.clipboard.writeText(x.publicKeys) }}>
                                            <FileCopyOutlinedIcon />
                                        </IconButton>
                                    </InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        {/** Add and Remove Lists */}

                        <Grid
                            className={classes.auto}
                            item
                            xs={12}
                            sm={1}>
                            {inputList.length !== 1 && <IconButton
                                onClick={() => handleRemoveClick(i)}
                                variant="contained"
                                color="secondary"><HighlightOffIcon >Remove</HighlightOffIcon></IconButton>}
                        </Grid>
                    </Grid>
                );
            })}

            {/** Step 3 - Starts here */}
            <Grid
                container
                spacing={3}>

                {/** First Column- Step 3 */}
                <Grid
                    item
                    xs={12}
                    sm={3}>
                </Grid>

                {/** Enter Amount - Step 3 */}
                <Grid
                    className={classes.bottom}
                    item xs={12}
                    sm={8}>
                    <Typography
                        component={'div'}
                        className={classes.right}>
                        <b>STEP 2: </b> Enter the amount of signatures
                        <TextField
                        id="standard-select-currency"
                            select
                            value={number}
                            onChange={handleChange}
                            helperText="Please select a number"
                            className={classes.marginLeft}>
                            {numbers.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Typography>
                </Grid>
            </Grid>

            {/** Step 1 - Starts here */}
            <Grid
                container
                spacing={3}>

                {/** First Column - Step 1*/}
                <Grid
                    item
                    xs={12}
                    sm={3}>
                </Grid>

                {/** Second Column - Step 1 */}
                <Grid
                    className={classes.bottom}
                    item xs={12}
                    sm={8}>
                    <Typography
                        className={classes.right}>
                        <b>STEP 3: </b> Generate <span className={classes.marked} > n-out-of-m </span> multisignature address.

                    </Typography>
                </Grid>
            </Grid>

            {/** btcAddress Grid - Starts here */}
            <Grid
                container
                spacing={3}>
                {/** First Column - Output */}
                <Grid
                    item
                    xs={12}
                    sm={3}>
                    <Typography
                        variant="h6"
                        className={classes.right}>
                        P2SH Address
                    </Typography>
                </Grid>

                {/** Step 3 - output */}
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
                            name="publicKeys"
                            value={p2shAddress}
                            labelWidth={75}
                            startAdornment={<InputAdornment position="start">
                                <IconButton
                                    onClick={() => { navigator.clipboard.writeText(p2shAddress) }}>
                                    <FileCopyOutlinedIcon />
                                </IconButton>
                            </InputAdornment>}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    );
}

// Component custom styling
const useStyles = makeStyles((theme) => ({
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
    auto: {
        margin: 'auto',
        marginLeft: '-17px',
        color: 'red'
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
}));

// numbers
const numbers = [
    {
        value: '1',
        label: '1',
    },
    {
        value: '2',
        label: '2',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '4',
        label: '4',
    },
    {
        value: '5',
        label: '5',
    },
    {
        value: '6',
        label: '6',
    },
    {
        value: '7',
        label: '7',
    },
    {
        value: '8',
        label: '8',
    },
    {
        value: '9',
        label: '9',
    },
    {
        value: '10',
        label: '10',
    },
    {
        value: '11',
        label: '11',
    },
    {
        value: '12',
        label: '12',
    },
    {
        value: '13',
        label: '13',
    },
    {
        value: '14',
        label: '14',
    },
    {
        value: '15',
        label: '15',
    },
];