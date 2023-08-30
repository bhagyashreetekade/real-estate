import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//this is basic format of making api that it will response as result and req as the input parameter

export const createUser = asyncHandler(async (req, res) => {
  console.log("Creating user");

  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User register successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User already registered" });
});

//function to book a visit to a residency
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;
  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    //if residency is booked by the user then it will show error
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    }
    //If residency is not booked then find document of that specific user and update the bookedVisit field push new entry with this object(id,date)
    else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("Your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to get all bookings of a user
export const allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings= await prisma.user.findUnique({
        where:{email:email},
        select:{bookedVisits:true}
    })
    res.status(200).send(bookings)
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to cancel the booking
export const cancelBooking = asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const {id}=req.params;

    try{

        const user=await prisma.user.findUnique({
            where:{email:email},
            select:{bookedVisits:true}
        })

        //findindex find iterates complete array of bookedVisits and each entry will pass as a prop
        //visit is just an element of the arrayand as findindex iterate the whole array so visit will be replaced by new elementeach time in the array 
        const index = user.bookedVisits.findIndex((visit)=>visit.id===id)

        if(index ===-1){
            res.status(404).json({message:"Booking not found"})
        }else{
            //delete only one elemnt having who eindex is this one that is given in the function
            user.bookedVisits.splice(index,1)
            //now we have to update the document of mongo db
            await prisma.user.update({
                where:{email},
                data:{
                    bookedVisits:user.bookedVisits
                }
            })
        }
        res.send("Booking cancel successfully")

    }catch(err){
        throw new Error(err.message);
    }
})

//Function to add a residency in favourite list of user
//this function will work for both add and remove from favourite list

export const toFav= asyncHandler(async(req,res)=>{
  const{email}=req.body;
  const {rid}=req.params;
  try{

    //here we get the user
    const user=await prisma.user.findUnique({
      where:{email},
    })

    //if user has already like this residency then remove the residency from this residency else add the residency
    if(user.favResidencesID.includes(rid)){
      const updateUser = await prisma.user.update({
        where:{email},
        data:{
          favResidencesID:{
            //here we are set the favResidencesID filter out only that which is equal to the id that we have send to the parameters
            set:user.favResidencesID.filter((id)=>id !== rid)
          }
        }
      })
      res.send({message:"Removed from favorites",user:updateUser})
    }
    else{
      const updateUser = await prisma.user.update({
        where:{email},
        data:{
          favResidencesID:{
            push:rid
          }
        }
      })
      res.send({message:"Updtated favourites",user:updateUser})
    }
  }catch(err){
    throw new Error(err.message);
  }
})

//function to get all favourites
export const allFav =asyncHandler(async(req,res)=>{
  const {email}=req.body;

  try {
    const favRes= await prisma.user.findUnique({
        where:{email:email},
        select:{favResidencesID:true}
    })
    res.status(200).send(favRes);
    
  } catch (err) {
    throw new Error(err.message);
  }

})

