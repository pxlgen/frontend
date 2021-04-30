import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const metadata = req.body as PlotMetadata;
  const body = {
    pinataMetadata: {
      name: metadata.name,
    },
    pinataContent: {
      ...metadata,
    },
  };
  const resp = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", body, {
    headers: {
      pinata_api_key: process.env.PINATA_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET,
    },
  });

  const data = resp.data as {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
  };

  res.status(200).json({ IpfsHash: data.IpfsHash });
};
