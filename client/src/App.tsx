import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
//npm run dev
function App() {
  //the way we remember stuff is by using react hooks. Javascript function cannot remember things
  //Activity is defined in a lib/types see json to ts
  const [activities, setActivities] = useState<Activity[]>([]);
//Axios replaces the js fetch 
  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities/')
    .then(response => setActivities(response.data))
    return () => {}
  },[])
  return (
     <>
      <Typography variant='h3'>Reactivities</Typography>
      <List>
          {activities.map((activity)=>(
            <ListItem key={activity.id}>
              <ListItemText>{activity.title}</ListItemText>
            </ListItem>
          ))}
      </List>
     </>
  )
}

export default App
