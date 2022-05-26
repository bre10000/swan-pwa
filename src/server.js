import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import polka from 'polka';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const url = dev ? '/' : 'swan-pwa'; // <<-

polka()
    .use(
        url, 
		// 'swan-pwa',
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

