import React, { useState, useEffect } from 'react';
import blog from './blog';

const Home = () => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [dateTime, setDateTime] = useState(new Date());
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // Realtime clock effect
    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000); 

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    const date = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const yr = dateTime.getFullYear();
    const hour = dateTime.getHours();
    const min = dateTime.getMinutes().toString().padStart(2, '0');
    const sec = dateTime.getSeconds().toString().padStart(2, '0');
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    return (
        <>
            {
                windowWidth < 680 ? (
                    <div className='flex flex-col items-center justify-between gap-2 p-4'>
                        <h1 className='font-bold text-5xl'>Latest Blog</h1>
                        <h2 className='text-lg font-bold'>
                            <span className='text-purple-700'>Today's</span>  Date: <span className='text-orange-500 font-bold'>{date}/{month}/{yr} &nbsp;</span>
                            Time: <span className='text-orange-500'>{formattedHour}:{min}:{sec} {period}</span>
                        </h2>
                    </div>
                ):(
                    <div className='flex flex-row items-center justify-between gap-2 p-4'>
                        <h1 className='font-bold text-5xl'>Latest Blog</h1>
                        <h2 className='text-lg font-bold'>
                            <span className='text-purple-700'>Today's</span>  Date: <span className='text-orange-500 font-bold'>{date}/{month}/{yr} &nbsp;</span>
                            Time: <span className='text-orange-500'>{formattedHour}:{min}:{sec} {period}</span>
                        </h2>
                    </div>
                )
            }

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                {
                    blog.blog.map((data) => (
                        <div key={data.id} className='border p-4 rounded shadow'>
                            <img
                                src={data.thumbnail}
                                alt={data.title}
                                className='w-full h-48 object-cover mb-2 rounded'
                            />
                            <h1 className='text-lg font-semibold'>{data.title}</h1>
                            <div className='flex flex-row items-center justify-between'>
                                <p className='text-sm text-blue-800 '>Uploaded on: {data.uploadedDate}</p>
                                <button
                                    className='bg-orange-600 text-white px-3 py-1 rounded-2xl cursor-pointer'
                                    onClick={() => setSelectedBlog(data)}
                                >
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Modal Popup */}
            {
                selectedBlog && (
                    <div className="fixed inset-0 bg-gray-50/75 z-50 flex items-center justify-center p-[50px]">
                        
                        <div className="bg-white border-5 rounded-lg shadow-lg w-full h-full overflow-auto relative p-6">
                            <div className='sticky top-0'>
                                <button
                                className="absolute  top-0 right-0 sm:text-[10px] md:text-[12px] lg:text-[15px] font-bold text-gray-500 hover:text-orange-500 bg-black p-2 rounded-2xl"
                                onClick={() => setSelectedBlog(null)}
                            >
                                Close &times;
                            </button>
                            </div>
                            <img
                                src={selectedBlog.thumbnail}
                                alt={selectedBlog.title}
                                className="object-cover rounded mb-4"
                            />
                            <h2 className="text-3xl font-bold mb-2">{selectedBlog.title}</h2>
                            <p className="text-sm mb-4 text-purple-700">Uploaded on: {selectedBlog.uploadedDate}</p>
                            <p className="text-base text-gray-700 whitespace-pre-line">
                                {selectedBlog.description}
                            </p>
                            
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Home;
