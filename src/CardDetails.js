import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const CardDetails = (props) => {
    const [loading, setloading] = useState(true);
    const [Data, setData] = useState([]);
    const [page, setpage] = useState(1);
    let total = 0;
    useEffect(() => {
        setloading(true)
        getData();
    }, [page]);
    console.log(Data);
    const imageurl = 'https://images.livemint.com/img/2023/01/02/600x338/train_1672622381184_1672622381368_1672622381368.jfif';
    const url = `https://newsapi.org/v2/top-headlines?category=${props.catogery}&country=in&apiKey=79443028254f4643b15ec6149f5e5075&page=${page}`;
    const getData = async () => {
        try {

            const res = await axios.get(url);

            const response = res; // Response received
            total = response.data.totalResults;
            setData(response.data.articles)

            setTimeout(function () {
                setloading(false);

            }, 1000);

        } catch (error) {

            console.error(error);
        }
    };
    const handlePrevClick = (page) => {
        page = page - 1
        setpage(page);

    }
    const handleNextClick = (page) => {
        page = page + 1;
        setpage(page);

    }

    console.log(page)
    console.log(total)
    return (
        <div >
            {loading ? <Spinner /> :
                <div className="grid grid-cols-1 md:grid-cols-4" >
                    {!Data ? <p> no data found</p> :
                        Data.map((xyz) =>
                            < div className=' bg-white m-10 max-w-sm shadow-lg shadow-gray-400  '>

                                <img className='h-[220px] w-96 ' src={!xyz.urlToImage ? imageurl : xyz.urlToImage} alt='no card_image' />
                                <div className='p-6'>
                                    <h1 className='text-2xl font-semibold'>{xyz.title.substring(0, 35) + "..."}</h1>
                                    <p className='py-2'> {!(xyz.description) ? 'Pak vs NZ, Pak vs NZ squads, Pak vs NZ schedule, Pak vs NZ live score, Pak vs NZ live score updates, Pak vs NZ live online score, Pak vs NZ live score...' : xyz.description.substring(0, 146) + "..."}</p>
                                    <a href={xyz.url} target='_blank' className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>Read More...</a></div>
                            </ div>

                        )
                    }

                </div >
            }
            <div className='flex justify-center '>
                <button disabled={page <= 1} onClick={() => handlePrevClick(page)} className='bg-black text-white p-2  mx-auto   flex-initial'>&larr; Prev</button>
                <button disabled={page > (total / 20) + 1} onClick={() => handleNextClick(page)} className='border-5 p-2 bg-black mx-auto text-white border-black flex-grow-0'>Next &rarr;</button>
            </div>
        </div >

    );
}

export default CardDetails;
