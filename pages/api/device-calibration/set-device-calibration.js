import nc from 'next-connect';
import DeviceCalibration from '../../../models/DeviceCalibration';
import db from '../../../utils/db';

const handler = nc();


handler.post(async (req, res) => {
  await db.connect();
  const device = await DeviceCalibration.updateOne({
    devEUI: req.body.devEUI, $set: {
      temprature_calibration: req.body.tempratureCalibration,
      humidity_calibration: req.body.humidityCalibration
    }
  });
  await db.disconnect();
  res.send({ message: 'User Updated Successfully' });

});

export default handler;
