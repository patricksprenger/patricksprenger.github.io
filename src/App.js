import { Octokit } from "octokit";
import './App.css';
import { useState } from 'react';
import { Buffer } from "buffer";
import list from './contents/list.json'

const octokit = new Octokit({ auth: "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" });

async function onLoad() {
  
  await octokit.request(
      'GET /repos/patricksprenger/patricksprenger.github.io/contents/list.json', {
        owner: 'patricksprenger',
        repo: 'patricksprenger.github.io',
        path: 'blob/master/list.json'
    }).then(res => {
        const encoded = res.data.content;
        const decoded = Buffer.from(encoded, 'base64');
        console.log('decoded', decoded)
        // setCode(decoded);
  }).catch(err => console.log('err', err)); 
} 

async function updateFile() {
  try {
    const contentEncoded = Buffer.from("teste commit by js", 'base64');
    const data = await octokit.rest.repos.createOrUpdateFileContents({
    // replace the owner and email with your own details
    owner: "patricksprenger",
    repo: "patricksprenger.github.io",
    path: "list.json",
    message: "feat: Updated file programatically",
    sha: '6f16acbbc80d444145a09d897a93591cd806d3f8',
    content: contentEncoded,
      committer: {
        name: `Patrick Sprenger`,
        email: "patricktrindade9@gmail.com",
      },
      author: {
        name: "Octokit Bot",
        email: "patricktrindade9@gmail.com",
      },
    });
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

//  console.log(token)
  onLoad()
  updateFile()

//  const content = fs.readFileSync("./input.txt", "utf-8");
const contentEncoded = Buffer.from("teste commit by js", 'base64');

function App() {
  console.log(list)
  const [state, setState] = useState(list)

  function handleCheck(position, checked) {
    const newArray = [...state]
    newArray[position].checked = !checked
    setState(newArray)
  }


  function Input({ gift, index }) {
    console.log(gift, index);
    return (
      <div className="list">
        <input type="checkbox" checked={gift.checked} className="input" onChange={() => handleCheck(index, gift.checked)}/>
        <p className={gift.checked && 'nameChecked'}>{gift.item}</p>
      </div>
    )
  }

  return (
    <div className="App-header">
      <div className='main'>
        {state.map((item, index) => 
          <Input gift={item} index={index} />
        )}
      </div>
    </div>
  );
}

export default App;
