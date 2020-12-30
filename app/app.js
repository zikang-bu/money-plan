'use strict';

const Koa = require('koa');
const logging = require('@kasa/koa-logging');
const requestId = require('@kasa/koa-request-id');
const apmMiddleware = require('./middlewares/apm');
const bodyParser = require('./middlewares/body-parser');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');
const corsConfig = require('./config/cors');
const logger = require('./logger');
const router = require('./routes');
const Response = require('./utils/response');
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const config = require('./config/mysql');

// 配置存储session信息的mysql
const store = new MysqlSession({
  user: config.user,
  password: config.password,
  database: config.database,
  host: config.host,
  port: config.port
})
// 存放sessionId的cookie配置，根据情况自己设定
const cookie = {
  maxAge: 20 * 60 * 1000, // cookie有效时长(ms)
  expires: '',  // cookie失效时间
  path: '', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: true, // 是否只用于http请求中获取
  overwrite: true,  // 是否允许重写
  secure: '',
  sameSite: '',
  signed: true,
}
class App extends Koa {
  constructor(...params) {
    super(...params);

    // Trust proxy
    this.proxy = true;
    // Disable `console.errors` except development env
    this.silent = this.env !== 'development';

    this.servers = [];

    this._configureMiddlewares();
    this._configSession();
    this._configureRoutes();
  }



  _configureMiddlewares() {
    this.use(errorHandler());
    this.use(apmMiddleware());
    this.use(requestId());
    this.use(logging({
      logger,
      overrideSerializers: false
    }));
    this.use(
      bodyParser({
        enableTypes: ['json'],
        jsonLimit: '10mb'
      })
    );
    this.use(
      cors({
        origins: corsConfig.origins,
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
        allowHeaders: ['Content-Type', 'Authorization'],
        exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
      })
    );
  }

  _configSession() {
    this.use(session({
      key: 'SESSION_ID',
      store: store,
      cookie: cookie
    }))
  }

  _configureRoutes() {
    // Bootstrap application router
    //定义允许直接访问的url
    const allowpage = [
      '/api/v1/user/login',
      '/api/v1/user/register',
      '/api/v1/book/items',
      '/api/v1/book/setItem',
      '/api/v1/user/sendCode',
      '/api/v1/user/vertifyCode',
    ]
    //session拦截
    this.use(async (ctx, next) => {
      const idx = ctx.originalUrl.indexOf('?') > -1 ? ctx.originalUrl.indexOf('?') : ctx.originalUrl.length
      const url = ctx.originalUrl.substring(0, idx)
      if (allowpage.indexOf(url) > -1 || ctx.session.mail) {
        console.log('当前地址可直接访问')
        await next()
      } else {
        return Response.success(ctx, {
          code: -1,
          message: '未登录'
        })
      }
    })
    this.use(router.routes());
    this.use(router.allowedMethods());
  }

  listen(...args) {
    const server = super.listen(...args);
    this.servers.push(server);
    return server;
  }

  async terminate() {
    // TODO: Implement graceful shutdown with pending request counter
    for (const server of this.servers) {
      server.close();
    }
  }
}

module.exports = App;
