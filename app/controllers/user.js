const Response = require('../utils/response');
const userModel = require('../model/user');
const dateFn = require('../utils/date')
const nodemailer = require("nodemailer");

//获取用户信息
exports.info = async (ctx) => {
  const data = await userModel.info(ctx.request.query);
  return Response.success(ctx, {
    code: 200,
    data,
    message: 'success'
  });
};
// 登录
exports.login = async (ctx) => {
  const params = ctx.request.body
  const data = await userModel.checkUser(params)
  return Response.success(ctx, {
    code: 200,
    data: { count: data[0].count },
    message: 'success'
  });
};
// 注册
exports.register = async (ctx) => {
  const params = ctx.request.body
  const data = await userModel.setItem(params)
  return Response.success(ctx, {
    code: 200,
    data,
    message: 'success'
  });
};
// 发送验证码
exports.sendCode = async (ctx) => {
  const { mail } = ctx.request.body;
  const charactors = "1234567890";
  let code = '';
  for (j = 1; j <= 4; j++) {
    const i = parseInt(10 * Math.random());
    code = code + charactors.charAt(i);
  }
  await sendMail(mail, code)
  const invalidTime = Date.now() + 120000;
  ctx.session.mail = mail;
  ctx.session.code = code;
  ctx.session.invalidTime = invalidTime;
  return Response.success(ctx, {
    code: 200,
    data: { msg: '发送成功！' },
    message: 'success'
  });
};
// 验证
exports.vertifyCode = async (ctx) => {
  const { mail, code } = ctx.request.body
  const session = ctx.session
  let res = {};
  if (mail === session.mail && code === session.code && Date.now() < session.invalidTime) {
    res = {
      code: 200,
      data: { code: 1, msg: '验证成功！' },
      message: 'success'
    }
  } else {
    res = {
      code: 200,
      data: { code: 0, msg: '验证码错误！' },
      message: 'success'
    }
  }
  return Response.success(ctx, res);
};

async function sendMail(address, text) {
  var user = "442104171@qq.com";//自己的邮箱
  var pass = "aoyesxdkacdgbjdb"; //qq邮箱授权码
  var to = address;//对方的邮箱
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false,
    auth: {
      user: user, // 用户账号
      pass: pass, //授权码,通过QQ获取
    },
  });
  await transporter.sendMail({
    from: `鲸鱼记账<${user}>`, // sender address
    to: `<${to}>`, // list of receivers
    subject: "验证码", // Subject line
    text: `验证码:${text}（两分钟内有效）`, // plain text body
  });
}
