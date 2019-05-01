const Category = require('../models/category-model');

const isCategoryExists = async params => {
	return await Category.findOne({ ...params, name: { '$regex': params.name, $options: 'i' } });
};

const createCategory = async params => {
	const isExists = await isCategoryExists(params);
	if (isExists) throw new Error('Category is exists');
	return Category.create(params);
};

const getAllCategories = async params => {
	const baseCategories = await Category.find({ system: true });
	const categories = await Category.find(params).sort({ updatedAt: -1 });
	return [...categories, ...baseCategories];
};

module.exports = {
	createCategory,
	getAllCategories,
};
