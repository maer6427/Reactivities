import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/Activities/dashboard/ActivityDashboard";
//npm run dev

export default function App() {
  //the way we remember stuff is by using react hooks. Javascript function cannot remember things
  //Activity is defined in a lib/types see json to ts
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity]=useState<Activity |undefined>(undefined);
  const [editMode, setEditMode]= useState(false);
//Axios replaces the js fetch 
  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities/')
    .then(response => setActivities(response.data))
    return () => {}
  },[])

const handleSelectActivity=(id:string)=>{
  setSelectedActivity(activities.find(x=>x.id===id));
}
  const handleCancelActivity = () => {
    setSelectedActivity(undefined);
}

const handleOpenForm = (id?:string)=>{
  if(id) handleSelectActivity(id);
    else handleCancelActivity();
  setEditMode(true);
}
const handleFormClose= ()=>{
  setEditMode(false);
}

const handleSubmitForm=(activity:Activity)=>{
  if(activity.id){
    setActivities(activities.map(x=> x.id===activity.id ? activity :x));
  }else{
    const newActivity = {...activity,id: activities.length.toString()};
    setActivities([...activities, newActivity])
    setSelectedActivity(newActivity);
  }
  setEditMode(false);
}
const handleDelete=(id:string)=>{
  setActivities(activities.filter(x=>x.id!==id))
}
  return (
     <Box sx={{bgcolor: '#eeeeee'}}>
     <CssBaseline/>
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth='xl' sx={{mt:3}}>
       <ActivityDashboard activitites={activities} 
       selectActivity={handleSelectActivity}
       cancelSelectedActivity={handleCancelActivity}
       selectedActivity={selectedActivity}
        editMode={editMode}
        openForm={handleOpenForm}
        closeForm={handleFormClose}
        submitForm={handleSubmitForm}
        deleteActivity={handleDelete}
       />
      </Container>
      
     </Box>
  )
}
