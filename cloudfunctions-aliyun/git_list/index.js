'use strict';
// 先连接到数据库
const db = uniCloud.database()
exports.main = async (event, context) => {
	// 连接到user表
	const collection = db.collection('user')
	// 批量增加
	// let res = await collection.add([{
	// 	name:"hello",
	// },{
	// 	name:"asdasd",
	// 	pwd:852555
	// }])
	// 通过id名更新
	const res = await collection.doc('5f2f6bb551870b00011e849a').update({
		name:"zyd"
	})
	console.log('数据更新')
	
	console.log(JSON.stringify(res))
	//event为客户端上传的参数
	console.log('event : ', event)
	// context 包含了调用信息和运行状态 获取每次调用的上下文
	//返回数据给客户端
	return {	
		msg:event.name +'的年龄是'+event.age,
    	code:200,
		os:context.OS
	}
};
