import { Grid2} from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
    activitites:Activity[]
    selectActivity:(id:string )=>void;
    cancelSelectedActivity:()=> void;
    selectedActivity?: Activity;
    openForm: (id:string) => void;
    closeForm: ()=> void;
   editMode:boolean;
   submitForm:(activity:Activity)=> void;
   deleteActivity:(id:string)=> void;
}
export default function ActivityDashboard({activitites, cancelSelectedActivity, selectActivity,
   selectedActivity,
  openForm,
closeForm,
editMode,
submitForm,
deleteActivity
}:Props) {
  return (
    <Grid2 container spacing={3}>
        <Grid2 size={7}>
              <ActivityList 
              activities={activitites}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
              />
            
        </Grid2>
      <Grid2 size={5}>
        {selectedActivity && !editMode &&
        <ActivityDetails activity={selectedActivity}
          cancelSelectedActivity={cancelSelectedActivity}
          openForm={openForm}

        />}
        {editMode && 
        <ActivityForm closeForm={closeForm} activity={selectedActivity}
        submitForm={submitForm} />}
        </Grid2>
    </Grid2>
  )
}