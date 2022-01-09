import nc from 'next-connect';
import Entries from '../../../models/Entries';
import db from '../../../utils/db';

const handler = nc();


handler.post(async (req, res) => {
  await db.connect();
  startDate = req.body.start_date;
  endDate = req.body.end_date;
  deviceEUI = req.body.deviceEUI;
  query = { timestamp: { $gt: new Date(startDate), $lt: new Date(endDate) },devEUI: deviceEUI  }
  const filteredEntries = await Entries.find(query)
  await db.disconnect();
  res.send(filteredEntries);

});

export default handler;
