const {Parcel} = require('./parcelModel');

async function createParcel(data) {
    return await Parcel.create(data);
}

async function getAllParcels(){
    return await Parcel.findAll();
}

async function getParcelByTrackingId(trackingId){
    return await Parcel.findOne({where: {trackingId}});
}

async function updateParcel(trackingId,newData){
    const parcel = await getParcelByTrackingId(trackingId);
    if(!parcel) return null;
    return await parcel.update(newData);
}

async function deleteParcel(trackingId) {
    const parcel = await getParcelByTrackingId(trackingId);
    if(!parcel) return null;
    return await parcel.destroy();
    
}

module.exports = {
    createParcel,
    getAllParcels,
    getParcelByTrackingId,
    updateParcel,
    deleteParcel,
};