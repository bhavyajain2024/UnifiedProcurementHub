// https://www.mongodb.com/languages/mern-stack-tutorial
// Accessed on: August 1,2023
// learned about MERN Stack

import express from "express";
import {db, db1, db2} from "../db/conn.mjs";

const router = express.Router();

// Get a list of all parts available for purchase
router.get("/parts", async (req, res) => {
  try {
    const collectionX = await db1.collection("partsX_628");
    const partsX = await collectionX.find({}, "-_id partNo_628 partDescription_628 partName_628 currentPrice_628 QoH_628").toArray();

    const collectionY = await db2.collection("partsY_628");
    const partsY = await collectionY.find({}, "-_id partNo_628 partDescription_628 partName_628 currentPrice_628 QoH_628").toArray();

    const parts = [...partsX, ...partsY];
    res.json(parts).status(200);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch parts" });
  }
});

// Get a list of all purchase orders without showing the companies X and Y
router.get("/purchase-orders", async (req, res) => {
  try {
    const collection = await db.collection("POsZ_628");
    const purchaseOrders = await collection.find({}, "-_id poNo_628 datePO_628 status_628").toArray();
    
    res.json(purchaseOrders).status(200);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch purchase orders" });
  }
});

// Get a single part by part number
router.get("/parts/:partNo", async (req, res) => {
  try {
    const partNo = parseInt(req.params.partNo);
    let collection = await db1.collection("partsX_628");
    let part = await collection.findOne({ partNo_628: partNo }, "-_id partNo_628 partDescription_628 partName_628 currentPrice_628 QoH_628");

    if(!part){
      collection = await db2.collection("partsY_628");
      part = await collection.findOne({ partNo_628: partNo }, "-_id partNo_628 partDescription_628 partName_628 currentPrice_628 QoH_628");
    }

    if (part) {
      res.json(part).status(200);
    } else {
      res.status(404).json({ error: "Part not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch part" });
  }
});

// Get a single purchase order by PO number without companies X and Y
router.get("/purchase-orders/:poNo", async (req, res) => {
  try {
    const poNo = parseInt(req.params.poNo);
    const collection = await db.collection("PurchaseOrderDetailsZ_628");
    const purchaseOrderDetails = await collection.find({POs_628_poNo: poNo }, "-_id parts_628_partNo price_628 qty_628 status_628 lineNo_628 POs_628_poNo").toArray();
    if (purchaseOrderDetails) {
      res.json(purchaseOrderDetails).status(200);
    } else {
      res.status(404).json({ error: "Purchase order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch purchase order" });
  }
});

// Get a single purchase order by PO number with companies X and Y
router.get("/purchase-orders-company", async (req, res) => {
  try {
    const poNo = parseInt(req.params.poNo);
    const collection = await db.collection("PurchaseOrderDetailsZ_628");
    const purchaseOrderDetails = await collection.find({}, "-_id parts_628_partNo price_628 qty_628 status_628 lineNo_628 POs_628_poNo company_628").toArray();
    if (purchaseOrderDetails) {
      res.json(purchaseOrderDetails).status(200);
    } else {
      res.status(404).json({ error: "Purchase order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch purchase order" });
  }
});


// Submit a purchase order
router.post("/submit-purchase-order", async (req, res) => {
  try {
    const { poNo_628, datePO_628, clients_628_clientID, purchaseOrderDetails } = req.body;
    const alreadyPresentPO = await db.collection("POsZ_628").findOne({ poNo_628: poNo_628 });
    if(!alreadyPresentPO){
      const newPO = {
        poNo_628: poNo_628,
        datePO_628: datePO_628,
        status_628: "active",
        clients_628_clientID: clients_628_clientID
      };
      const collection = await db.collection("POsZ_628");
      const resultPO = await collection.insertOne(newPO);

      // finding which part belongs to which company
      const collectionX = await db1.collection("partsX_628");
      const collectionY = await db2.collection("partsY_628");
      const companies = [collectionX, collectionY];
      const companyCode = ["X", "Y"];
      const dbCode = [db1, db2];

      const purchaseOrderDetailsWithCompanyPromises = purchaseOrderDetails.map(async (detail) => {
        let partCompany = null;
        for(let i = 0; i < companies.length; i++){
          
          partCompany = await companies[i].findOne({ partNo_628: detail.parts_628_partNo });
          
          if(partCompany){

            const alreadyPresentPO = await dbCode[i].collection(`POs${companyCode[i]}_628`).findOne({ poNo_628: poNo_628 });
            if(!alreadyPresentPO){
              const newPO = {
                poNo_628: poNo_628,
                datePO_628: datePO_628,
                status_628: "active",
                clients_628_clientID: clients_628_clientID
              };
              const collection = await dbCode[i].collection(`POs${companyCode[i]}_628`);
              const resultPO = await collection.insertOne(newPO);

              // adding the PO number to the purchase order details
              const purchaseOrderDetailsWithPO = {
                ...detail,
                POs_628_poNo: poNo_628
              };

              const detailsCollection = await dbCode[i].collection(`PurchaseOrderDetails${companyCode[i]}_628`);
              await detailsCollection.insertOne(purchaseOrderDetailsWithPO);
        
              if(detailsCollection){
                const partsCollection = await dbCode[i].collection(`parts${companyCode[i]}_628`);
                
                const part = await partsCollection.findOne({ partNo_628: detail.parts_628_partNo });
                if (part) {
                  const newQoH = part.QoH_628 - detail.qty_628;
                  await partsCollection.updateOne(
                    { partNo_628: detail.parts_628_partNo },
                    { $set: { QoH_628: newQoH } }
                  );
                }
                
          
                const clientCollection = await db.collection("clientsZ_628");
                const client = await clientCollection.findOne({ clientID_628: clients_628_clientID });
                if (client) {
                  const dollarsOnOrder = client.dollarsOnOrder_628 + (detail.qty_628 * detail.price_628);
                  await clientCollection.updateOne(
                    { clientID_628: clients_628_clientID },
                    { $set: { dollarsOnOrder_628: dollarsOnOrder } }
                  );
                }
              }
            }
              return {
                ...detail,
                company_628: companyCode[i]
              };
          }
        }
        return {
          ...detail,
          company_628: "error finding the company for the respective part"
        }
        
      });

      const purchaseOrderDetailsWithCompany = await Promise.all(purchaseOrderDetailsWithCompanyPromises);

      const purchaseOrderDetailsWithPO = purchaseOrderDetailsWithCompany.map((detail) => ({
        ...detail,
        POs_628_poNo: poNo_628
      }));
      const detailsCollection = await db.collection("PurchaseOrderDetailsZ_628");
      await detailsCollection.insertMany(purchaseOrderDetailsWithPO);
        
      res.json({ message: "Purchase order submitted successfully" }).status(201);
    }
    else{
      throw new Error("Purchase order already exists");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to submit purchase order", message: error.message });
  }
});

export default router;