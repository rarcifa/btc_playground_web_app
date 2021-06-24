import React from "react";
import Footer from "react-footer-comp";

class FooterComponent extends React.Component {
  render() {
    return <div
      style={{
        height: '10rem',
        marginTop: '5rem',
      }}>
      <h2>Generate keys and make magic happen {"\u2728"}</h2>
      <Footer
        copyrightIcon
        years={[2012]}
        height={50}
        bgColor={"white"}
        copyrightText
        copyrightIconStyle={{ color: "black", fontSize: 20, marginRight: 10 }}
        copyrightTextStyle={{ color: "black", fontSize: 20, marginRight: 10 }}
        textStyle={{ color: "black", fontSize: 16, marginRight: 10 }}
        text={"All rights reserved."}
      />
    </div>
  }
}

export default FooterComponent