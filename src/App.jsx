import './App.css'
import { Input } from './components/ui/input'
import Card from './components/card'
import CreateEvent from './components/createEvent';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {

  

  const addEvent = (data) => {
    const updated = [...events, data];
    setFilteredEvents(updated);
    setEvents(updated);
  }


  const [events, setEvents] = useState([]);

  const editEvents = (data) => {
    const updated = events.map(e => {
      if (e.id === data.id) {
        const event = {
          ...e,
          title: data.title,
          date: data.date,
          location: data.location
        }
        return event;
      }
      return e;
    })

    setFilteredEvents(updated);
    setEvents(updated);
  }

  const [searchItem, setSearchItem] = useState('')
  const [filteredEvents, setFilteredEvents] = useState(events)


  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = events.filter((eventData) =>
      eventData.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredEvents(filteredItems);
  }

  return (
    <>
      <h1 className="px-3 font-bold text-left my-4 text-2xl">Event Management</h1>
      <div className='flex justify-between'>
        <Input value={searchItem} onChange={handleInputChange} className='w-1/2' type="search" placeholder="Search event here..." />
        <CreateEvent addEventData={addEvent} />
      </div>
      <div className='grid md:grid-cols-2 gap-4 m-4'>{filteredEvents.map((event, index) => {
        return <Card editEvents={editEvents} key={index} event={event} />
      })}</div>
    </>
  )
}

export default App
