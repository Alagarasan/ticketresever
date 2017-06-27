/*Models*/
let mhall = require('../models/mhall').hall;

exports.findHall = (req, res) => {
	let oResObj = {
		'data': {}
	};

	mhall.find({}, {'HNm': 1, 'NoSt': 1, 'Seats': 1,}, {limit: 1}, (err, docs) => {
		if (err) {
			res.status(500).json({err});
			return;
		}else if (docs && docs.length > 0) {
			oResObj.data = docs[0];
			
			res.status(200).json(oResObj);
			return;
		}else {
			let newHall = new mhall();

			newHall.HNm = "Hall 1";
    		newHall.NoSt = 48;
    		newHall.Seats = [];

    		for (let i = 1; i < 5; i++) {
    			let obj = {
    				'ROrd': i,
    				'Row': []
    			};

    			for (let j = 1; j < 13; j++) {
    				obj.Row.push({
    					'SOrd' : j,
                    	'Bkd' : 1,
    				});
    			}

    			newHall.Seats.push(obj);
    		}
    		
    		newHall.CrBy = "System";
    		newHall.MdBy = "System";

    		newHall.save((Innererr) => {
				if (!Innererr) {
					oResObj.data = newHall;
					
					res.status(200).json(oResObj);
					return;
				}else {
					res.status(500).json({err});
					return;
				}
			});
		}
	});
}

exports.bookTickets = (req, res) => {
	let oResObj = {
		'state': 1
	};

	mhall.find({'_id' : req.body._id}, (err, docs) => {
		if (err) {
			res.status(500).json({err});
			return;
		}else if (docs && docs.length > 0) {
			for (let bk = req.body.Seats.length - 1; bk >= 0; bk--) {
				for (let st = docs[0].Seats.length - 1; st >= 0; st--) {
					if (docs[0].Seats[st]._id == req.body.Seats[bk].arOne) {
						for (let rw = docs[0].Seats[st].Row.length - 1; rw >= 0; rw--) {
							if (docs[0].Seats[st].Row[rw]._id == req.body.Seats[bk].arTwo) {
								docs[0].Seats[st].Row[rw].Bkd = 3;
								st = -1;
								break;
							}
						}
					}
				}
			}
			docs[0].MdBy = "User";
			docs[0].MoAt = new Date();

			docs[0].save((Innererr) => {
				if (!Innererr) {
					res.status(200).json(oResObj);
					return;
				}else {
					res.status(500).json({err});
					return;
				}
			});
		}else {
			oResObj.state = 2;

			res.status(200).json(oResObj);
			return;
		}
	});
}