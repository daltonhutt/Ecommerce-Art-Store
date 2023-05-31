import React, { Component } from 'react';
import { Box } from "@mui/material";

const importAll = (r) =>
r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
}, {});

const logoImports = importAll(
    require.context("../assets/logo", false, /\.(png|jpe?g|svg)$/)
);

const Logo = () => {
     
        return (
            <Box>
            {Object.values(logoImports).map((texture, index) => (
                <Box >
                    <img
                        src={texture}
                        alt={`logo-${index}`}
                        style={{
                            width: "100%",
                            height: "40px",
                            objectFit: "cover",
                            backgroundAttachment: "fixed"
                        }}
                        />
                        </Box>
                        ))}
                </Box>

        );
    }


export default Logo;