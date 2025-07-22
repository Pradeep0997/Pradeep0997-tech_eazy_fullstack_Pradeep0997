const express = require('express');
const router = express.Router();
const service = require('./parcelService');

router.post('/parcels', async(req,res)=>{
    try{
        const parcel = await service.createParcel(req.body);
        res.status(201).json(parcel);
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

router.get('/parcels', async(req,res)=>{
    const parcels = await service.getAllParcels();
    res.json(parcels);
});
router.get('/parcels/:trackingId', async(req,res) => {
    const parcel = await service.getParcelByTrackingId(req.params.trackingId);
    if(!parcel) return res.status(404).json({error: 'Parcel not found'});
    res.json(parcel);
});
router.put('/parcels/:trackingId', async(req,res) => {
    const parcel = await service.updateParcel(req.params.trackingId, req.body);
    if(!parcel) return res.status(404).json({error: 'Parcel not found'});
    res.json(parcel);
});

router.delete('/parcels/:trackingId', async(req,res)=>{
    const parcel = await service.deleteParcel(req.params.trackingId);
    if(!parcel) return res.status(404).json({error: 'Parcel not found'});
    res.json({message: 'Parcel deleted'});
});

module.exports = router;
