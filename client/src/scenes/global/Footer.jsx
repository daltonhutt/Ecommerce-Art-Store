import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";


  const Mailto = ({ email, subject = '', body = '', children }) => {
    let params = subject || body ? '?' : '';
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
  
    return <a href={`mailto:${email}${params}`}>{children}</a>;
  };

const Footer = () => {
    const { palette: { neutral}} = useTheme();
    return <Box mt="70px" p="20px" backgroundColor={neutral.light}>
    <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
        >
            <Box width="clamp(20%, 30%, 40%)">
               <Typography 
               variant="h4" 
               fontWeight="bold" 
               mb="20px"
               color={shades.secondary[500]}
               >
                About&nbsp;Cocobean
                </Typography>
                <div>
                Philly born and raised. Creating art for over a decade as an independent artist & small business. Send your requests&#x1F601;
                </div> 
            </Box>

            <Box width="clamp(30%, 35%, 40%)">
                <Typography variant="h4" fontWeight="bold" mb="20px">Contact Me</Typography>
                <Box mb="10px"><Mailto email="thecocobeanco@gmail.com" subject="Special Request" body="Please specify if the request is about a CARD, DRAWING, or PAINTING as well as the SIZE. Include relevant details such as RECIPENT, OCCASION, PERSONAL MESSAGES, and ANY OTHER CUSTOMIZATIONS. If request is for a PAINTING or DRAWING please attach an image to be used as reference.">Email&nbsp;me&nbsp;your&nbsp;questions!</Mailto></Box>
                <Typography mb="10px">shipped&nbsp;&&nbsp;made&nbsp;from:</Typography>
                <Typography mb="10px">Chester County, Pa</Typography>
            </Box>
        </Box>
    </Box>
};

export default Footer;