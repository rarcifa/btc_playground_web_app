import React from "react";
import logo from '../logo.png';
import {
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

class HeaderComponent extends React.Component {
  render() {

    // use Styles
    const { classes } = this.props;

    return <Container
      fixed
      maxWidth="md"
    >
      <Grid
        item
        xs={12}
        sm={12}>
        <Typography
          style={{
            height: '10rem',
            marginTop: '5rem',
          }}
          variant="h1">
          <img
            alt="Logo"
            src={logo}
            className={classes.small} />
          Playground
        </Typography>
        <Typography
          style={{
            marginBottom: '5rem'
          }}>
          This BTC Playground Web App was built with <span className={classes.marked}>react.js</span> by Ric Arcifa and makes use of
          the <span className={classes.marked}>bitcoin.js</span> library. Specifically, this playground will allow users to Generate
          a random mnemonic words following <span className={classes.marked} >bip39</span> standard, a Hierarchical Deterministic
          <span className={classes.marked}> SegWit </span> bitcoin address and an <span className={classes.marked} > n-out-of-m </span>
          Multisignature <span className={classes.marked} >ptsh</span> bitcoin address. <b>Try it out:</b>
        </Typography>
      </Grid>
    </Container>
  }
}

// Styling
const useStyles = theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(12),
    marginRight: '1rem'
  },
  marked: {
    color: '#e83e8c',
    background: '#e83e8c08',
    fontFamily: 'Source Code Pro", Menlo, Monaco, Consolas, "Courier New", monospace'
  }
});

export default withStyles(useStyles)(HeaderComponent)
