import React from 'react'
import './new-projects.css'

export default function NewProjects() {
    return (
        <div className='new-projects-np-mainpage'>
            <div className='np-main'>

                <div className='np-head-search'>
                    <p className='np-head'>LET'S FIND A PERFECT PROPERTY FOR YOU</p>
                    <p className='np-all-over-pk'>Search from 500,000+ properties all over Pakistan</p>

                    <div className='np-search'>
                        <div className='for-sale-rent'>For Sale / Rent</div>
                        <div className='search-div'>Searchbar</div>
                        <div className='lands'>House Offices Plots Commercials</div>
                    </div>

                </div>

                <img className='np-img' src="./np-img.jpg" />
            </div>
        </div>
    )
}
