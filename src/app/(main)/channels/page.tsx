
import   {createUser} from "@/actions/createUser";
import { InitServerCompo } from "@/components/custom/InitServerCompo";

const channel = async() => {
  const server = await createUser();
  if(server){
    return (
      <>  
        <InitServerCompo />
      </>
    )
  }
}

export default channel;

