import * as sapper from '@sapper/app';
import { user } from './store/user';

await user.fetch()

sapper.start({
	target: document.querySelector('#sapper')
});