import { userLimit } from "@/app/models/userLimit";
import { MAX_FREE_COUNTS } from "@/constants";
import { connectDB } from "@/lib/connDB";
import { auth } from "@clerk/nextjs";


async function connectWithDB(){
  await connectDB();
}
connectWithDB();

export const increaseApiLimit = async()=>{
  const { userId } = auth();
  if(!userId){
    return;
  }
  try {
    let users = await userLimit.find( userIdd: userId );
    console.log("finding the user");
    if(users){
      console.log("user found in DB");
      users.numtrials=users.numtrials+1;
      const updatedUser = await users.save();
      console.log("Updated User API Limit successfully");
    }
    else{
      console.log("user was not found in DB, will have to create a new instance");
      const newuser = new userLimit({
        userIdd: userId,
        numtrials: 1
      });
      console.log(newuser);
      const createdUser = await newuser.save();
      console.log("created a new user in the DB with limit 1");
    }
  } catch (error) {
    console.log("error in task increaseApiLimit");
    console.log(error);
  }
}

export const checkApiLimit = async()=>{
  const { userId } = auth();
  if(!userId){
    return false;
  }
  try {
    let users = await userLimit.find( userIdd: userId );
    console.log("finding the user");
    if(!users || users.numtrials<MAX_FREE_COUNTS){
      return true;
    }
    else{
      return false;
    }
  } catch (error) {
    console.log("error in task increaseApiLimit");
    console.log(error);
  } 

}