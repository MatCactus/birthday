// import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
// import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
// import { NextApiRequest, NextApiResponse } from "next";

// const serviceAccount = require(JSON.parse(process.env["GCLOUD_KEY"]));
// initializeApp({
//     credential: cert(serviceAccount),
// });
// const db = getFirestore();
// const collectionRef = db.collection("list");

// export default async function onRequest(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const sendJson = (status: number, json: any) =>
//         res.status(status).json(json);

//     console.log(collectionRef.listDocuments);

//     sendJson(200, {});
// }
