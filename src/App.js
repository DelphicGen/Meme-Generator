import { useState, useEffect } from 'react';
import Meme from './components/Meme';
import './tailwind.css'
import Container from './components/Container';
import MainHeader from './components/UI/MainHeader';

const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`)
  return '?' + params.join('&')
}

function App() {

  const [templates, setTemplates] = useState([])
  const [template, setTemplate] = useState(null)
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(data => {
        setTemplates(data.data.memes);
      })

  }, [])

  const download = e => {
    e.preventDefault()
    fetch(e.target.href)
    .then(response => {
      response.arrayBuffer().then((buffer) => {
        const url = window.URL.createObjectURL(new Blob([buffer]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "image.jpg")
        document.body.appendChild(link)
        link.click()
      });
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="text-center">
      <Container className="pt-5">
        {
          !template && (
            <>
              <MainHeader header="Pick A Template" />
              <div className="flex items-center overflow-scroll overflow-y-hidden mt-10" style={{height: 300}}>
                {
                  templates?.map(template => {
                    return (
                      <Meme 
                        className="mr-5"
                        key={template.id}
                        template={template}
                        clickHandler={() => setTemplate(template)}
                      />
                    )
                  })
                }
              </div>
            </>
          )
        }  
        {
          template && (
            <>
              <MainHeader header="Create Your Meme" />
              <Meme className="mx-auto" template={template} />
              <input className="border-b border-black mr-5 p-1" placeholder="top text" value={topText} onChange={e => setTopText(e.target.value)} />
              <input className="border-b border-black mr-5 p-1" placeholder="bottom text" value={bottomText} onChange={e => setBottomText(e.target.value)} />
              <button type="submit" className="border-2 border-black py-1 px-2 rounded-md mr-5 font-bold" onClick={async e => {
                e.preventDefault()
                const params = {
                  template_id: template.id,
                  text0: topText,
                  text1: bottomText,
                  username: 'LazyAlpaca',
                  password: '12345678',
                  
                }  
                const response = await fetch(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`)
                const data = await response.json()
                setMeme(data.data.url)
              }}>
                Create Meme
              </button>
              {
                meme && <a href={meme} onClick={download} className="bg-black text-white py-2 px-3 rounded-md font-bold">Download</a>
              }
            </>
          )
        }    
        {
          meme && <img src={meme} alt="Meme Result" className="mx-auto mt-10" style={{width: 200}} />
        }
      </Container>
    </div>
  );
}

export default App;
