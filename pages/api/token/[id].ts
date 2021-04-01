import { NextApiRequest, NextApiResponse } from "next";

interface Metadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  properties: [];
}

function getMetadata(id: number): Metadata {
  const { x, y } = getCoordinates(id);
  let formattedID: string = `${id}`;
  while (formattedID.length < 3) {
    formattedID = `0${formattedID}`;
  }
  return {
    name: `PxlGen Cell ${formattedID}`,
    description: `This Cell is ${formattedID} of the 400 which make up the PxlGen canvas. This Cells coordinates are (${x}, ${y})`,
    image: `${process.env.DOMAIN}/images/${id}.png`,
    external_url: `${process.env.DOMAIN}/token/${id}`,
    properties: [],
  };
}

function getCoordinates(id: number): { x: number; y: number } {
  let lower = Math.floor(id / 20) * 20;
  let upper = Math.ceil(id / 20) * 20;
  let x = id - lower;
  let y = upper / 20;
  if (x == 0) x = 20; // index: 400
  return { x, y };
}
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(getMetadata(parseInt(req.query.id as string)));
};
