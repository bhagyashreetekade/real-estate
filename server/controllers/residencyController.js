import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

//this is basic format of making api that it will response as result and req as the input parameter

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(err.message);
  }
});

//Function to get all the documents/residencies in latest order
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.send(residencies);
});

//Function to get a specific documents/residencies
export const getResidency = asyncHandler(async (req, res) => {
  //req.body is used when we sending data throught the pay load
  //req.params is used when we send the data using url
  const {id} = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: {id}
    })
    res.send(residency)

  } catch (err) {
    throw new Error(err.message);
  }
});
