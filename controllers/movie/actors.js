var router = require('express').Router();

router.route('/')
	/**
	 * 获取所有演员数据
	 */
	.get((req, res, next) => {

	})
	/**
	 *	创建一个演员数据
	 */
	.post((req, res, next) => {

	})
	/**
	 * 根据id查找演员
	 */
	.get('/:id', (req, res, next) => {

	})
	/**
	 * 	根据演员id，更新演员数据
	 */
	.put('/:id', (req, res, next) => {

	})
	/**
	 * 	根据演员id，删除该演员
	 */
	.delete('/:id', (req, res, next) => {

	})
	/**
	 *	找到某个演员下的所有电影
	 */
	.post('/:id/movies', (req, res, next) => {

	})
	.delete('/:id/movies/:mid', (req, res, next) => {

	})
