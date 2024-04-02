export const select_modelname = (modelname: string) => {
  let firstname = modelname.split(" ")[0];
  switch (firstname) {
    case "B/L":
      if (/tx/i.test(modelname)) {
        console.log("B/L TX ONLY");
      } else {
        console.log("B/L RX ONLY");
      }
      break;
    case "BARKBOSS":
      if (/rpl/i.test(modelname)) {
        console.log("BARKBOSS (RPL)");
      } else {
        console.log("BARKBOSS (RCH)");
      }
      break;
    case "H2O":
      if (/1820/.test(modelname)) {
        if (/camo/i.test(modelname)) {
          if (/add-on rx/i.test(modelname)) {
            let color = modelname.match(/(?<=\()\w+(?=\))/)!;
            console.log("H2O 1820 ADD-ON RX CAMO " + color[0]);
          } else {
            console.log("H2O 1820 CAMO");
          }
        } else {
          if (/add-on rx/i.test(modelname)) {
            let color = modelname.match(/(?<=\()\w+(?=\))/)!;
            console.log("H2O 1820 ADD-ON RX " + color[0]);
          } else {
            console.log("H2O 1820 PLUS");
          }
        }
      } else if (/1850/.test(modelname)) {
        if (/add-on rx/i.test(modelname)) {
          let color = modelname.match(/(?<=\()\w+(?=\))/)!;
          console.log("H2O 1850 ADD-ON RX " + color[0]);
        } else {
          console.log("H2O 1850 PLUS");
        }
      }

      break;
    case "IDT":
      if (/eu/i.test(modelname)) {
        console.log("IDT PLUS (EU)");
      } else {
        if (/add-on rx/i.test(modelname)) {
          let color = modelname.match(/(?<=\()\w+(?=\))/)!;
          console.log("IDT PLUS ADD-ON RX " + color[0]);
        } else {
          console.log("IDT PLUS");
        }
      }
      break;
    case "SPT":
      if (/2420/.test(modelname)) {
        console.log("SPT 2420");
      } else if (/2422/.test(modelname)) {
        console.log("SPT 2420");
      } else if (/2430/.test(modelname)) {
        console.log("SPT 2430");
      } else {
        console.log("SPT 2432");
      }
      break;
    case "MR":
      if (/camo/i.test(modelname)) {
        console.log("MR 1100 CAMO");
        if (/add-on rx/i.test(modelname)) {
          console.log("MR 1100 CAMO ADD-ON RX");
        }
      } else {
        if (/add-on rx/i.test(modelname)) {
          let color = modelname.match(/(?<=\()\w+(?=\))/)!;
          console.log("MR 1100 BLACK ADD-ON RX " + color[0]);
        } else {
          console.log("MR 1100 BLACK");
        }
      }
      break;
    case "DD":
      if (/add-on rx/i.test(modelname)) {
        let color = modelname.match(/(?<=\()\w+(?=\))/)!;
        console.log("DD 700 ADD-ON RX " + color[0]);
      } else {
        console.log("DD 700");
      }
      break;
    case "BTB":
      if (/800/.test(modelname)) {
        let beep = modelname.match(/(?<=\()\w+(?=\))/)!;
        console.log("BTB 800 " + beep[0]);
      } else {
        let beep = modelname.match(/(?<=\()\w+(?=\))/)!;
        console.log("BTB 809 " + beep[0]);
      }
      break;
    case "CAB":
    case "FFH":
    case "CC":
      // console.log(firstname + modelname.match(/\s\d{3}/));
      break;
    case "R.A.P.T":
      if (/coverup/i.test(modelname)) {
        if (/add-on rx/i.test(modelname)) {
          let color = modelname.match(/(?<=\()\w+(?=\))/)!;
          console.log("R.A.P.T 1400 COVERUP ADD-ON RX " + color[0]);
        } else {
          console.log("R.A.P.T 1400 COVERUP");
        }
      } else if (/1400/.test(modelname)) {
        if (/add-on rx/i.test(modelname)) {
          let color = modelname.match(/(?<=\()\w+(?=\))/)!;
          console.log("R.A.P.T ADD-ON RX " + color[0]);
        } else {
          console.log("R.A.P.T 1400");
        }
      } else {
        if (/add-on rx/i.test(modelname)) {
          let color = modelname.match(/(?<=\()\w+(?=\))/)!;
          console.log("R.A.P.T 1450 ADD-ON RX " + color[0]);
        } else {
          console.log("R.A.P.T 1450");
        }
      }
      break;
    case "RH":
      if (/pro/i.test(modelname)) {
        if (/add-on rx/i.test(modelname)) {
          let color = modelname.match(/(?<=\()\w+(?=\))/)!;
          console.log("RH PRO 1000 ADD-ON RX " + color[0]);
        } else {
          console.log("RH PRO 1000");
        }
      }
      break;
    case "BL":
      if (/505/.test(modelname)) {
        console.log("BL 505");
      } else if (/509/.test(modelname)) {
        console.log("BL 509");
      } else if (/705/.test(modelname)) {
        console.log("BL 705");
      } else {
        console.log("BL 709");
      }
      break;
    case "DUMMY":
      if (/tube/i.test(modelname)) {
        console.log("DUMMY TUBE");
      } else {
        console.log("DUMMY LAUNCHER");
      }
      break;
    case "CAB_DUMMY":
      console.log("CAB_DUMMY LAUNCHER");
      break;
    case "REMOTE":
      if (/launcher/i.test(modelname)) {
        console.log("REMOTE DUMMY LAUNCHER");
      }
      break;
    case "BORDER":
      console.log("BORDER PATROL TC1");
      break;
    case "B.P":
      console.log("B.P TC1 ADD-ON RX");
      break;
  }
};
