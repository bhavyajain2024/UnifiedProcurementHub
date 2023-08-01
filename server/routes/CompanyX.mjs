// https://www.mongodb.com/languages/mern-stack-tutorial
// Accessed on: August 1,2023
// learned about MERN Stack

import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of all parts available for purchase
router.get("/parts", async (req, res) => {
  try {
    const collection = await db.collection("partsX_628");
    const parts = await collection.find({}, "-_id partNo_628 partDescription_628 partName_628 currentPrice_628 QoH_628").toArray();
    res.json(parts).status(200);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch parts" });
  }
});

// Get a list of all purchase orders
router.get("/purchase-orders", async (req, res) => {
  try {
    const collection = await db.collection("POsX_628");
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
    const collection = await db.collection("partsX_628");
    const part = await collection.findOne({ partNo_628: partNo }, "-_id partNo_628 partDescription_628 partName_628 currentPrice_628 QoH_628");
    if (part) {
      res.json(part).status(200);
    } else {
      res.status(404).json({ error: "Part not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch part" });
  }
});

// Get a single purchase order by PO number
router.get("/purchase-orders/:poNo", async (req, res) => {
  try {
    const poNo = parseInt(req.params.poNo);
    const collection = await db.collection("POsX_628");
    const purchaseOrder = await collection.findOne({ poNo_628: poNo }, "-_id poNo_628 datePO_628 status_628 clients_628_clientID");
    if (purchaseOrder) {
      res.json(purchaseOrder).status(200);
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
    const alreadyPresentPO = await db.collection("POsX_628").findOne({ poNo_628: poNo_628 });
    if(!alreadyPresentPO){
      const newPO = {
        poNo_628: poNo_628,
        datePO_628: datePO_628,
        status_628: "active",
        clients_628_clientID: clients_628_clientID
      };
      const collection = await db.collection("POsX_628");
      const resultPO = await collection.insertOne(newPO);

      const purchaseOrderDetailsWithPO = purchaseOrderDetails.map((detail) => ({
        ...detail,
        POs_628_poNo: poNo_628
      }));
      const detailsCollection = await db.collection("PurchaseOrderDetailsX_628");
      await detailsCollection.insertMany(purchaseOrderDetailsWithPO);
  
      if(detailsCollection){
        const partsCollection = await db.collection("partsX_628");
        for (let i = 0; i < purchaseOrderDetails.length; i++) {
          const part = await partsCollection.findOne({ partNo_628: purchaseOrderDetails[i].parts_628_partNo });
          if (part) {
            const newQoH = part.QoH_628 - purchaseOrderDetails[i].qty_628;
            await partsCollection.updateOne(
              { partNo_628: purchaseOrderDetails[i].parts_628_partNo },
              { $set: { QoH_628: newQoH } }
            );
          }
        }
  
        const clientCollection = await db.collection("clientsX_628");
        const client = await clientCollection.findOne({ clientID_628: clients_628_clientID });
        if (client) {
          const dollarsOnOrder = client.dollarsOnOrder_628 + purchaseOrderDetails.reduce((total, detail) => total + detail.qty_628 * detail.price_628, 0);
          await clientCollection.updateOne(
            { clientID_628: clients_628_clientID },
            { $set: { dollarsOnOrder_628: dollarsOnOrder } }
          );
        }
      }
        
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