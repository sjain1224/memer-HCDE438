import React from 'react'
import { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {
  
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [memes, setMemes] = useState([])

  async function getMemes(){
    setLoading(true)
    setMemes([])
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key=' + 'jhQazp87aPuMIRIZoFu2kaI2Uk5GjZRJ'
    url += '&q=' + text
    const r = await fetch(url)
    const j = await r.json()
    setMemes(j.data)
    setLoading(false)
    setText('')
  }

  return (
    <Wrap>

      <Header>

        <TextField label="Search for memes" variant="outlined" style={{width:'calc(100% - 110px)'}}
          value={text} onChange={e=> setText(e.target.value)} autoFocus onKeyPress={e=> e.key==='Enter' && getMemes()}
        />

        <Button variant="contained" color="primary" style={{height:55, marginLeft:10, width:100}}
          disabled={!text || loading} onClick={getMemes}>
          Search
        </Button>

      </Header>

      {loading && <LinearProgress />}

      <Body>
        {memes.map(m=> <Meme src={m.images.fixed_width.url} />)}
      </Body>

    </Wrap>
  );
}

const Meme = styled.img`
  max-height: 200px;
  max-width: 200px;
  min-width: 200px;
  object-fit: cover;
  margin:5px;
`
const Wrap = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  height:100vh;
`
const Header = styled.header`
  width:100%;
  min-height:50px;
  padding: 10px;
  box-sizing: border-box;
`
const Body = styled.div`
  width:100%;
  display:flex;
  flex-wrap:wrap;
  flex:1;
  overflow:auto;
`

export default App;