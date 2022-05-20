import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { api_url } from './config';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// const { createProxyMiddleware } = require('http-proxy-middleware')

// const sitemapProxy = createProxyMiddleware('/sitemap-hs.xml', {
// 	target:  api_url,
// 	changeOrigin: true,
// })

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		// sitemapProxy,
		// authenticationMiddleware,
		sapper.middleware({
			session: (req, res) => ({
				user: req.user || {},
				token: req.token,
				cart: req.cart || {},
				settings: req.settings || {},
			}),
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
