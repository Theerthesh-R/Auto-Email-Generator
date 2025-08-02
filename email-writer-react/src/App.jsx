import { use, useState } from 'react'
import './App.css'
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

function App() {
const [emailContent,setEmailContent]=useState("");
const [tone,settone]=useState("");
const[generateReply,setGenerateReply]=useState('');
const [loading,setLoading]=useState(false);
const[error,setError]=useState('');



const handelSubmit=async()=>{
  setLoading(true);
  setError('');
  try{
    const response=await axios.post("http://localhost:8080/api/email/generate",{
      emailContent,
      tone
    });
    setGenerateReply(typeof response.data ==='string' ? response.data : JSON.stringify(response.data))
  }
  catch(err){
    console.error(err);
    setError('Failed to generate reply. Please try again later.');
  }finally{
    setLoading(false);
  }
};

  return (
    <Container maxWidth ='md' sx={{py:4}}>  
    
    <Typography variant='h3' component="h1" gutterBottom>    Email Reply Generator
</Typography>
<Box sx={{mx:3}}>
<TextField 
fullWidth
multiline
rows={6}
variant='outlined'
label='original email content'
value={emailContent || ''}
onChange={(e)=>setEmailContent(e.target.value)}
sx={{mb:2}}/>

<FormControl fullWidth sx={{mb:2}}>
  <InputLabel >Tone(Optional)</InputLabel>
  <Select 
  value={tone ||''}
  label={'Tone(Optional)'}
  onChange={(e)=>settone(e.target.value)}> 
  <MenuItem value="">None</MenuItem>
  <MenuItem value="professional">Professional</MenuItem>
  <MenuItem value="casual">Casual</MenuItem>
  <MenuItem value="friendly">Friendly</MenuItem>
  </Select>
</FormControl>
<Button
  varient='contained'
  onClick={handelSubmit}
  disabled={!emailContent || loading}
  fullWidth>
  {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
</Button>
</Box>
{error && (
<Typography color='error' sx={{mb:2}}>   {error}
</Typography>
)}

{generateReply && (
  <Box sx={{mt:3}}>
    <Typography variant='h6' gutterBottom>Generated Reply</Typography>
    <TextField
      fullWidth
      multiline
      rows={6}
      variant='outlined'
      value={generateReply || ''}
      InputProps={{
        readOnly: true,
      }}
    />

    <Button
      varient='outlined'
      sx={{mt:2}}
      onClick={() =>Navigator.clipboard.writeText(generateReply)}>
      Copy to Clipboard
    </Button>
  </Box>
)
  }
    </Container>
  )
}

export default App
