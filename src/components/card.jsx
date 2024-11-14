import React from 'react'
import { Button } from './ui/button'
import EditEvent from './editEvent';
import EventBudget from './eventBudget';

function Card({ event, editEvents }) {
    const today = new Date();
    const eventDate = new Date(event.date);
    function eventValidation() {
        if (eventDate < today) {
            return <Button variant='secondary'>Done</Button>
        }
        else
        return <Button  >Upcoming</Button>
    }

    return (
        <div className='border rounded-lg shadow-sm p-3'>
            <h1 className='font-bold'>{event.title}</h1>
            <h1>Date: {event.date}</h1>
            <h1>Location: {event.location}</h1>
            <div className=' flex gap-5'>
               { eventValidation()}
                <EditEvent editEvents={editEvents} editEventData={event}/>
                <EventBudget />
                
                </div>

        </div>
    )
}

export default Card