import React from 'react'
import { Link } from 'react-router-dom'
export default function PostCard({ post }) {
    return (
        <div className="group relative w-full border  h-[400px] overflow-hidden rounded-lg sm:w-[430px] border-teal-500 hover:border-2  transition-all">
            <Link to={`post/${post.slug}`}>
                <img src={post.image} alt='post cover ' className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all  duration-300 z-20 " />
            </Link>
            <div className="p-3 flex flex-col  gap-2 line-clamp-2 ">
               <p className="text-lg font-semibold ">{post.title}</p>
               <span>{post.category}</span>
               <Link className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 ' to={`post/${post.slug}`}>
                Read article
               </Link>
            </div>
        </div>
    )
}
