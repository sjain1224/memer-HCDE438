import React from 'react'
import { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {

  const [text, setText] = useState('')
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [memes, setMemes] = useState(null)

  async function getMemes(){
    setTerm('')
    setLoading(true)
    setMemes(null)
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key=' + 'jhQazp87aPuMIRIZoFu2kaI2Uk5GjZRJ'
    url += '&q=' + text
    const r = await fetch(url)
    const j = await r.json()
    if(j.data) {
      setMemes(j.data)
      setTerm(text)
      setText('')
    }
    setLoading(false)
  }

  console.log(memes)
  return (
    <Wrap>
      
      <Header>
        <TextField label="Search for memes" variant="outlined" style={{width:'calc(100% - 110px)'}}
          value={text} onChange={e=> setText(e.target.value)} autoFocus
          onKeyPress={e=> e.key==='Enter' && getMemes()}
        />
        <Button variant="contained" color="primary" style={{height:55, marginLeft:10, width:100}}
          disabled={!text || loading} onClick={getMemes}>
          Search
        </Button>
      </Header>

      {loading && <LinearProgress />}

      {term && <Term>
        <span>Results for:</span>
        <strong>{term}</strong>
      </Term>}

      {memes && memes.length===0 && <Empty>
        no memes found!  
      </Empty>}

      {memes && memes.length>0 && <Body>
        {memes && memes.map(m=> {
          const img = m.images && m.images.fixed_width && m.images.fixed_width.url
          return <Meme key={m.id} src={img} />
        })}
      </Body>}

    </Wrap>
  );
}

const Term = styled.p`
  width:100%;
  text-align:center;
  & strong {
    margin-left:5px;
    font-size:16px;
  }
`
const Empty = styled.p`
  width:100%;
  text-align:center;
`
const size = 200
const Meme = styled.img`
  max-height: ${size}px;
  max-width: ${size}px;
  min-width: ${size}px;
  min-height: ${size}px;
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