const { validateToken } = require('../controllers/auth-controller');
const { updateAvatar } = require('../controllers/user-controller');
const cloudinaryCnfig = require('../const/cloudinary-config');

const cloudinary = require('cloudinary').v2;
cloudinary.config(cloudinaryCnfig);

const singleUpload = async (parent, { file }, context) => {
	const userId = validateToken(context);
	const { createReadStream } = await file;

	const url = await new Promise( resolve => {
		const stream = cloudinary.uploader.upload_stream(
			async (error, result) => {
				const link = await updateAvatar(userId, result.url);
				resolve(link);
			}
		);
		createReadStream().pipe(stream);
	});

	return url;
};

module.exports = {
	singleUpload
};
