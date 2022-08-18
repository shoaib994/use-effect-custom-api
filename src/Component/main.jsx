import  { useState } from 'react'
import UseFetch from './useFetch'
import './main.css'
const Main = () => {

  const BASE_URL = "https://inshorts.deta.dev/news?category=science"
  const { loading, data, error } = UseFetch(BASE_URL)
  const [check, setCheck] = useState(true)

  return (
    <div>
      {
        loading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      }
      {
        (error && check) && <div style={{ position: 'absolute', zIndex: 1000, top: '50%', left: '50%', width: '250px', height: '100px', backgroundColor: 'white', color: 'black', border: '2px solid black' }}><h3 style={{ margin: '5% auto' }}>something went wrong</h3>
          <button onClick={() => setCheck(false)}>close</button>
        </div>
      }
      {!loading && !error &&
        <table id="customers">
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>author</th>
            <th>Image</th>
          </tr>
          {
            data?.map(data1 =>



              <tr style={{ border: '2px solid black' }}>
                <td>{data1.date}</td>
                <td>{data1.title}</td>
                <td>{data1.author}</td>

                <td><img src={data1.imageUrl} width="20px" height="20px" alt="image" /></td>
              </tr>


            )
          }
        </table>
      }

    </div>
  )
}

export default Main