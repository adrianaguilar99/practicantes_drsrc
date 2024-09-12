import { Button, CircularProgress } from "@mui/material"
import { useState } from "react";
import "../components.css"

export const ButtonComponent = ({text} : {text: string} ) =>{
    
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Login");
        }, 1000);
        
    };
    
    return (
        <>
             <Button
                variant="contained"
                onClick={handleLogin}
                className="ButtonComponent"
                style={{
                    fontFamily: '"Lato", sans-serif',
                    fontWeight: 800,
                    fontStyle: 'normal',
                  
                }}
            >
                {loading && (
                    <CircularProgress
                        size={20}
                        color="inherit"
                        style={{ marginRight: '8px' }} 
                    />
                )}
                {text}
            </Button>
        </>
   
    )
}

