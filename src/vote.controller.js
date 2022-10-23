// const service = require('./vote.service');
const Webflow = require('webflow-api');

// https://api.webflow.com/collections/6344fdec1d82291e79ee8e17/items/634cd19e3e23cc0650d6c0b7
const api_token =
	'16f11161d4f3c67937b23aa00b0c5db1368138f3b051eecd0bdc6193da86f8b7';

const webflow = new Webflow({ token: api_token });

function updateIds(req, res, next) {
	const collection = webflow.items({
		collectionId: '6344fdec1d82291e79ee8e17',
	});

	collection.then(function (c) {
		c.items.forEach(function (d) {
			id = d._id;
			console.log(d._id);
			const item = webflow.item({
				collectionId: '6344fdec1d82291e79ee8e17',
				itemId: id,
			});

			item.then(function (e) {
				console.log(e);

				// webflow
				// 	.patchItem({
				// 		collectionId: '6344fdec1d82291e79ee8e17',
				// 		itemId: id,
				// 		fields: {
				// 			epochid: id,
				// 		},
				// 	})
				// 	.then(function (c) {
				// 		return res.json(id);
				// 	});
			});
		});
	});
}

function readVotes(req, res, next) {
	const itemId = req.params.id;

	const item = webflow.item({
		collectionId: '6344fdec1d82291e79ee8e17',
		itemId: itemId,
	});

	item.then(function (c) {
		return res.json(c.leaderboard);
	});
}

function voteItem(req, res, next) {
	console.log(req.params.id);
	const itemId = req.params.id;

	const item = webflow.item({
		collectionId: '6344fdec1d82291e79ee8e17',
		itemId: itemId,
	});

	item.then(function (c) {
		let leaderboardValue = c.leaderboard;
		leaderboardValue++;
		console.log(leaderboardValue);

		webflow
			.patchItem({
				collectionId: '6344fdec1d82291e79ee8e17',
				itemId: itemId,
				fields: {
					leaderboard: leaderboardValue,
				},
			})
			.then(function (c) {
				return res.json(c);
			});
	});
}

module.exports = {
	updateIds,
	readVotes,
	voteItem,
};
